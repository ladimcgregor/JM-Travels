export interface Service {
  slug: string;
  name: string;
  image: string;
  short: string;
  description: string;
  whoFor: string;
  included: string[];
  process: string[];
  ctaLabel: string;
  ctaHref: string;
}

export const services: Service[] = [
  {
    slug: "organised-trips",
    name: "Organised Trips",
    image: "/images/photos/serengeti-migration.jpg",
    short: "Curated travel experiences that customers can simply join.",
    description:
      "Ready-to-join trips with a defined destination, itinerary and inclusions. You show up; we've already handled the planning, coordination and logistics.",
    whoFor: "Travellers who want a well-designed trip without building it from scratch.",
    included: ["Defined itinerary", "Accommodation coordination", "Key activities and transfers", "WhatsApp support throughout"],
    process: ["Browse available trips", "Confirm your spot", "Receive your itinerary and prep guide", "Travel"],
    ctaLabel: "Explore Trips",
    ctaHref: "/trips",
  },
  {
    slug: "bespoke-trips",
    name: "Bespoke Trips",
    image: "/images/photos/luxury-resort-aerial.jpg",
    short: "Personalised journeys designed around your preferences.",
    description:
      "Trips built entirely around your destination, dates, budget and interests, not a template. We ask the right questions up front so the itinerary actually fits how you like to travel.",
    whoFor: "Anyone who doesn't want a fixed package and would rather have the trip designed around them.",
    included: ["A structured planning consultation", "A custom itinerary", "Accommodation, transfer and activity coordination", "Ongoing support before and during travel"],
    process: ["Tell us what you're planning", "We design the journey", "You review and confirm", "We coordinate the details", "You travel"],
    ctaLabel: "Create My Trip",
    ctaHref: "/bespoke-travel",
  },
  {
    slug: "solo-travel",
    name: "Solo Travel",
    image: "/images/photos/bali-rice-terrace.jpg",
    short: "Trips designed for individual travellers.",
    description:
      "Whether you want full independence with a safety net or a more guided experience, solo trips are planned with your comfort, pace and interests in mind.",
    whoFor: "Solo travellers who want confidence and support without losing independence.",
    included: ["Destination and safety guidance", "Flexible pacing", "Accommodation suited to solo travel", "Direct WhatsApp support while travelling"],
    process: ["Consultation", "Itinerary design", "Confirmation", "Travel"],
    ctaLabel: "Plan My Trip",
    ctaHref: "/bespoke-travel",
  },
  {
    slug: "couple-travel",
    name: "Couple Travel",
    image: "/images/photos/santorini-oia-sunset.jpg",
    short: "Romantic and leisure experiences.",
    description:
      "Honeymoons, anniversaries and leisure trips designed around the pace and experiences that matter to you both.",
    whoFor: "Couples planning a romantic, leisure or celebratory trip.",
    included: ["Destination selection support", "Romantic-trip itinerary design", "Accommodation coordination", "Special-occasion touches on request"],
    process: ["Consultation", "Itinerary design", "Confirmation", "Travel"],
    ctaLabel: "Plan My Trip",
    ctaHref: "/bespoke-travel",
  },
  {
    slug: "group-travel",
    name: "Group Travel",
    image: "/images/photos/cape-town-bo-kaap-2.jpg",
    short: "Friends, families and organised groups.",
    description:
      "Group trips create their own coordination headaches: different schedules, budgets and preferences. We centralise the planning so one person isn't stuck chasing everyone else.",
    whoFor: "Friend groups, families, professional communities and other groups travelling together.",
    included: ["Group itinerary design", "Centralised coordination and communication", "Group-rate accommodation where available", "A single point of contact for the whole group"],
    process: ["Group brief", "Itinerary design", "Group confirmation", "Travel"],
    ctaLabel: "Plan a Group Trip",
    ctaHref: "/bespoke-travel",
  },
  {
    slug: "visa-assistance",
    name: "Visa Assistance",
    image: "/images/photos/middle-east-architecture.jpg",
    short: "Structured support for visa preparation.",
    description:
      "Guidance and support through the visa preparation process: requirement checks, document checklists and appointment preparation.",
    whoFor: "Anyone who wants structured support navigating a visa application.",
    included: ["Requirement guidance", "Document checklist", "Application preparation support", "Appointment guidance"],
    process: ["Tell us your destination and travel dates", "We confirm your requirement", "We help you prepare your documents", "You attend your appointment"],
    ctaLabel: "Get Visa Support",
    ctaHref: "/visa-assistance",
  },
  {
    slug: "travel-consultations",
    name: "Travel Consultations",
    image: "/images/photos/lagos-street-2.jpg",
    short: "Professional guidance before booking.",
    description:
      "Expert guidance before you book or travel: destination selection, itinerary sense-checks, or simply a second opinion on your plan.",
    whoFor: "Travellers who want clarity before committing to a destination, itinerary or booking.",
    included: ["A structured consultation call or chat", "Destination and timing guidance", "Itinerary review", "Practical next steps"],
    process: ["Request a consultation", "We discuss your plans", "You leave with a clear recommendation"],
    ctaLabel: "Book a Consultation",
    ctaHref: "/consultations",
  },
  {
    slug: "accommodation-flights",
    name: "Accommodation & Flights",
    image: "/images/photos/maldives-overwater.jpg",
    short: "Travel component coordination.",
    description: "Hotel research, selection and flight coordination so you're not left comparing dozens of tabs and options alone.",
    whoFor: "Anyone who wants the accommodation and flight legwork handled for them.",
    included: ["Hotel research and shortlisting", "Flight research and booking coordination", "Confirmation management"],
    process: ["Share your requirements", "We shortlist options", "You confirm", "We coordinate booking"],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
  },
  {
    slug: "transfers-activities",
    name: "Transfers & Activities",
    image: "/images/photos/victoria-falls.jpg",
    short: "Ground transportation and experiences.",
    description: "Airport transfers, local transport and curated tours and activities coordinated as part of your trip.",
    whoFor: "Travellers who want reliable ground logistics and well-chosen activities.",
    included: ["Airport and local transfers", "Tours and activity bookings", "Escalation support if plans change"],
    process: ["Share your itinerary", "We arrange transfers and activities", "You receive confirmations"],
    ctaLabel: "Get Started",
    ctaHref: "/contact",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
