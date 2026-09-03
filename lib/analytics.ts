"use client";

/**
 * Small analytics boundary for public conversion events.
 *
 * Only non-identifying context is accepted here. A provider can consume the
 * browser event or dataLayer entry later without exposing lead form fields.
 */
export type ConversionEventName =
  | "whatsapp_click"
  | "brochure_download"
  | "lead_submitted";

export interface SafeConversionEvent {
  name: ConversionEventName;
  placement?: string;
  productSlug?: string;
  leadType?: "contact" | "partnership" | "product";
}

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackConversion(event: SafeConversionEvent) {
  if (typeof window === "undefined") return;

  // Keep the payload deliberately small and free of name, phone, message, or
  // any other form data. The current app has no vendor-specific dependency.
  const payload = {
    event: "sts_conversion",
    conversion_name: event.name,
    ...(event.placement ? { placement: event.placement } : {}),
    ...(event.productSlug ? { product_slug: event.productSlug } : {}),
    ...(event.leadType ? { lead_type: event.leadType } : {}),
  };

  window.dispatchEvent(new CustomEvent("sts:conversion", { detail: payload }));
  const analyticsWindow = window as AnalyticsWindow;
  if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push(payload);
  }
}
