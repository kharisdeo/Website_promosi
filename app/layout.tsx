import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "STS Feed — Nutrisi tepat, ternak hebat",
    template: "%s | STS Feed",
  },
  description: "Pakan ternak berkualitas dan pendampingan yang dekat untuk membantu peternak Indonesia tumbuh lebih kuat.",
  keywords: ["pakan ternak", "pakan ayam", "pakan sapi", "STS Feed", "peternakan Indonesia"],
  openGraph: {
    title: "STS Feed — Nutrisi tepat, ternak hebat",
    description: "Pakan ternak berkualitas dan pendampingan yang dekat untuk membantu peternak Indonesia tumbuh lebih kuat.",
    type: "website",
    locale: "id_ID",
    siteName: "STS Feed",
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
