---
name: JM Travels
description: A premium, editorial travel-planning brand that feels like a well-travelled friend, not a corporate agency
colors:
  navy: "#102A43"
  navy-dark: "#081C2C"
  warm-white: "#FCFAF6"
  sand: "#F4EFE6"
  gold: "#B8955A"
  gold-light: "#D8C29A"
  charcoal: "#263238"
  slate: "#52606D"
  mist: "#E8E2D8"
  white: "#FFFFFF"
  success: "#2F6B4F"
  error: "#B94A48"
  info: "#356A8A"
  warning: "#A9752B"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(2.625rem, 6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Bricolage Grotesque Variable, system-ui, sans-serif"
    fontSize: "clamp(2.125rem, 3.4vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Onest Variable, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    letterSpacing: "0.14em"
rounded:
  sm: "8px"
  md: "12px"
  full: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "16px"
  4: "24px"
  5: "32px"
  6: "48px"
  7: "64px"
  8: "96px"
  9: "128px"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.navy-dark}"
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy-dark}"
    rounded: "{rounded.sm}"
    padding: "14px 24px"
  button-gold-hover:
    backgroundColor: "{colors.gold-light}"
  card-surface:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
---

# Design System: JM Travels

## 1. Overview

**Creative North Star: "The Well-Travelled Friend"**

JM Travels is not a corporate travel agency and doesn't want to look like one. The reference point is a friend
who has actually been places, has genuinely good taste, and happens to be excellent at logistics: warm rather
than glossy, editorial rather than templated, current rather than dated. Jemima, the Lead Traveller, is a real
person the copy and imagery should feel spoken by, not a faceless "Founder" bio paragraph.

This system explicitly rejects: generic travel-agency templates, crowded package cards dominated by prices and
badges, bright tropical colour clichés, heavy gradients or glassmorphism, gimmicky animation, and the visible
tells of AI-generated design (decorative em dashes, the "—— LABEL" eyebrow-dash motif, gradient text, hero-metric
cards, identical icon-grid cards). Alive and current does not mean loud: energy comes from motion, photography,
and voice, not from saturation or clutter.

**Key Characteristics:**
- Warm navy-and-sand editorial canvas with gold used sparingly, never as a dominant fill
- A characterful display grotesque (Bricolage Grotesque) for headlines, a clean sans (Onest) for everything functional
- Photography-led: every major section carries real imagery, never a bare text block
- Every touchable surface (card, circle, image, button) responds to the cursor with a soft scale-up
- Restrained motion: reveals and scroll-scrubbed image treatment, never bounce or elastic

## 2. Colors

The palette is deliberately narrow: a deep navy for authority, a warm off-white/sand canvas for premium calm,
and gold used only as an accent, never a fill.

