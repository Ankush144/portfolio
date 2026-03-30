const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const revealItems = document.querySelectorAll(".reveal");
const cursorGlow = document.getElementById("cursorGlow");
const year = document.getElementById("year");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }
    if (!navMenu.contains(target) && !menuToggle.contains(target)) {
      navMenu.classList.remove("open");
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => {
  if (prefersReducedMotion) {
    item.classList.add("active");
    return;
  }
  observer.observe(item);
});

if (!isTouchDevice && !prefersReducedMotion) {
  window.addEventListener("mousemove", (event) => {
    if (!cursorGlow) {
      return;
    }
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
} else if (cursorGlow) {
  cursorGlow.style.display = "none";
}
