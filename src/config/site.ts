/**
 * JM Travels — central site configuration.
 *
 * This is the single source of truth for business identity, contact details and
 * social links. Everything marked "REPLACE" below is a placeholder — the site will
 * run and look correct with these values, but they are not real and must be updated
 * before launch. Nothing else in the codebase should hardcode these values; import
 * from here instead so a future update only has to happen in one place.
 */

export const site = {
  name: "JM Travels",
  legalName: "JM Travels", // REPLACE: registered business name if different
  tagline: "Travel better. We'll plan the details.",
  description:
    "JM Travels takes care of the planning, coordination and details behind your journey: from curated trips you can simply join to bespoke experiences designed around you.",

  founder: {
    name: "Jemima",
    title: "Lead Traveller, JM Travels",
    photo: "/images/founder/founder-portrait.jpg", // REPLACE: add a real photo of Jemima at this path
  },

  contact: {
    whatsappNumber: "2340000000000", // REPLACE: international format, digits only, no leading +
    whatsappDisplay: "+234 000 000 0000", // REPLACE: human-readable version for display
    phoneDisplay: "+234 000 000 0000", // REPLACE
    email: "hello@jmtravels.com", // REPLACE
    location: "Lagos, Nigeria", // REPLACE if different / add serviced markets
  },

  social: {
    instagram: "https://instagram.com/jmtravels", // REPLACE
    tiktok: "https://tiktok.com/@jmtravels", // REPLACE
    instagramHandle: "@jmtravels",
    tiktokHandle: "@jmtravels",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Trips", href: "/trips" },
    { label: "Destinations", href: "/destinations" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ],

  primaryCta: { label: "Plan My Trip", href: "/bespoke-travel" },

  footerLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],

  /**
   * Third-party service keys read from environment variables at build time.
   * See .env.example for setup instructions. Left undefined in development
   * so forms/analytics degrade gracefully instead of crashing.
   */
  integrations: {
    web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined,
    gaMeasurementId: import.meta.env.PUBLIC_GA_MEASUREMENT_ID as string | undefined,
  },
};

/** Builds a wa.me deep link with an optional pre-filled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.contact.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappMessages = {
  general: "Hi JM Travels, I'm interested in planning a trip and would like some assistance.",
  bespoke: "Hi JM Travels, I'd like to build a bespoke trip. Here's what I'm thinking:",
  visa: "Hi JM Travels, I'd like to enquire about visa assistance.",
  consultation: "Hi JM Travels, I'd like to book a travel consultation.",
  trip: (tripName: string) => `Hi JM Travels, I'm interested in the "${tripName}" trip.`,
};
