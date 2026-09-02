/**
 * Lightweight scroll-reveal: adds `.is-visible` to any `.reveal` element once it
 * enters the viewport. No framework, no dependency — kept intentionally small
 * per the performance requirement (minimal unnecessary JavaScript).
 */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
  if (!els.length) return;

  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => observer.observe(el));
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initReveal);
} else {
  initReveal();
}
// If View Transitions are ever enabled on top of this layout, re-run on swap too.
document.addEventListener("astro:page-load", initReveal);
