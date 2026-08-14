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
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // Branding Header
      doc.fontSize(22).fillColor("#1a2e5a").text("COMPLEX CYRUS ELECTRICAL SOLUTION", { align: "center" });
      doc.fontSize(10).fillColor("#E8600A").text("POWERING SAFETY. DELIVERING EXCELLENCE.", { align: "center" });
      doc.moveDown(2);

      // Document Title
      doc.fontSize(18).fillColor("#1a2e5a").text("QUOTATION", { underline: true });
      doc.moveDown(0.5);

      // Meta Info
      doc.fontSize(10).fillColor("#333");
      doc.text(`Quote Reference: ${quoteNumber}`);
      doc.text(`Date: ${new Date().toLocaleDateString()}`);
      doc.text(`Valid Until: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`);
      doc.moveDown();

      // Client Info
      doc.fillColor("#E8600A").text("CLIENT DETAILS");
      doc.fillColor("#333");
      doc.text(`Name: ${data.name}`);
      doc.text(`Phone: ${data.phone}`);
      doc.text(`Email: ${data.email}`);
      doc.text(`Location: ${data.location}`);
      doc.text(`Project: ${data.service}`);
      if (data.message) {
        doc.text(`Details: ${data.message}`);
      }
      doc.moveDown(2);

      // Pricing Breakdown
      doc.fontSize(14).fillColor("#1a2e5a").text("ESTIMATED BREAKDOWN", { underline: true });
      doc.moveDown();

      let y = doc.y;
      doc.fontSize(10).fillColor("#000");

      const totalMaterials = pricing.materials.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
      const grandTotal = totalMaterials + pricing.labourCost;

      // Header row
      doc.font("Helvetica-Bold");
      doc.text("Description", 50, y);
      doc.text("Qty", 350, y, { width: 50, align: "right" });
      doc.text("Unit Price", 400, y, { width: 70, align: "right" });
      doc.text("Total", 470, y, { width: 70, align: "right" });
      y += 15;
      
      doc.moveTo(50, y).lineTo(540, y).strokeColor("#ccc").stroke();
      y += 10;
      doc.font("Helvetica");

      // Materials
      pricing.materials.forEach((m) => {
        if (y > 700) { doc.addPage(); y = 50; }
        doc.text(m.description, 50, y, { width: 290 });
        doc.text(`${m.qty} ${m.unit}`, 350, y, { width: 50, align: "right" });
        doc.text(m.unitPrice.toLocaleString(), 400, y, { width: 70, align: "right" });
        doc.text((m.qty * m.unitPrice).toLocaleString(), 470, y, { width: 70, align: "right" });
        y += 15;
      });

      // Labour
      if (y > 700) { doc.addPage(); y = 50; }
      y += 10;
      doc.text("Labour & Installation Cost", 50, y, { width: 290 });
      doc.text("1 Job", 350, y, { width: 50, align: "right" });
      doc.text(pricing.labourCost.toLocaleString(), 400, y, { width: 70, align: "right" });
      doc.text(pricing.labourCost.toLocaleString(), 470, y, { width: 70, align: "right" });
      y += 20;

      // Totals
      doc.moveTo(350, y).lineTo(540, y).strokeColor("#1a2e5a").lineWidth(2).stroke();
      y += 10;
      
      doc.font("Helvetica-Bold");
      doc.text("TOTAL MATERIALS:", 300, y, { width: 150, align: "right" });
      doc.text(`KSH ${totalMaterials.toLocaleString()}`, 470, y, { width: 70, align: "right" });
      y += 15;

      doc.text("TOTAL LABOUR:", 300, y, { width: 150, align: "right" });
      doc.text(`KSH ${pricing.labourCost.toLocaleString()}`, 470, y, { width: 70, align: "right" });
      y += 15;

      doc.fontSize(12).fillColor("#E8600A");
      doc.text("GRAND TOTAL:", 300, y, { width: 150, align: "right" });
      doc.text(`KSH ${grandTotal.toLocaleString()}`, 460, y, { width: 80, align: "right" });

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
