"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { trackConversion } from "@/lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";
type LeadType = "contact" | "product" | "partnership";

interface ContactFormProps {
  defaultTopic?: string;
  endpoint?: "/api/leads" | "/api/partnerships";
  type?: LeadType;
  productSlug?: string;
  heading?: string;
  intro?: string;
  submitLabel?: string;
  successTitle?: string;
  successDescription?: string;
}

interface FormState {
  name: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
  website: string;
}

const initialForm = (defaultTopic: string): FormState => ({
  name: "",
  phone: "",
  topic: defaultTopic,
  message: "",
  consent: false,
  website: "",
});

function getAttribution() {
  if (typeof window === "undefined") return undefined;

  const allowedKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];
  const params = new URLSearchParams(window.location.search);
  const entries = allowedKeys
    .map((key) => [key, params.get(key)?.trim() || ""] as const)
    .filter(([, value]) => value.length > 0 && value.length <= 200);
  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

function normalizePhone(value: string) {
  return value.replace(/[\s()-]/g, "");
}

function clientValidation(form: FormState) {
  if (form.name.trim().length < 2) return "Nama lengkap minimal terdiri dari 2 karakter.";
  const phone = normalizePhone(form.phone.trim());
  if (!/^(?:\+62|62|0)8\d{7,13}$/.test(phone)) return "Masukkan nomor HP/WhatsApp Indonesia yang valid.";
  if (form.message.trim().length < 2) return "Ceritakan kebutuhanmu minimal dalam 2 karakter.";
  if (!form.consent) return "Persetujuan privasi wajib diberikan sebelum mengirim.";
  return "";
}

async function readApiError(response: Response) {
  try {
    const body = (await response.json()) as { error?: { message?: string } };
    return body.error?.message || "Pesan belum dapat dikirim. Coba lagi beberapa saat.";
  } catch {
    return "Pesan belum dapat dikirim. Coba lagi beberapa saat.";
  }
}

export default function ContactForm({
  defaultTopic = "Pertanyaan umum",
  endpoint = "/api/leads",
  type = "contact",
  productSlug,
  heading = "Ceritakan kebutuhanmu",
  intro = "Kami biasanya membalas pada jam operasional di hari yang sama.",
  submitLabel = "Kirim pesan",
  successTitle = "Pesanmu sudah diterima.",
  successDescription = "Tim Jaya Abadi akan menghubungi melalui nomor yang kamu berikan. Terima kasih sudah menghubungi kami.",
}: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(() => initialForm(defaultTopic));
  const isSubmitting = status === "submitting";

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (status === "error") setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const validationError = clientValidation(form);
    if (validationError) {
      setStatus("error");
      setError(validationError);
      return;
    }

    setStatus("submitting");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: normalizePhone(form.phone.trim()),
          topic: form.topic.trim() || undefined,
          message: form.message.trim(),
          consent: form.consent,
          type,
          productSlug,
          sourcePage: window.location.pathname,
          utm: getAttribution(),
          // Deliberately included for the server-side spam trap. This field is
          // visually hidden and should remain empty for real visitors.
          website: form.website,
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error(await readApiError(response));
      setStatus("success");
      setForm(initialForm(defaultTopic));
      trackConversion({ name: "lead_submitted", leadType: type, placement: endpoint === "/api/partnerships" ? "partnership_form" : "contact_form", productSlug });
    } catch (submissionError) {
      setStatus("error");
      setError(submissionError instanceof Error && submissionError.name !== "AbortError"
        ? submissionError.message
        : "Koneksi sedang bermasalah. Periksa internetmu lalu coba lagi.");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (status === "success") {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <strong>{successTitle}</strong>
        <span>{successDescription}</span>
        <div style={{ marginTop: "15px" }}>
          <button className="button button-dark button-small" type="button" onClick={() => setStatus("idle")}>
            Kirim pesan lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate aria-busy={isSubmitting}>
      <h2>{heading}</h2>
      <p className="form-help" style={{ marginTop: "7px" }}>{intro}</p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="contact-name">Nama lengkap <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Contoh: Budi Santoso" value={form.name} onChange={(event) => update("name", event.target.value)} required disabled={isSubmitting} />
        </div>
        <div className="field">
          <label htmlFor="contact-phone">Nomor HP / WhatsApp <span aria-hidden="true">*</span></label>
          <input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="08xx-xxxx-xxxx" value={form.phone} onChange={(event) => update("phone", event.target.value)} required disabled={isSubmitting} />
        </div>
        <div className="field full">
          <label htmlFor="contact-topic">Topik konsultasi</label>
          <select id="contact-topic" name="topic" value={form.topic} onChange={(event) => update("topic", event.target.value)} disabled={isSubmitting}>
            <option>Pertanyaan umum</option>
            <option>Tanya harga produk</option>
            <option>Konsultasi pakan</option>
            <option>Kemitraan / distribusi</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="contact-message">Pesan <span aria-hidden="true">*</span></label>
          <textarea id="contact-message" name="message" placeholder="Ceritakan sedikit tentang kebutuhan atau jenis ternakmu..." value={form.message} onChange={(event) => update("message", event.target.value)} required disabled={isSubmitting} />
          <span className="form-help">Jangan cantumkan data sensitif yang tidak diperlukan.</span>
        </div>
      </div>
      <div className="honeypot-field" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(event) => update("website", event.target.value)} />
      </div>
      {status === "error" && <p className="form-error" role="alert">{error}</p>}
      <div className="consent">
        <input id="contact-consent" name="consent" type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} required disabled={isSubmitting} />
        <label htmlFor="contact-consent">Saya setuju data ini digunakan untuk menindaklanjuti pertanyaan saya sesuai <Link href="/privacy">Kebijakan Privasi</Link>.</label>
      </div>
      <button className="button button-dark" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Mengirim..." : submitLabel}
      </button>
    </form>
  );
}
