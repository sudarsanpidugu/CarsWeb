const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const track = document.getElementById("carousel");
const cards = Array.from(track.children);
const gap = 24;

// Clone cards for infinite loop
cards.forEach(card => {
  const clone = card.cloneNode(true);
  track.appendChild(clone);
});

let index = 0;
let interval;

function cardWidth() {
  return cards[0].offsetWidth + gap;
}

function startCarousel() {
  interval = setInterval(() => {
    index++;
    track.style.transition = "transform 0.6s ease-in-out";
    track.style.transform = `translateX(-${index * cardWidth()}px)`;

    // RESET POSITION SEAMLESSLY
    if (index >= cards.length) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = "translateX(0)";
      }, 600);
    }
  }, 2500);
}

function stopCarousel() {
  clearInterval(interval);
}

startCarousel();

// Pause on hover
track.addEventListener("mouseenter", stopCarousel);
track.addEventListener("mouseleave", startCarousel);