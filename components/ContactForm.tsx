"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ defaultTopic = "Pertanyaan umum" }: { defaultTopic?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", topic: defaultTopic, message: "", consent: false });

  const update = (key: keyof typeof form, value: string | boolean) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim() || !form.consent) {
      setStatus("error");
      setError("Lengkapi nama, nomor HP, pesan, dan persetujuan privasi sebelum mengirim.");
      return;
    }
    setStatus("submitting");
    // Integration boundary: replace with the approved lead API/CMS action when backend is connected.
    await new Promise((resolve) => setTimeout(resolve, 650));
    setStatus("success");
    setForm({ name: "", phone: "", topic: defaultTopic, message: "", consent: false });
  };

  if (status === "success") return <div className="form-success" role="status"><strong>Pesanmu sudah diterima.</strong><span>Tim STS Feed akan menghubungi melalui nomor yang kamu berikan. Terima kasih sudah menghubungi kami.</span><div style={{ marginTop: "15px" }}><button className="button button-dark button-small" type="button" onClick={() => setStatus("idle")}>Kirim pesan lain</button></div></div>;

  return <form className="contact-form" onSubmit={submit} noValidate><h2>Ceritakan kebutuhanmu</h2><p className="form-help" style={{ marginTop: "7px" }}>Kami biasanya membalas pada jam operasional di hari yang sama.</p><div className="form-grid"><div className="field"><label htmlFor="contact-name">Nama lengkap <span aria-hidden="true">*</span></label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Contoh: Budi Santoso" value={form.name} onChange={(event) => update("name", event.target.value)} required /></div><div className="field"><label htmlFor="contact-phone">Nomor HP / WhatsApp <span aria-hidden="true">*</span></label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="08xx-xxxx-xxxx" value={form.phone} onChange={(event) => update("phone", event.target.value)} required /></div><div className="field full"><label htmlFor="contact-topic">Topik konsultasi</label><select id="contact-topic" name="topic" value={form.topic} onChange={(event) => update("topic", event.target.value)}><option>Pertanyaan umum</option><option>Tanya harga produk</option><option>Konsultasi pakan</option><option>Kemitraan / distribusi</option></select></div><div className="field full"><label htmlFor="contact-message">Pesan <span aria-hidden="true">*</span></label><textarea id="contact-message" name="message" placeholder="Ceritakan sedikit tentang kebutuhan atau jenis ternakmu..." value={form.message} onChange={(event) => update("message", event.target.value)} required /><span className="form-help">Jangan cantumkan data sensitif yang tidak diperlukan.</span></div></div>{status === "error" && <p className="form-error" role="alert">{error}</p>}<div className="consent"><input id="contact-consent" name="consent" type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} required /><label htmlFor="contact-consent">Saya setuju data ini digunakan untuk menindaklanjuti pertanyaan saya sesuai <Link href="/privacy">Kebijakan Privasi</Link>.</label></div><button className="button button-dark" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Mengirim..." : "Kirim pesan"}</button></form>;
}
