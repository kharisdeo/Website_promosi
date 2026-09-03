import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <section className="page-hero"><div className="container"><p className="eyebrow">404 · Halaman tidak ditemukan</p><h1>Sepertinya halaman ini sedang beristirahat.</h1><p>Gunakan navigasi untuk kembali menjelajah produk dan cerita dari STS Feed.</p><Link href="/" className="button button-dark" style={{ marginTop: "26px" }}><ArrowLeft size={17} /> Kembali ke Beranda</Link></div></section>;
}
