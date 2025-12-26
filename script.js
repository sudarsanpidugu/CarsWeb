/* ============================
   NAVBAR SCROLL
============================ */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/* ============================
   AUTO CAROUSEL (SMART)
============================ */
document.querySelectorAll(".js-carousel").forEach(track => {
  const originalCards = Array.from(track.children);
  const gap = parseInt(getComputedStyle(track).gap) || 0;

  let index = 0;
  let interval;

  /* STEP WIDTH */
  function cardStep() {
    return originalCards[0].offsetWidth + gap;
  }

  /* CHECK IF SCROLL IS NEEDED */
  function canScroll() {
    return track.scrollWidth > track.parentElement.offsetWidth;
  }

  /* CLONE ONLY ONCE */
  if (!track.dataset.cloned && canScroll()) {
    originalCards.forEach(card => {
      track.appendChild(card.cloneNode(true));
    });
    track.dataset.cloned = "true";
  }

  function startScroll() {
    if (!canScroll()) return;

    interval = setInterval(() => {
      index++;
      track.style.transition = "transform 0.6s ease";
      track.style.transform = `translateX(-${index * cardStep()}px)`;

      if (index >= originalCards.length) {
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

  /* START ONLY IF NEEDED */
  if (canScroll()) startScroll();

  /* PAUSE ON HOVER */
  track.addEventListener("mouseenter", stopScroll);
  track.addEventListener("mouseleave", startScroll);

  /* PAUSE ON ARROW HOVER (OPTIONAL) */
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("mouseenter", stopScroll);
    btn.addEventListener("mouseleave", startScroll);
  });

  /* RECHECK ON RESIZE */
  window.addEventListener("resize", () => {
    stopScroll();
    index = 0;
    track.style.transform = "translateX(0)";
    if (canScroll()) startScroll();
  });
});


/* ============================
   MOBILE MENU TOGGLE
============================ */
const toggle = document.getElementById("menuToggle");
const menu = document.getElementById("mainMenu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}


document.querySelectorAll(".carousel-wrapper").forEach(wrapper => {
  const track = wrapper.querySelector(".scroll-row");
  const leftBtn = wrapper.querySelector(".nav-btn.left");
  const rightBtn = wrapper.querySelector(".nav-btn.right");

  function updateArrows() {
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (track.scrollWidth <= track.clientWidth) {
      leftBtn.style.display = "none";
      rightBtn.style.display = "none";
      return;
    }

    if (track.scrollLeft <= 5) {
      leftBtn.style.display = "none";
      rightBtn.style.display = "grid";
    } else if (track.scrollLeft >= maxScroll - 5) {
      leftBtn.style.display = "grid";
      rightBtn.style.display = "none";
    } else {
      leftBtn.style.display = "grid";
      rightBtn.style.display = "grid";
    }
  }

  const step = () => track.clientWidth / 3;

  rightBtn.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });

  leftBtn.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });

  track.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);

  updateArrows();
});




// -----------otp-------------
// OPEN OTP MODAL
function openOtp() {
  const modal = document.querySelector('.otp-overlay');
  modal.classList.add('show');

  // focus first OTP box
  const firstInput = modal.querySelector('.otp-inputs input');
  if (firstInput) firstInput.focus();
}

// CLOSE OTP WHEN CLICKING OUTSIDE
document.querySelector('.otp-overlay').addEventListener('click', function (e) {
  if (e.target === this) {
    this.classList.remove('show');
  }
});

// OTP AUTO MOVE + BACKSPACE
const otpInputs = document.querySelectorAll('.otp-inputs input');

otpInputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (input.value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
});

// ESC KEY CLOSE
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelector('.otp-overlay').classList.remove('show');
  }
});
