const maskedText = document.querySelectorAll(".mask-reveal");

maskedText.forEach((el) => {
  // wrap inner text inside span
  const content = el.textContent;
  el.innerHTML = `<span>${content}</span>`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // stop after reveal
      }
    });
  },
  {
    threshold: 0.2,
  }
);

maskedText.forEach((el) => observer.observe(el));
