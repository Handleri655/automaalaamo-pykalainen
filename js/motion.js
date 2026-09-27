import { animate, hover, press, inView, stagger } from "https://cdn.jsdelivr.net/npm/motion@12/+esm";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) {
  // Käyttäjä ei halua liikettä.
} else {
  const spring = { type: "spring", stiffness: 420, damping: 22 };
  const springSoft = { type: "spring", stiffness: 280, damping: 24 };
  const easeOut = [0.22, 1, 0.36, 1];

  hover(".btn", (el) => {
    animate(el, { scale: 1.06, y: -3 }, spring);
    return () => animate(el, { scale: 1, y: 0 }, spring);
  });

  press(".btn", (el) => {
    animate(el, { scale: 0.93, y: 0 }, { type: "spring", stiffness: 620, damping: 18 });
    return () => animate(el, { scale: 1.06, y: -3 }, spring);
  });

  hover(".nav a, .logo, .site-footer nav a, .contact-list a", (el) => {
    animate(el, { y: -2 }, springSoft);
    return () => animate(el, { y: 0 }, springSoft);
  });

  hover(".service-card", (el) => {
    animate(el, { y: -8, scale: 1.025 }, springSoft);
    return () => animate(el, { y: 0, scale: 1 }, springSoft);
  });

  press(".service-card", (el) => {
    animate(el, { scale: 0.98, y: -2 }, spring);
    return () => animate(el, { scale: 1.025, y: -8 }, springSoft);
  });

  hover(".review-card, .step, .trust-item", (el) => {
    animate(el, { y: -6, scale: 1.02 }, springSoft);
    return () => animate(el, { y: 0, scale: 1 }, springSoft);
  });

  hover(".menu-toggle", (el) => {
    animate(el, { scale: 1.08, rotate: 6 }, spring);
    return () => animate(el, { scale: 1, rotate: 0 }, spring);
  });

  press(".menu-toggle", (el) => {
    animate(el, { scale: 0.9, rotate: 0 }, spring);
    return () => animate(el, { scale: 1.08, rotate: 6 }, spring);
  });

  inView(
    ".service-card, .step, .review-card, .trust-item",
    (el) => {
      animate(el, { opacity: [0, 1], y: [32, 0] }, { duration: 0.55, easing: easeOut });
    },
    { margin: "-50px" }
  );

  inView(
    ".section-head, .reviews-head, .page-hero, .about, .split, .contact-card, .form-card, .hours-card, .cta-band, .map-card",
    (el) => {
      animate(el, { opacity: [0, 1], y: [22, 0] }, { duration: 0.6, easing: easeOut });
    }
  );

  const heroButtons = document.querySelectorAll(".hero-actions .btn");
  if (heroButtons.length) {
    animate(heroButtons, { opacity: [0, 1], y: [18, 0] }, { delay: stagger(0.1), duration: 0.5, easing: easeOut });
  }
}
