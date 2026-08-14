"use server";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { getPricingForService, defaultPricing, type LineItem, type ServicePricing } from "@/lib/pricing";

type PrismaClientType = InstanceType<typeof PrismaClient>;
const globalForPrisma = global as unknown as { prisma: PrismaClientType };
const prisma: PrismaClientType = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const resend = new Resend(process.env.RESEND_API_KEY);

export interface QuoteData {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  message: string;
}



// ─── PDF Generation using PDFKit ────────────────────────────────────────

import PDFDocument from "pdfkit";

async function generateQuotePDF(data: QuoteData, quoteNumber: string, pricing: ServicePricing): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 0, size: 'A4' });
      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // Colors
      const blue = "#1a2e5a";
      const orange = "#E8600A";
      const lightGrey = "#f4f4f4";

      // ─── Top Right Orange Triangle ───
      doc.polygon([450, 0], [595, 0], [595, 145]).fill(orange);

      // ─── Header & Logo ───
      const logoPath = path.join(process.cwd(), "public", "logo.png");
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 40, 30, { width: 80 });
      }
      
      doc.fontSize(24).font("Helvetica-Bold").fillColor(blue).text("COMPLEX CYRUS", 140, 45);
      doc.fontSize(16).font("Helvetica-Bold").fillColor(orange).text("ELECTRICAL SOLUTION", 140, 70);
      
      doc.moveTo(140, 90).lineTo(450, 90).strokeColor(blue).lineWidth(1).stroke();
      doc.fontSize(8).font("Helvetica-Bold").fillColor(blue).text("POWERING SAFETY. DELIVERING EXCELLENCE.", 140, 95, { characterSpacing: 1 });

      // ─── Contact Info Bar ───
      doc.moveTo(40, 130).lineTo(555, 130).strokeColor("#ddd").lineWidth(1).stroke();
      doc.fontSize(8).font("Helvetica").fillColor(blue);
      // Address
      doc.font("Helvetica-Bold").fillColor(orange).text("ADDRESS:", 40, 140);
      doc.font("Helvetica").fillColor(blue).text("Witeithie House,\nKenyatta Avenue,\nKiambu, Thika West District\nP.O. Box 65-01000, Thika, Kenya", 40, 150);
      // Phone
      doc.font("Helvetica-Bold").fillColor(orange).text("PHONE:", 200, 140);
      doc.font("Helvetica").fillColor(blue).text("+254 725 618 445", 200, 150);
      // Email
      doc.font("Helvetica-Bold").fillColor(orange).text("EMAIL:", 330, 140);
      doc.font("Helvetica").fillColor(blue).text("complexcyrus@gmail.com", 330, 150);
      // Reg
      doc.font("Helvetica-Bold").fillColor(orange).text("REGISTRATION NO.:", 450, 140);
      doc.font("Helvetica-Bold").fillColor(blue).text("BN-WL5PEMMP", 450, 150);
      
      doc.moveTo(40, 200).lineTo(555, 200).strokeColor(blue).lineWidth(2).stroke();

      // ─── Title & Client Info ───
      doc.fontSize(22).font("Helvetica-Bold").fillColor(blue).text("QUOTATION", 40, 215);
      
      doc.fontSize(9).font("Helvetica-Bold").fillColor(orange).text("CLIENT NAME:", 330, 215);
      doc.font("Helvetica").fillColor(blue).text(data.name, 410, 215);
      
      doc.font("Helvetica-Bold").fillColor(orange).text("PROJECT:", 330, 230);
      doc.font("Helvetica").fillColor(blue).text(data.service, 410, 230);
      
      doc.font("Helvetica-Bold").fillColor(orange).text("DATE:", 330, 245);
      doc.font("Helvetica").fillColor(blue).text(new Date().toLocaleDateString(), 410, 245);

      // ─── Table Settings ───
      let y = 270;
      
      const drawRowLines = (currentY: number) => {
        doc.moveTo(40, currentY).lineTo(555, currentY).strokeColor("#ccc").lineWidth(1).stroke();
        doc.moveTo(40, y).lineTo(40, currentY).stroke(); // left border
        doc.moveTo(70, y).lineTo(70, currentY).stroke(); // col 1
        doc.moveTo(270, y).lineTo(270, currentY).stroke(); // col 2
        doc.moveTo(350, y).lineTo(350, currentY).stroke(); // col 3
        doc.moveTo(450, y).lineTo(450, currentY).stroke(); // col 4
        doc.moveTo(555, y).lineTo(555, currentY).stroke(); // right border
      };

      // ─── Materials Header ───
      doc.rect(40, y, 515, 20).fill(blue);
      doc.fontSize(10).font("Helvetica-Bold").fillColor("#fff").text("MATERIALS", 45, y + 5);
      y += 20;

      doc.rect(40, y, 515, 20).fill(orange);
      doc.fontSize(9).fillColor("#fff");
      doc.text("No.", 40, y + 5, { width: 30, align: "center" });
      doc.text("DESCRIPTION", 75, y + 5);
      doc.text("QTY", 270, y + 5, { width: 80, align: "center" });
      doc.text("UNIT PRICE (KSH)", 350, y + 5, { width: 100, align: "center" });
      doc.text("TOTAL (KSH)", 450, y + 5, { width: 105, align: "center" });
      y += 20;

      // ─── Materials Rows ───
      let totalMaterials = 0;
      doc.fontSize(9).font("Helvetica").fillColor(blue);
      
      pricing.materials.forEach((m, i) => {
        if (y > 700) { doc.addPage(); y = 50; }
        const rowHeight = 20;
        doc.text((i + 1).toString(), 40, y + 5, { width: 30, align: "center" });
        doc.text(m.description, 75, y + 5, { width: 190 });
        doc.text(`${m.qty} ${m.unit || ""}`, 270, y + 5, { width: 80, align: "center" });
        doc.text(m.unitPrice.toLocaleString(), 350, y + 5, { width: 100, align: "center" });
        
        const rowTotal = m.qty * m.unitPrice;
        totalMaterials += rowTotal;
        doc.text(rowTotal.toLocaleString(), 450, y + 5, { width: 105, align: "center" });
        
        y += rowHeight;
        drawRowLines(y);
      });
      
      // Blank rows to fill space
      while (y < 450) {
        y += 20;
        drawRowLines(y);
      }

      // ─── Totals ───
      doc.rect(270, y, 285, 20).fill(lightGrey);
      doc.font("Helvetica-Bold").fillColor(blue).text("TOTAL MATERIALS COST", 275, y + 5, { width: 170, align: "right" });
      doc.fillColor(orange).text(`KSH ${totalMaterials.toLocaleString()}`, 450, y + 5, { width: 105, align: "center" });
      y += 25;

      // ─── Labour Cost ───
      doc.rect(40, y, 515, 20).fill(blue);
      doc.fontSize(10).fillColor("#fff").text("LABOUR COST", 45, y + 5);
      doc.fillColor(orange).text(`KSH ${pricing.labourCost.toLocaleString()}`, 450, y + 5, { width: 105, align: "center" });
      y += 25;

      // ─── Summary Totals ───
      doc.font("Helvetica-Bold").fontSize(9);
      doc.fillColor(blue).text("TOTAL MATERIALS COST", 300, y + 5, { width: 140, align: "right" });
      doc.text(`KSH ${totalMaterials.toLocaleString()}`, 450, y + 5, { width: 105, align: "center" });
      y += 15;
      
      doc.fillColor(blue).text("TOTAL LABOUR COST", 300, y + 5, { width: 140, align: "right" });
      doc.text(`KSH ${pricing.labourCost.toLocaleString()}`, 450, y + 5, { width: 105, align: "center" });
      y += 15;

      const grandTotal = totalMaterials + pricing.labourCost;
      doc.rect(300, y, 255, 25).fill(blue);
      doc.fillColor("#fff").fontSize(11).text("GRAND TOTAL", 310, y + 7);
      doc.fillColor(orange).text(`KSH ${grandTotal.toLocaleString()}`, 420, y + 7, { width: 130, align: "center" });
      y += 35;

      // ─── Terms & Footer ───
      if (y > 680) { doc.addPage(); y = 50; }
      
      doc.fontSize(8).font("Helvetica-Bold").fillColor(orange).text("TERMS & CONDITIONS", 40, y);
      doc.font("Helvetica").fillColor(blue);
      doc.text("• This quotation is valid for 30 days from the date above.", 40, y + 15);
      doc.text("• Prices are in Kenya Shillings and inclusive of all costs except VAT if applicable.", 40, y + 25);
      doc.text("• Payment terms to be agreed upon before commencement of work.", 40, y + 45);
      doc.text("• We thank you for the opportunity to submit this quotation and look forward to working with you.", 40, y + 65, { width: 250 });

      // ─── Signature ───
      const signatureFont = path.join(process.cwd(), "public", "fonts", "GreatVibes-Regular.ttf");
      if (fs.existsSync(signatureFont)) {
        doc.font(signatureFont).fontSize(28).fillColor(blue).text("Cyrus Maina", 310, y + 20);
      } else {
        doc.font("Helvetica-Oblique").fontSize(18).fillColor(blue).text("Cyrus Maina", 310, y + 30);
      }
      
      // Signature underline
      doc.moveTo(310, y + 48).lineTo(430, y + 48).strokeColor(blue).lineWidth(0.5).stroke();

      doc.font("Helvetica-Bold").fontSize(8).fillColor(orange).text("Engineer Cyrus Maina Wachira", 310, y + 55);
      doc.font("Helvetica").fillColor(blue).text("Electrical Wiring Expert\nProprietor", 310, y + 65);

      // ─── Circular Stamp ───
      const cx = 500;
      const cy = y + 45;
      
      doc.circle(cx, cy, 35).lineWidth(2).strokeColor(blue).stroke();
      doc.circle(cx, cy, 32).lineWidth(1).strokeColor(blue).stroke();
      
      doc.fontSize(6).font("Helvetica-Bold").fillColor(blue);
      doc.text("COMPLEX CYRUS", cx - 25, cy - 15, { width: 50, align: "center" });
      doc.text("ELECTRICAL", cx - 25, cy - 5, { width: 50, align: "center" });
      doc.text("SOLUTION", cx - 25, cy + 3, { width: 50, align: "center" });
      doc.fontSize(7).fillColor(orange).text("OFFICIAL SEAL", cx - 30, cy + 15, { width: 60, align: "center" });

      // ─── Bottom Orange Bar ───
      doc.rect(0, 800, 595, 42).fill(orange);
      doc.fontSize(10).font("Helvetica").fillColor("#fff");
      doc.text("Proudly Serving Kenya", 40, 815);
      doc.text("Quality. Safety. Reliability.", 0, 815, { align: "center", width: 595 });
      doc.text("www.complexcyruselectrical.co.ke", 0, 815, { align: "right", width: 555 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

// ─── Main Server Action ─────────────────────────────────────────────────────

export async function submitQuoteAction(data: QuoteData) {
  try {
    // 1. Save to Database
    const quote = await prisma.quoteRequest.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        location: data.location,
        service: data.service,
        message: data.message || "",
      },
    });

    const quoteNumber = `CCE/${new Date().getFullYear()}/${quote.id.slice(-6).toUpperCase()}`;

    // 2. Fetch latest pricing from DB
    const dbService = await prisma.service.findFirst({
      where: { name: data.service },
      include: { materials: { orderBy: { description: 'asc' } } }
    });
    
    let pricing: ServicePricing;
    if (dbService) {
      pricing = {
        labourCost: dbService.labourCost,
        labourDescription: dbService.labourDescription,
        materials: dbService.materials
      };
    } else {
      pricing = defaultPricing;
    }

    // 3. Generate branded PDF
    let pdfBuffer: Buffer | null = null;
    try {
      pdfBuffer = await generateQuotePDF(data, quoteNumber, pricing);
    } catch (pdfError) {
      console.error("PDF generation failed on Vercel, sending without attachment:", pdfError);
    }

    const adminEmail = process.env.ADMIN_EMAIL || "admin@complexcyrus.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "quotes@seek-on.app";
    const attachmentName = `Quotation-${quoteNumber.replace(/\//g, "-")}.pdf`;
    const attachments = pdfBuffer ? [{ filename: attachmentName, content: pdfBuffer }] : [];

    // 4. Send to Admin
    await resend.emails.send({
      from: `Complex Cyrus System <${fromEmail}>`,
      to: adminEmail,
      subject: `📋 New Quotation Request — ${data.name} (${data.service})`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1a2e5a;padding:20px;text-align:center">
            <h2 style="color:#fff;margin:0">New Quotation Request</h2>
          </div>
          <div style="padding:24px;background:#f9f9f9">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#666;width:130px">Client Name:</td><td style="font-weight:700;color:#1a2e5a">${data.name}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Phone:</td><td>${data.phone}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Email:</td><td>${data.email}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Location:</td><td>${data.location}</td></tr>
              <tr><td style="padding:6px 0;color:#666">Service:</td><td style="color:#E8600A;font-weight:700">${data.service}</td></tr>
              ${data.message ? `<tr><td style="padding:6px 0;color:#666;vertical-align:top">Details:</td><td>${data.message}</td></tr>` : ""}
            </table>
            <p style="margin-top:16px;color:#888;font-size:12px">${pdfBuffer ? 'The branded quotation PDF is attached to this email.' : 'The quotation details have been saved to the database. (PDF attachment was skipped due to server limitations).'}</p>
          </div>
        </div>`,
      attachments,
    });

    // 4. Send to Client
    await resend.emails.send({
      from: `Complex Cyrus Electrical Solution <${fromEmail}>`,
      to: data.email,
      subject: `Your Quotation Request — ${quoteNumber}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1a2e5a;padding:20px 24px;display:flex;align-items:center;justify-content:space-between">
            <div>
              <h1 style="color:#fff;margin:0;font-size:20px">Complex Cyrus Electrical Solution</h1>
              <p style="color:#E8600A;margin:4px 0 0;font-size:12px;letter-spacing:1px">POWERING SAFETY. DELIVERING EXCELLENCE.</p>
            </div>
          </div>
          <div style="padding:28px 24px;background:#fff">
            <p style="color:#1a2e5a;font-size:16px;font-weight:700;margin-bottom:12px">Dear ${data.name},</p>
            <p style="color:#444;line-height:1.7">Thank you for reaching out to us! We have received your quotation request for <strong style="color:#E8600A">${data.service}</strong> and our team is already reviewing your requirements.</p>
            <div style="background:#f8f9fc;border-left:4px solid #E8600A;padding:14px 18px;margin:20px 0;border-radius:0 8px 8px 0">
              <p style="margin:0;color:#1a2e5a;font-weight:700;font-size:13px">Quotation Reference: <span style="color:#E8600A">${quoteNumber}</span></p>
              <p style="margin:6px 0 0;color:#666;font-size:12px">Please use this reference number for any follow-up communication.</p>
            </div>
            <p style="color:#444;line-height:1.7">We will reach out within <strong>24 hours</strong> with a detailed cost breakdown tailored to your project at <strong>${data.location}</strong>. ${pdfBuffer ? 'A preliminary quotation PDF is attached for your records.' : 'Our engineers will prepare a full proposal shortly.'}</p>
            <p style="color:#444;line-height:1.7;margin-top:12px">For urgent inquiries, please call us directly at <strong style="color:#1a2e5a">+254 725 618 445</strong>.</p>
          </div>
          <div style="background:#E8600A;padding:16px 24px;text-align:center">
            <p style="color:#fff;margin:0;font-size:12px">Quality. Safety. Reliability. — Proudly Serving Kenya</p>
          </div>
        </div>`,
      attachments,
    });

    return { success: true, quoteNumber };
  } catch (error: any) {
    console.error("Error submitting quote:", error);
    return { success: false, error: error.message || "Failed to process request." };
  }
}
