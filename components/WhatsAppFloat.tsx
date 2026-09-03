import { MessageCircle } from "lucide-react";
import { siteSettings } from "@/lib/data";

export function whatsappHref(message = "Halo STS Feed, saya ingin berkonsultasi tentang produk pakan.") {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppFloat() {
  return (
    <a className="whatsapp-float" href={whatsappHref()} target="_blank" rel="noreferrer" aria-label="Chat WhatsApp dengan STS Feed">
      <MessageCircle size={22} fill="currentColor" />
      <span>Chat WhatsApp</span>
    </a>
  );
}
