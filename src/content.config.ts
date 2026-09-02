import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const trips = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/trips" }),
  schema: z.object({
    title: z.string(),
    destination: z.string(),
    region: z.enum(["Africa", "Middle East", "Europe", "Asia", "Americas", "Indian Ocean"]),
    tripType: z.array(z.enum(["Solo", "Couples", "Groups", "Leisure", "Adventure", "Honeymoon"])),
    duration: z.string(), // e.g. "5 days / 4 nights"
    startingPrice: z.string().optional(), // e.g. "From ₦1,450,000 per person" — leave unset to hide pricing
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    included: z.array(z.string()).default([]),
    excluded: z.array(z.string()).default([]),
    itinerary: z
      .array(z.object({ day: z.string(), title: z.string(), description: z.string() }))
      .default([]),
    accommodation: z.string().optional(),
    visaNotes: z.string().optional(),
    featured: z.boolean().default(false),
    status: z.enum(["open", "limited", "closed"]).default("open"),
    relatedDestinationSlug: z.string().optional(),
    order: z.number().default(0),
  }),
});

const destinations = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/destinations" }),
  schema: z.object({
    country: z.string(),
    city: z.string().optional(),
    region: z.enum(["Africa", "Middle East", "Europe", "Asia", "Americas", "Indian Ocean"]),
    heroImage: z.string(),
    overview: z.string(),
    whyVisit: z.array(z.string()).default([]),
    bestTimeToGo: z.string().optional(),
    suggestedDuration: z.string().optional(),
    thingsToDo: z.array(z.string()).default([]),
    visaInformation: z.string().optional(),
    travelTips: z.array(z.string()).default([]),
    founderVisited: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    customerName: z.string(),
    destination: z.string(),
    tripType: z.string(),
    date: z.coerce.date().optional(),
    quote: z.string(),
    photo: z.string().optional(),
    videoUrl: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    category: z.enum([
      "Destination Guides",
      "Travel Tips",
      "Visa Guides",
      "Itinerary Ideas",
      "Founder Stories",
      "Trip Recaps",
      "Travel Planning",
    ]),
    author: z.string().default("JM Travels"),
    date: z.coerce.date(),
    heroImage: z.string(),
    excerpt: z.string(),
    relatedDestinationSlug: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { trips, destinations, testimonials, journal };
