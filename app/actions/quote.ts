"use server";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
import { Resend } from "resend";
import fs from "fs";
import path from "path";
import { getPricingForService, type LineItem } from "@/lib/pricing";

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

// ─── Branded HTML Template ──────────────────────────────────────────────────

function generateQuoteHTML(data: QuoteData, quoteNumber: string): string {
  const pricing = getPricingForService(data.service);
  const materials: LineItem[] = pricing.materials;

  // Calculate totals
  const totalMaterials = materials.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const totalLabour = pricing.labourCost;
  const grandTotal = totalMaterials + totalLabour;

  // Number to words (KSH)
  function numberToWords(n: number): string {
    if (n === 0) return "Zero";
    const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",
      "Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
    const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
    const convert = (num: number): string => {
      if (num < 20) return ones[num];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "");
      if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? " " + convert(num % 100) : "");
      if (num < 1000000) return convert(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? " " + convert(num % 1000) : "");
      return convert(Math.floor(num / 1000000)) + " Million" + (num % 1000000 ? " " + convert(num % 1000000) : "");
    };
    return "Kenya Shillings " + convert(Math.round(n)) + " Only";
  }
  const today = new Date();
  const validUntil = new Date(today);
  validUntil.setDate(today.getDate() + 30);

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Embed logo as base64 so it renders in headless Chromium
  let logoBase64 = "";
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;
  } catch (_) {
    // logo not found — fall back to text
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Quotation – ${quoteNumber}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',Arial,sans-serif;font-size:12px;color:#1a1a2e;background:#fff}

  /* ── Page wrapper ── */
  .page{width:794px;min-height:1123px;position:relative;overflow:hidden}

  /* ── Corner accents (orange triangles) ── */
  .corner-tr{position:absolute;top:0;right:0;width:0;height:0;
    border-style:solid;border-width:0 120px 120px 0;
    border-color:transparent #E8600A transparent transparent}
  .corner-bl{position:absolute;bottom:0;left:0;width:0;height:0;
    border-style:solid;border-width:0 0 80px 80px;
    border-color:transparent transparent #1a2e5a transparent}

  /* ── Header ── */
  .header{background:#fff;padding:28px 36px 20px;display:flex;align-items:center;
    justify-content:space-between;border-bottom:3px solid #E8600A;position:relative;z-index:1}
  .header-left{display:flex;align-items:center;gap:16px}
  .logo{width:80px;height:80px;object-fit:contain}
  .logo-fallback{width:80px;height:80px;background:#1a2e5a;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    color:#E8600A;font-size:32px;font-weight:900}
  .company-name{color:#1a2e5a;font-size:26px;font-weight:900;letter-spacing:1px;line-height:1.1}
  .company-sub{color:#E8600A;font-size:13px;font-weight:700;letter-spacing:2px;margin-top:2px}
  .company-tag{color:#555;font-size:10px;letter-spacing:1px;margin-top:4px;border-top:1px solid #ddd;padding-top:4px}
  .doc-type{text-align:right}
  .doc-type h1{font-size:32px;font-weight:900;color:#1a2e5a;letter-spacing:2px}
  .doc-meta{color:#555;font-size:11px;margin-top:6px;line-height:1.8}
  .doc-meta strong{color:#E8600A}

  /* ── Contact bar ── */
  .contact-bar{background:#f8f9fc;border-bottom:2px solid #e5e7eb;
    display:flex;padding:10px 36px;gap:0;position:relative;z-index:1}
  .contact-item{flex:1;display:flex;align-items:flex-start;gap:8px;
    border-right:1px solid #ddd;padding:0 12px}
  .contact-item:first-child{padding-left:0}
  .contact-item:last-child{border-right:none}
  .contact-label{font-size:9px;font-weight:700;color:#E8600A;text-transform:uppercase;letter-spacing:1px;margin-bottom:2px}
  .contact-value{font-size:10px;color:#333;line-height:1.5}
  .contact-icon{width:24px;height:24px;background:#1a2e5a;border-radius:50%;
    display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
  .contact-icon svg{width:12px;height:12px;fill:#fff}

  /* ── Body ── */
  .body{padding:24px 36px;position:relative;z-index:1}

  /* ── Section title row ── */
  .section-title-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
  .section-badge{background:#1a2e5a;color:#fff;font-size:22px;font-weight:900;
    letter-spacing:2px;padding:6px 18px;position:relative;clip-path:polygon(0 0,calc(100% - 12px) 0,100% 100%,0 100%)}
  .section-date{color:#555;font-size:11px;line-height:1.8}
  .section-date strong{color:#E8600A;font-weight:700}

  /* ── Client/project info ── */
  .info-row{display:flex;gap:8px;margin-bottom:16px}
  .info-label{color:#E8600A;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:1px;width:70px;flex-shrink:0;padding-top:1px}
  .info-value{color:#1a2e5a;font-weight:600;font-size:12px}

  /* ── Items table ── */
  table{width:100%;border-collapse:collapse;margin-bottom:16px}
  thead tr{background:#1a2e5a;color:#fff}
  thead th{padding:9px 10px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px}
  thead th.center{text-align:center}
  thead th.right{text-align:right}
  tbody tr:nth-child(even){background:#f8f9fc}
  tbody tr:nth-child(odd){background:#fff}
  tbody td{padding:8px 10px;font-size:11px;vertical-align:top;border-bottom:1px solid #e5e7eb}
  tbody td.center{text-align:center}
  tbody td.right{text-align:right}
  .row-number{background:#E8600A;color:#fff;font-weight:700;width:28px;height:28px;
    border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px}
  tfoot td{padding:8px 10px;font-size:11px;font-weight:700;border-top:2px solid #1a2e5a}
  .total-row td{background:#f0f4ff;color:#1a2e5a}
  .grand-total-row td{background:#E8600A;color:#fff;font-size:13px;font-weight:900}

  /* ── Note / preliminary banner ── */
  .note-banner{background:#fff8f0;border:1px solid #f0d0b0;border-left:4px solid #E8600A;
    border-radius:4px;padding:10px 14px;margin-bottom:16px;font-size:10px;color:#7a4010;line-height:1.6}
  .note-banner strong{color:#E8600A}

  /* ── Terms & footer section ── */
  .bottom-section{display:flex;gap:20px;margin-top:20px}
  .terms{flex:1}
  .terms h4{color:#E8600A;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
  .terms ul{padding-left:14px;color:#444;font-size:10px;line-height:1.8}
  .signature-block{flex:1;text-align:center}
  .sig-line{border-bottom:1px solid #1a2e5a;margin:30px 20px 6px;height:1px}
  .sig-name{font-weight:700;color:#1a2e5a;font-size:11px}
  .sig-title{color:#E8600A;font-size:10px}
  .seal-block{display:flex;flex-direction:column;align-items:center;gap:8px}
  .seal-ring{width:80px;height:80px;border-radius:50%;border:3px solid #1a2e5a;
    display:flex;align-items:center;justify-content:center;font-size:9px;
    color:#1a2e5a;font-weight:700;text-align:center;padding:8px;line-height:1.3}
  .stamp-box{border:2px solid #E8600A;padding:6px 10px;text-align:center;
    font-size:9px;font-weight:700;color:#E8600A;line-height:1.5}

  /* ── Bottom footer bar ── */
  .footer-icons{background:#1a2e5a;display:flex;justify-content:space-around;
    align-items:center;padding:12px 36px;margin-top:24px}
  .footer-icon-item{display:flex;flex-direction:column;align-items:center;gap:4px;
    color:#fff;font-size:9px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase}
  .footer-icon-item svg{width:22px;height:22px;fill:#E8600A}
  .footer-bar{background:#E8600A;display:flex;justify-content:space-between;
    align-items:center;padding:8px 36px;color:#fff;font-size:10px;font-weight:600}
</style>
</head>
<body>
<div class="page">
  <!-- Corner accents -->
  <div class="corner-tr"></div>
  <div class="corner-bl"></div>

  <!-- ── Header ── -->
  <div class="header">
    <div class="header-left">
      ${logoBase64 ? `<img src="${logoBase64}" class="logo" alt="Complex Cyrus Logo"/>` : `<div class="logo-fallback">M</div>`}
      <div>
        <div class="company-name">COMPLEX CYRUS</div>
        <div class="company-sub">ELECTRICAL SOLUTION</div>
        <div class="company-tag">— POWERING SAFETY. DELIVERING EXCELLENCE. —</div>
      </div>
    </div>
    <div class="doc-type">
      <h1>QUOTATION</h1>
      <div class="doc-meta">
        <strong>No.</strong> &nbsp;${quoteNumber}<br/>
        <strong>Date:</strong> &nbsp;${fmt(today)}<br/>
        <strong>Valid Until:</strong> &nbsp;${fmt(validUntil)}
      </div>
    </div>
  </div>

  <!-- ── Contact Bar ── -->
  <div class="contact-bar">
    <div class="contact-item">
      <div class="contact-icon">
        <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
      </div>
      <div>
        <div class="contact-label">Address</div>
        <div class="contact-value">Witeithie House, Kenyatta Avenue<br/>Kiambu, Thika West District<br/>P.O. Box 65-01000, Thika, Kenya</div>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon">
        <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      </div>
      <div>
        <div class="contact-label">Phone</div>
        <div class="contact-value">+254 725 618 445</div>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon">
        <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </div>
      <div>
        <div class="contact-label">Email</div>
        <div class="contact-value">complexcyrus@gmail.com</div>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon">
        <svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/></svg>
      </div>
      <div>
        <div class="contact-label">Registration No.</div>
        <div class="contact-value"><strong>BN-WLSPEMMP</strong><br/>THE REGISTRATION OF<br/>BUSINESS NAMES ACT<br/>(Cap. 499, Section 14)</div>
      </div>
    </div>
  </div>

  <!-- ── Body ── -->
  <div class="body">

    <!-- Section title + dates -->
    <div class="section-title-row">
      <div class="section-badge">QUOTATION</div>
      <div class="section-date">
        <strong>QUOTATION DATE:</strong> ${fmt(today)}<br/>
        <strong>VALIDITY:</strong> ${fmt(today)} – ${fmt(validUntil)}
      </div>
    </div>

    <!-- Client info -->
    <div class="info-row"><span class="info-label">CLIENT NAME:</span><span class="info-value">${data.name}</span></div>
    <div class="info-row"><span class="info-label">PHONE:</span><span class="info-value">${data.phone}</span></div>
    <div class="info-row"><span class="info-label">EMAIL:</span><span class="info-value">${data.email}</span></div>
    <div class="info-row"><span class="info-label">PROJECT:</span><span class="info-value">${data.service}</span></div>
    <div class="info-row"><span class="info-label">LOCATION:</span><span class="info-value">${data.location}</span></div>
    ${data.message ? `<div class="info-row"><span class="info-label">DETAILS:</span><span class="info-value">${data.message}</span></div>` : ""}

    <!-- MATERIALS table -->
    <div style="background:#1a2e5a;color:#fff;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:7px 14px;margin-bottom:0">MATERIALS</div>
    <table>
      <thead>
        <tr>
          <th style="width:36px">No.</th>
          <th>Description</th>
          <th class="center" style="width:60px">Qty</th>
          <th class="center" style="width:55px">Unit</th>
          <th class="right" style="width:105px">Unit Price (KSH)</th>
          <th class="right" style="width:105px">Amount (KSH)</th>
        </tr>
      </thead>
      <tbody>
        ${materials.map((item, i) => {
          const amount = item.qty * item.unitPrice;
          return `<tr>
            <td class="center"><span class="row-number">${i + 1}</span></td>
            <td>${item.description}</td>
            <td class="center">${item.qty} ${item.unit}</td>
            <td class="center">${item.unit}</td>
            <td class="right">${item.unitPrice.toLocaleString()}</td>
            <td class="right">${amount.toLocaleString()}</td>
          </tr>`;
        }).join("")}
      </tbody>
      <tfoot>
        <tr class="total-row">
          <td colspan="5" style="text-align:right;font-weight:700">TOTAL MATERIALS COST</td>
          <td style="text-align:right;font-weight:700">KSH ${totalMaterials.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>

    <!-- LABOUR table -->
    <div style="background:#1a2e5a;color:#fff;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:7px 14px;margin-bottom:0">LABOUR COST</div>
    <table>
      <thead>
        <tr>
          <th style="width:36px">No.</th>
          <th>Description</th>
          <th class="center" style="width:60px">Qty</th>
          <th class="center" style="width:55px">Unit</th>
          <th class="right" style="width:105px">Rate (KSH)</th>
          <th class="right" style="width:105px">Total (KSH)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="center"><span class="row-number">1</span></td>
          <td>${pricing.labourDescription}</td>
          <td class="center">1</td>
          <td class="center">Job</td>
          <td class="right">${totalLabour.toLocaleString()}</td>
          <td class="right">${totalLabour.toLocaleString()}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="total-row">
          <td colspan="5" style="text-align:right;font-weight:700">TOTAL LABOUR COST</td>
          <td style="text-align:right;font-weight:700">KSH ${totalLabour.toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>

    <!-- Summary totals + Amount in words -->
    <div style="display:flex;gap:24px;margin-bottom:16px;align-items:flex-start">
      <div style="flex:1">
        <div style="color:#E8600A;font-weight:700;font-size:10px;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">AMOUNT IN WORDS:</div>
        <div style="font-style:italic;color:#333;font-size:10px;border-bottom:1px solid #ddd;padding-bottom:6px">${numberToWords(grandTotal)}</div>
      </div>
      <div style="min-width:260px">
        <table style="margin-bottom:0">
          <tr class="total-row">
            <td style="font-weight:700">TOTAL MATERIALS COST</td>
            <td style="text-align:right">KSH ${totalMaterials.toLocaleString()}</td>
          </tr>
          <tr class="total-row">
            <td style="font-weight:700">TOTAL LABOUR COST</td>
            <td style="text-align:right">KSH ${totalLabour.toLocaleString()}</td>
          </tr>
          <tr class="grand-total-row">
            <td style="font-weight:900">GRAND TOTAL (KSH)</td>
            <td style="text-align:right;font-weight:900">KSH ${grandTotal.toLocaleString()}</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Bottom section: terms + signatures -->
    <div class="bottom-section">
      <!-- Terms -->
      <div class="terms">
        <h4>Terms &amp; Conditions</h4>
        <ul>
          <li>This quotation is valid for 30 days from the date above.</li>
          <li>Prices are in Kenya Shillings inclusive of all costs except VAT if applicable.</li>
          <li>Payment terms: 50% deposit, balance on completion.</li>
          <li>Materials remain the property of Complex Cyrus Electrical Solution until full payment is made.</li>
          <li>Any additional work not included above will be charged separately.</li>
          <li>Payments can be made via Bank Transfer or M-Pesa.</li>
        </ul>
        <p style="margin-top:10px;color:#E8600A;font-weight:700;font-size:10px;font-style:italic">Thank you for considering our services.</p>
      </div>

      <!-- Signatures -->
      <div style="flex:1;display:flex;gap:16px;align-items:flex-end">
        <div class="signature-block" style="flex:1">
          <div class="sig-line"></div>
          <div class="sig-name">Engineer Cyrus Maina Wachira</div>
          <div class="sig-title">Electrical Wiring Expert · Proprietor</div>
          <div style="margin-top:4px;font-size:9px;color:#666">Prepared by</div>
        </div>
        <div class="seal-block">
          <div class="seal-ring">COMPLEX<br/>CYRUS<br/>ELECTRICAL<br/>SOLUTION<br/>OFFICIAL SEAL</div>
          <div class="stamp-box">COMPLEX CYRUS<br/>ELECTRICAL SOLUTION<br/>P.O. BOX 65-01000,<br/>THIKA · KIAMBU, KENYA<br/><span style="font-size:8px;color:#888">COMPANY STAMP</span></div>
        </div>
      </div>
    </div>

  </div><!-- /body -->

  <!-- ── Service Icons Footer ── -->
  <div class="footer-icons">
    <div class="footer-icon-item">
      <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
      RESIDENTIAL<br/>WIRING
    </div>
    <div class="footer-icon-item">
      <svg viewBox="0 0 24 24"><path d="M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zm-6 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm4 4h-2v-2h2v2zm0-4h-2V9h2v2z"/></svg>
      COMMERCIAL<br/>WIRING
    </div>
    <div class="footer-icon-item">
      <svg viewBox="0 0 24 24"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>
      INDUSTRIAL<br/>SOLUTIONS
    </div>
    <div class="footer-icon-item">
      <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 100 18A9 9 0 0012 3zm0 2a7 7 0 110 14A7 7 0 0112 5zm-.5 3.5v5l4.25 2.52.75-1.23-3.5-2.08V8.5h-1.5z"/></svg>
      RENEWABLE<br/>ENERGY
    </div>
  </div>

  <!-- ── Bottom orange bar ── -->
  <div class="footer-bar">
    <span>🌐 &nbsp;Proudly Serving Kenya</span>
    <span>Quality. Safety. Reliability.</span>
    <span>🌐 &nbsp;www.complexcyruselectrical.co.ke</span>
  </div>

</div>
</body>
</html>`;
}

// ─── PDF Generation using Puppeteer ────────────────────────────────────────

async function generateQuotePDF(data: QuoteData, quoteNumber: string): Promise<Buffer> {
  // Dynamic import so it only loads in server context
  const puppeteer = await import("puppeteer-core");
  const chromium = await import("@sparticuz/chromium");

  const executablePath = await chromium.default.executablePath();

  const browser = await puppeteer.default.launch({
    args: chromium.default.args,
    executablePath,
    headless: true,
  });

  try {
    const page = await browser.newPage();
    const html = generateQuoteHTML(data, quoteNumber);
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
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

    // 2. Generate branded PDF
    const pdfBuffer = await generateQuotePDF(data, quoteNumber);

    const adminEmail = process.env.ADMIN_EMAIL || "admin@complexcyrus.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "quotes@seek-on.app";
    const attachmentName = `Quotation-${quoteNumber.replace(/\//g, "-")}.pdf`;

    // 3. Send to Admin
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
            <p style="margin-top:16px;color:#888;font-size:12px">The branded quotation PDF is attached to this email.</p>
          </div>
        </div>`,
      attachments: [{ filename: attachmentName, content: pdfBuffer }],
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
            <p style="color:#444;line-height:1.7">We will reach out within <strong>24 hours</strong> with a detailed cost breakdown tailored to your project at <strong>${data.location}</strong>. A preliminary quotation PDF is attached for your records.</p>
            <p style="color:#444;line-height:1.7;margin-top:12px">For urgent inquiries, please call us directly at <strong style="color:#1a2e5a">+254 725 618 445</strong>.</p>
          </div>
          <div style="background:#E8600A;padding:16px 24px;text-align:center">
            <p style="color:#fff;margin:0;font-size:12px">Quality. Safety. Reliability. — Proudly Serving Kenya</p>
          </div>
        </div>`,
      attachments: [{ filename: attachmentName, content: pdfBuffer }],
    });

    return { success: true, quoteNumber };
  } catch (error) {
    console.error("Error submitting quote:", error);
    return { success: false, error: "Failed to process request." };
  }
}