### Primary
- **JM Navy** (#102A43): headers, primary buttons, dark section backgrounds, primary text on light surfaces.
- **Deep Navy** (#081C2C): hero/CTA overlays, the darkest anchor surface, primary-button hover state.

### Secondary
- **Muted Gold** (#B8955A): the one accent color. Eyebrow labels, rules, hover states, icons, the gold CTA variant. Never a background fill larger than a button.
- **Light Gold** (#D8C29A): gold-on-dark hover state, soft accent borders.

### Neutral
- **Warm White** (#FCFAF6): primary page background.
- **Soft Sand** (#F4EFE6): secondary/alternating section background.
- **Charcoal** (#263238): primary body text.
- **Slate** (#52606D): secondary text, metadata, captions.
- **Mist** (#E8E2D8): borders, dividers, field borders.
- **White** (#FFFFFF): text on dark/navy surfaces, card surfaces.

### Named Rules
**The One Accent Rule.** Gold never fills more than a button or a thin rule. If gold is covering more than a small fraction of the viewport, it has become a fill color and needs to be replaced with navy, sand, or photography.

## 3. Typography

**Display Font:** Bricolage Grotesque, variable weight (with system-ui fallback)
**Body Font:** Onest, variable weight (with system-ui fallback)

**Character:** A display grotesque with real personality (angled joints, a bit of movement in the letterforms)
paired with a clean, current sans for everything functional. Chosen specifically to avoid the reflex editorial-serif
pairing: this is a brand that should feel current and a little alive, not like a museum caption. Two fonts, never
more; the display face never carries dense information and the body face never carries a hero headline.

### Hierarchy
- **Display** (700, clamp(42px, 6vw, 68px), 1.02, -0.02em tracking): hero and campaign headlines only.
- **H1** (700, clamp(34px, 3.4vw, 44px), 1.1, -0.015em tracking): page titles.
- **H2** (700, clamp(28px, 2.2vw, 32px), 1.16): major section headings.
- **H3/H4** (600 to 700, 18 to 24px): subsections, card titles.
- **Body** (400, 16px, 1.6; body-large 17 to 18px): standard copy, capped at 65 to 75ch.
- **Label** (700, 12px, 0.14em tracking, uppercase): eyebrows, metadata, badges.

### Named Rules
**The No-Dash Rule.** Eyebrow labels are a colored word or short phrase alone (`SERVICES`, `MEET THE LEAD TRAVELLER`), never prefixed with a decorative rule character (`——`, `--`, em dash). A leading dash before a label is a template tell; drop it and let the gold color and letter-spacing carry the label instead.

## 4. Elevation

The system is mostly flat, editorial, and architectural rather than app-like. Depth comes from generous
whitespace, full-bleed photography, and one soft ambient shadow reserved for cards sitting on a busier
background, not from layered drop shadows.

### Shadow Vocabulary
- **shadow-soft** (`0 1px 2px rgba(16,42,67,0.04), 0 12px 32px -16px rgba(16,42,67,0.12)`): the only shadow in the system. Used on cards, form panels, and floating buttons to lift them softly off the canvas.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. `shadow-soft` is the single exception, applied consistently rather than invented per-component.

## 5. Components

### Buttons
- **Shape:** 8px radius, 14px vertical / 24px horizontal padding, 14px bold label text.
- **Primary:** navy fill, white text; hover deepens to Deep Navy (#081C2C).
- **Gold:** gold fill, deep-navy text; hover lightens to Light Gold (#D8C29A). Reserved for the single strongest CTA on a dark section.
- **Secondary:** transparent fill, navy border and text; hover fills navy with white text.
- **WhatsApp:** #25D366 fill, dark-green text; the one deliberate brand-color exception, used only for WhatsApp CTAs.

### Cards / Containers
- **Corner Style:** 12px radius (`rounded-md`).
- **Background:** white on sand/navy sections, sand-tinted on white sections.
- **Shadow Strategy:** `shadow-soft` only.
- **Border:** 1px Mist, used sparingly, never as a colored side-stripe accent.

### Inputs / Fields
- **Style:** warm-white background, 1px Mist border, 8px radius, 16px type.
- **Focus:** border shifts to gold plus a soft gold glow ring (`box-shadow: 0 0 0 3px rgba(184,149,90,0.18)`).
- **Error:** error-red border plus adjacent text, never color alone.

### Navigation
Logo left, links centered/right, primary CTA far right. Transparent over a hero image until scroll, then solid
warm-white with a mist border. Sticky. Mobile collapses to a full-panel menu with the same navy-on-white type,
never white-on-white.

### The Cursor-Reactive Surface (signature interaction)
Every card, circular photo, and standalone image in the system scales up subtly (roughly 1.03–1.08x) as the
cursor moves over it, on a fast, exponential ease-out with no bounce. This is the primary way the brand feels
"alive" without adding visual noise: no color changes, no new elements, just a soft, immediate physical response
to attention. Applies to: bento/service cards, trip and destination cards, circular step/process photos, the
founder/Lead Traveller portrait, and the referral avatar cluster.

## 6. Do's and Don'ts

### Do:
- **Do** keep gold to a single accent role: eyebrows, one CTA variant, rules, hover states.
- **Do** give every card, circle, and standalone image a subtle cursor-reactive scale-up (`transform: scale(1.04)` range) on hover, eased with `ease-out-quart` or similar, never elastic or bouncy.
- **Do** write eyebrow labels as a plain gold word or short phrase, letter-spaced and uppercase, with no leading dash or rule character.
- **Do** refer to Jemima as "the Lead Traveller," never "the Founder," across copy, headings, and page titles.
- **Do** lead every major section with real photography or a photographic collage; a bare text block is a failure state, not a placeholder.

### Don't:
- **Don't** use a decorative em dash or "——" rule character before eyebrow labels (`—— SERVICES`, `—— MEET THE FOUNDER`). This is a visible AI-template tell.
- **Don't** use gradient text, glassmorphism, or side-stripe colored borders anywhere in the system.
- **Don't** build identical icon+heading+text card grids; vary size and treatment (bento, image-led, collage) the way the homepage "What We Do" section already does.
- **Don't** let motion bounce, overshoot, or use elastic easing; exponential ease-out only.
- **Don't** call Jemima "the Founder" in visible copy; "Lead Traveller" (or an equally specific, human alternative) carries the same credibility without the corporate register.
