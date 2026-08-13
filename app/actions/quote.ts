"use server";

import { PrismaClient } from "@prisma/client";
import sgMail from "@sendgrid/mail";
import PDFDocument from "pdfkit";

// Use a global variable to avoid instantiating multiple Prisma clients in dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface QuoteData {
  name: string;
  phone: string;
  email: string;
  location: string;
  service: string;
  message: string;
}

// Helper to generate PDF as a Buffer
function generateQuotePDF(data: QuoteData, quoteId: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers: Buffer[] = [];

      doc.on("data", (buffer) => buffers.push(buffer));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      doc.on("error", reject);

      // Header
      doc.fontSize(24).font("Helvetica-Bold").text("QUOTATION", { align: "center" });
      doc.moveDown();

      // Company Details
      doc.fontSize(12).font("Helvetica-Bold").text("Complex Cyrus Electrical Solution");
      doc.font("Helvetica").text("Thika, Kiambu County");
      doc.text("Phone: +254 7XX XXX XXX"); // Update with actual
      doc.text("Email: admin@complexcyrus.com");
      doc.moveDown();

      // Quote Info
      doc.font("Helvetica-Bold").text(`Quote #: `, { continued: true }).font("Helvetica").text(quoteId.slice(-6).toUpperCase());
      doc.font("Helvetica-Bold").text(`Date: `, { continued: true }).font("Helvetica").text(new Date().toLocaleDateString());
      doc.moveDown();

      // Client Details
      doc.font("Helvetica-Bold").text("Prepared For:");
      doc.font("Helvetica").text(`Name: ${data.name}`);
      doc.text(`Phone: ${data.phone}`);
      doc.text(`Email: ${data.email}`);
      doc.text(`Location: ${data.location}`);
      doc.moveDown(2);

      // Service Details
      doc.font("Helvetica-Bold").text("Service Requested:");
      doc.font("Helvetica").text(data.service);
      doc.moveDown();
      
      if (data.message) {
        doc.font("Helvetica-Bold").text("Additional Details:");
        doc.font("Helvetica").text(data.message);
        doc.moveDown(2);
      }

      // Next Steps
      doc.font("Helvetica-Oblique").text("Note: This is a preliminary quotation request summary. Our team will review your requirements and provide a detailed cost breakdown shortly.");
      
      // Footer
      doc.moveDown(3);
      doc.font("Helvetica").fontSize(10).text("Thank you for choosing Complex Cyrus Electrical Solution!", { align: "center" });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

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

    // 2. Generate PDF
    const pdfBuffer = await generateQuotePDF(data, quote.id);
    const pdfBase64 = pdfBuffer.toString("base64");

    // 3. Prepare Email sending via SendGrid
    const adminEmail = process.env.ADMIN_EMAIL || "admin@complexcyrus.com";
    const fromEmail = process.env.SENDGRID_FROM_EMAIL || "your-verified-email@gmail.com"; 

    const attachmentName = `Quotation-${quote.id.slice(-6).toUpperCase()}.pdf`;
    const attachment = {
      content: pdfBase64,
      filename: attachmentName,
      type: "application/pdf",
      disposition: "attachment",
    };

    // 4. Send Email to Admin using SendGrid
    const adminMsg = {
      to: adminEmail,
      from: fromEmail,
      subject: `New Quotation Request - ${data.name}`,
      text: `You have received a new quotation request for ${data.service} from ${data.name}. Please see the attached PDF for details.`,
      attachments: [attachment],
    };

    // 5. Send Email to Client using SendGrid
    const clientMsg = {
      to: data.email,
      from: fromEmail,
      subject: `Your Quotation Request - Complex Cyrus Electrical Solution`,
      text: `Hello ${data.name},\n\nThank you for requesting a quotation for ${data.service}. We have received your request and attached a summary PDF for your records.\n\nOur team will review this and get back to you shortly with detailed pricing.\n\nBest Regards,\nComplex Cyrus Electrical Solution`,
      attachments: [attachment],
    };

    // Send both emails
    await sgMail.send([adminMsg, clientMsg]);

    return { success: true };
  } catch (error) {
    console.error("Error submitting quote:", error);
    return { success: false, error: "Failed to process request." };
  }
}
