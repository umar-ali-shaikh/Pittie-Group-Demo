 const menuBtn = document.querySelector(".main-header-manu");
  const nav = document.querySelector(".main-nav");

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Optional: close menu on link click (mobile UX)
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
    });
  });



if (window.innerWidth >= 992) {
  gsap.registerPlugin(ScrollTrigger);

  /* =========================
     LENIS SETUP
  ========================= */
  const lenis = new Lenis({
    duration: 1,
    easing: (t) => 1 - Math.pow(1 - t, 6),
    smoothWheel: true,
    smoothTouch: false,
    lerp: 0.05,
    wheelMultiplier: 0.8
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  gsap.ticker.lagSmoothing(0);

  /* =========================
     SMOOTH SECTION (FULL SNAP)
  ========================= */
  document.querySelectorAll(".smooth-section").forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",

      onEnter: () => {
        lenis.scrollTo(section);
      },

      onLeave: () => {
        lenis.scrollTo(section.nextElementSibling);
      },

      onEnterBack: () => {
        lenis.scrollTo(section);
      }
    });
  });

  /* =========================
     CONTENT SECTION (FREE SCROLL)
  ========================= */
  document.querySelectorAll(".content-section").forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom"
      // ❌ no snapping here
    });
  });

  /* =========================
     RESIZE SAFE
  ========================= */
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
}



const indicatorItems = document.querySelectorAll(".scroll-indicator a");
const sections = document.querySelectorAll("section[id]");

/* ======================
   CLICK → ACTIVE
====================== */
indicatorItems.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    // remove active
    indicatorItems.forEach(i => 
      i.querySelector("span")?.classList.remove("active")
    );

    // add active
    link.querySelector("span")?.classList.add("active");

    // smooth scroll
    targetSection.scrollIntoView({
      behavior: "smooth"
    });
  });
});


/* ======================
   SCROLL → ACTIVE
====================== */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        indicatorItems.forEach(item => {
          const link = item.querySelector("a").getAttribute("href");

          item.classList.toggle("active", link === `#${id}`);
        });
      }
    });
  },
  {
    threshold: 0.6   // section 60% visible
  }
);

sections.forEach(section => observer.observe(section));




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
    spaceBetween: 0,
    watchSlidesProgress: true,
    loop: true,
    speed: 600,

    /* 🔥 TOUCH ENABLE */
    allowTouchMove: true,
    touchRatio: 1,
    resistanceRatio: 0.65,

    breakpoints: {
      0: {
        slidesPerView: 4,
        allowTouchMove: true
      },
      768: {
        slidesPerView: 6,
        allowTouchMove: true
      }
    }
  });

  const mainSlider = new Swiper(".brandShowcaseMain", {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 900,

    loop: true,
    loopedSlides: 6,

    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },

    /* 🔥 TOUCH ENABLE */
    allowTouchMove: true,
    grabCursor: true,
    touchRatio: 1,
    resistanceRatio: 0.85,

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

