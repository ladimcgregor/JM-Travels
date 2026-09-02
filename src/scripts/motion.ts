import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll reveal for `.reveal` elements — replaces the plain IntersectionObserver
 * version with GSAP so easing matches the rest of the motion system. Falls back
 * to an instant, un-animated reveal when the user prefers reduced motion.
 */
function initReveal() {
  const els = gsap.utils.toArray<HTMLElement>(".reveal:not(.reveal-done)");
  if (!els.length) return;

  if (prefersReducedMotion()) {
    els.forEach((el) => {
      el.classList.add("is-visible", "reveal-done");
    });
    return;
  }

  els.forEach((el) => {
    el.classList.add("reveal-done");
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 28 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
        onStart: () => el.classList.add("is-visible"),
      }
    );
  });
}

/**
 * Editorial image treatment: image starts slightly scaled down and dims as it
 * enters, settles to full scale/opacity at center, then softly dims again as it
 * exits upward. Applied to `[data-scroll-img]` figures.
 */
function initImageScrollScale() {
  if (prefersReducedMotion()) return;
  const figures = gsap.utils.toArray<HTMLElement>("[data-scroll-img]:not([data-scroll-img-done])");

  figures.forEach((fig) => {
    fig.setAttribute("data-scroll-img-done", "true");
    const imgs = fig.querySelectorAll("img");
    if (!imgs.length) return;
    gsap.fromTo(
      imgs,
      { scale: 1.12 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: fig,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    );
  });
}

/**
 * Pin a section's left column while its right column content staggers in.
 * Used once, tastefully, on the homepage "Why JM Travels" section.
 */
function initPinnedSection() {
  if (prefersReducedMotion()) return;
  const section = document.querySelector<HTMLElement>("[data-pin-section]");
  if (!section) return;
  const pinTarget = section.querySelector<HTMLElement>("[data-pin-target]");
  const items = gsap.utils.toArray<HTMLElement>("[data-pin-item]", section);
  if (!pinTarget || !items.length) return;

  if (window.matchMedia("(min-width: 1024px)").matches) {
    ScrollTrigger.create({
      trigger: section,
      start: "top top+=96",
      end: "bottom bottom",
      pin: pinTarget,
      pinSpacing: false,
    });
  }

  gsap.fromTo(
    items,
    { autoAlpha: 0, y: 24 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        once: true,
      },
    }
  );
}

/** Infinite marquee — duplicates content once via CSS, this just starts the loop. */
function initMarquee() {
  const marquees = document.querySelectorAll<HTMLElement>("[data-marquee]:not([data-marquee-done])");
  marquees.forEach((m) => {
    m.setAttribute("data-marquee-done", "true");
    if (prefersReducedMotion()) return;
    const track = m.querySelector<HTMLElement>("[data-marquee-track]");
    if (!track) return;
    gsap.to(track, {
      xPercent: -50,
      duration: Number(m.dataset.marqueeDuration ?? 32),
      ease: "none",
      repeat: -1,
    });
  });
}

function init() {
  initReveal();
  initImageScrollScale();
  initPinnedSection();
  initMarquee();
  ScrollTrigger.refresh();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
document.addEventListener("astro:page-load", init);
