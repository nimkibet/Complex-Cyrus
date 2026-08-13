import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Complex Cyrus Electrical Solution | Professional Electrical Services in Kenya",
  description:
    "Complex Cyrus Electrical Solution is a registered Kenyan electrical engineering company led by Engineer Cyrus Maina Wachira. We offer domestic, commercial, industrial electrical installation, solar PV, CCTV, electric fence, and 24/7 emergency services.",
  keywords:
    "Complex Cyrus, Cyrus Electricals, Complex Cyrus Electrical Solution, Cyrus Electrical, Complex Cyrus Kenya, Cyrus Maina Wachira electrician, electrical services Kenya, solar installation Kenya, CCTV installation, electric fence Kenya, Kiambu electrical contractor, Thika electrician",
  openGraph: {
    title: "Complex Cyrus Electrical Solution",
    description: "Powering Safety. Delivering Excellence.",
    type: "website",
    locale: "en_KE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased font-sans bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
