const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

document.querySelectorAll(".js-carousel").forEach(track => {
  const cards = Array.from(track.children);
  const gap = parseInt(getComputedStyle(track).gap) || 0;

  cards.forEach(card => {
    track.appendChild(card.cloneNode(true));
  });

  let index = 0;
  let interval;

  function cardStep() {
    return cards[0].offsetWidth + gap;
  }

  function startScroll() {
    interval = setInterval(() => {
      index++;

      track.style.transition = "transform 0.6s ease-in-out";
      track.style.transform = `translateX(-${index * cardStep()}px)`;

      if (index >= cards.length) {
        setTimeout(() => {
          track.style.transition = "none";
          index = 0;
          track.style.transform = "translateX(0)";
        }, 600);
      }
    }, 2200);
  }

  function stopScroll() {
    clearInterval(interval);
  }

  startScroll();

  track.addEventListener("mouseenter", stopScroll);
  track.addEventListener("mouseleave", startScroll);
});
