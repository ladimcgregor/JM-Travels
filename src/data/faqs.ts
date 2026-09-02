export interface Faq {
  question: string;
  answer: string;
  category?: string;
}

export const faqs: Faq[] = [
  {
    category: "General",
    question: "Is JM Travels a travel agency?",
    answer:
      "JM Travels is a travel planning and coordination partner. We help you figure out the destination, itinerary, accommodation, transport and documentation for your trip, whether you join one of our organised trips or ask us to build something bespoke.",
  },
  {
    category: "General",
    question: "Is JM Travels new?",
    answer:
      "JM Travels is personally led by Jemima, our Lead Traveller, who has spent years travelling widely and planning trips for family and friends long before turning it into a service. Every itinerary draws on that same hands-on experience, not a call-centre script, and we're building the track record to match, one trip at a time.",
  },
  {
    category: "Organised Trips",
    question: "How do organised trips work?",
    answer:
      "Organised trips are pre-designed itineraries with set dates, inclusions and pricing that you can simply join. Browse available trips, confirm your spot, and we take care of the coordination.",
  },
  {
    category: "Bespoke Travel",
    question: "What's the difference between an organised trip and a bespoke trip?",
    answer:
      "An organised trip is a ready-made itinerary you join. A bespoke trip is designed from scratch around your destination, dates, budget and preferences: nothing is fixed until it fits what you want.",
  },
  {
    category: "Bespoke Travel",
    question: "How long does it take to plan a bespoke trip?",
    answer:
      "It depends on the destination and complexity, but a good rule of thumb is to start the conversation at least 6-8 weeks before you'd like to travel, especially if visa processing is involved. Shorter timelines are sometimes possible, so just ask us.",
  },
  {
    category: "Visa",
    question: "Can JM Travels guarantee my visa will be approved?",
    answer:
      "No. JM Travels does not issue visas and cannot guarantee approval. We help with requirement guidance, document checklists and application preparation, but the final decision always rests solely with the relevant embassy, consulate or immigration authority.",
  },
  {
    category: "Visa",
    question: "Do I need a visa for the destination I'm considering?",
    answer:
      "It depends on your nationality and destination. Tell us where you're planning to go and we'll help you confirm your specific requirement.",
  },
  {
    category: "Payments",
    question: "How does payment work?",
    answer:
      "Payment details are confirmed as part of your proposal once your itinerary is finalised. We'll always be clear about what's included, what isn't, and when payments are due before you commit.",
  },
  {
    category: "Group Travel",
    question: "Can JM Travels plan a trip for a group?",
    answer:
      "Yes, group trips for friends, families and professional communities are one of our core services. We coordinate the whole group through a single point of contact so no one person is left chasing everyone else.",
  },
  {
    category: "General",
    question: "I'm a first-time international traveller. Can you help with the basics?",
    answer:
      "Absolutely. A large part of what we do is exactly this: helping first-time travellers navigate destination selection, visa requirements, flights, accommodation and itinerary planning with confidence.",
  },
  {
    category: "General",
    question: "How do I get in touch?",
    answer:
      "WhatsApp is the fastest way to reach us, but you can also use the contact form or email us directly. See the Contact page for all the details.",
  },
];
