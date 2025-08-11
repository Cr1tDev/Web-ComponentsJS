"use strict";
console.log("correction");

// Revela section on scroll effect using intersection observer API
const allsectoins = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allsectoins.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
