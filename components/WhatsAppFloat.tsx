import { MessageCircle } from "lucide-react";
import { siteSettings } from "@/lib/data";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";

export function whatsappHref(message = "Halo Jaya Abadi, saya ingin berkonsultasi tentang produk pakan.") {
  return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function WhatsAppFloat() {
  return (
    <TrackedWhatsAppLink className="whatsapp-float" href={whatsappHref()} target="_blank" rel="noreferrer" aria-label="Chat WhatsApp dengan Jaya Abadi" placement="floating_whatsapp">
      <MessageCircle size={22} fill="currentColor" />
      <span>Chat WhatsApp</span>
    </TrackedWhatsAppLink>
  );
}
