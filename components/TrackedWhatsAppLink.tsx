"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackConversion } from "@/lib/analytics";

interface TrackedWhatsAppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  productSlug?: string;
  placement: string;
}

/** WhatsApp CTA with a PII-free conversion event. */
export default function TrackedWhatsAppLink({
  children,
  productSlug,
  placement,
  onClick,
  ...props
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackConversion({ name: "whatsapp_click", placement, productSlug });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
