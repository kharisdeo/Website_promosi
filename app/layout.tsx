import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { siteSettings } from "@/lib/data";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteSettings.companyName} — Distributor Pakan`,
    template: `%s | ${siteSettings.companyName}`,
  },
  description: `${siteSettings.companyName} menyediakan pilihan pakan ayam Bangkok dan koi melalui layanan distributor yang dekat dan responsif.`,
  keywords: ["distributor pakan", "pakan ayam Bangkok", "pakan koi", siteSettings.shortName, siteSettings.companyName],
  openGraph: {
    title: `${siteSettings.companyName} — Distributor Pakan`,
    description: `Pilihan pakan ayam Bangkok dan koi dari distributor ${siteSettings.shortName}.`,
    type: "website",
    locale: "id_ID",
    siteName: siteSettings.companyName,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
