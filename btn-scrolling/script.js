const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");

btnScrollTo.addEventListener("click", function (e) {
  const sec1Coords = section1.getBoundingClientRect();
  console.log(sec1Coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  // console.log(
  //   "heigh/widht viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(sec1Coords.left, sec1Coords.top + window.pageYOffset);

  // Smooth Scorlling
  // window.scrollTo({
  //   left: sec1Coords.left,
  //   top: sec1Coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // Modern way to set scrolling
  section1.scrollIntoView({ behavior: "smooth" });
});
