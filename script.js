


























const swiper = new Swiper(".heroSwiper", {
  effect: "slide",     // 🔥 REAL SLIDE
  speed: 1200,
  loop: true,
  rtl: true,           // 👉 Right → Left slide

  autoplay: {
    delay: 4500,
    disableOnInteraction: false
  },

  navigation: {
    nextEl: ".swiper-button-nexts",
    prevEl: ".swiper-button-prevs"
  }
});


const dots = document.querySelectorAll(".hero-slider-dots span");
const count = document.getElementById("count");
const playIcon = document.querySelector(".fa-play");
const pauseIcon = document.querySelector(".fa-pause");

function updatePagination(index) {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
  count.innerText = `${index + 1} / ${dots.length}`;
}

swiper.on("slideChange", () => {
  updatePagination(swiper.realIndex);
});

/* Dot click */
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    swiper.slideToLoop(index); // 🔥 IMPORTANT when loop = true
  });
});


pauseIcon.addEventListener("click", () => {
  swiper.autoplay.stop();
  pauseIcon.classList.remove("active");
  playIcon.classList.add("active");
});

playIcon.addEventListener("click", () => {
  swiper.autoplay.start();
  playIcon.classList.remove("active");
  pauseIcon.classList.add("active");
});

/* Init */
updatePagination(swiper.realIndex);









document.addEventListener("DOMContentLoaded", () => {

  const thumbSlider = new Swiper(".brandShowcaseThumbs", {
    slidesPerView: 6,
    spaceBetween: 12,
    watchSlidesProgress: true,
    loop: true,              // 🔥 MUST
    speed: 600
  });


  const mainSlider = new Swiper(".brandShowcaseMain", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 900,

    loop: true,              // 🔥 MUST
    loopedSlides: 6,         // 🔥 VERY IMPORTANT (>= thumb count)

    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },

    thumbs: {
      swiper: thumbSlider
    }
  });



  /* SAFE ARROW CONTROLS */
  const nextBtn = document.querySelector(".showcase-next");
  const prevBtn = document.querySelector(".showcase-prev");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      mainSlider.slideNext();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      mainSlider.slidePrev();
    });
  }



});
