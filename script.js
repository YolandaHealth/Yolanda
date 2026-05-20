const cards = document.querySelectorAll(".bg-card");
const revealItems = document.querySelectorAll(".reveal");

document.body.classList.add("is-loaded");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

const setScrollMotion = () => {
  const scrollY = window.scrollY;
  document.documentElement.style.setProperty("--hero-y", `${scrollY * 0.12}px`);
  document.documentElement.style.setProperty("--band-y", `${scrollY * -0.04}px`);
};

setScrollMotion();
window.addEventListener("scroll", setScrollMotion, { passive: true });

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    document.body.dataset.activeBg = card.dataset.target;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
