/* =========================
   PITTIE CAROUSEL (RESPONSIVE + CLEANUP)
========================= */
// runIfSectionExists(".pittie-carousel", () => {

//     let cleanup;

//     function init() {
//         cleanup?.();
//         cleanup = isMobile()
//             ? initMobileCarousel()
//             : initPittieDesktopCarousel();
//     }

//     init();

//     window.addEventListener("resize", () => {
//         clearTimeout(window.__carouselResize);
//         window.__carouselResize = setTimeout(init, 300);
//     });
// });

// function initPittieDesktopCarousel() {

//     const carousel = document.querySelector(".pittie-carousel");
//     const nextBtn = document.getElementById("pittie-next");
//     const prevBtn = document.getElementById("pittie-prev");
//     if (!carousel || !nextBtn || !prevBtn) return () => { };

//     const slider = carousel.querySelector(".pittie-list");
//     const thumbs = carousel.querySelector(".pittie-thumbnail");

//     let autoNextTimer;
//     const TIME_AUTO = 15000;
//     const TIME_ANIM = window.innerWidth < 768 ? 1200 : 12000;

//     function resetAutoNext() {
//         clearTimeout(autoNextTimer);
//         autoNextTimer = setTimeout(() => nextBtn.click(), TIME_AUTO);
//     }

//     function rotate(type) {
//         const slides = [...slider.children];
//         const thumbsItems = [...thumbs.children];

//         carousel.classList.add(type);

//         if (type === "next") {
//             slider.append(slides[0]);
//             thumbs.append(thumbsItems[0]);
//         } else {
//             slider.prepend(slides.at(-1));
//             thumbs.prepend(thumbsItems.at(-1));
//         }

//         setTimeout(() => {
//             carousel.classList.remove(type);
//             nextBtn.style.pointerEvents =
//                 prevBtn.style.pointerEvents = "auto";
//         }, TIME_ANIM);

//         resetAutoNext();
//     }

//     nextBtn.onclick = () => {
//         nextBtn.style.pointerEvents = prevBtn.style.pointerEvents = "none";
//         rotate("next");
//     };

//     prevBtn.onclick = () => {
//         nextBtn.style.pointerEvents = prevBtn.style.pointerEvents = "none";
//         rotate("prev");
//     };

//     resetAutoNext();

//     return () => {
//         clearTimeout(autoNextTimer);
//         nextBtn.onclick = null;
//         prevBtn.onclick = null;
//     };
// }


// /* =========================
//    HELPERS (REQUIRED)
// ========================= */
// function runIfSectionExists(selector, callback) {
//     if (document.querySelector(selector)) {
//         callback();
//     }
// }

// function isMobile() {
//     return window.innerWidth <= 768;
// }



gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".quote-box p").forEach(p => {
  // 🔥 Clean text
  const cleanText = p.textContent
    .replace(/\s+/g, " ")
    .trim();

  p.innerHTML = [...cleanText]
    .map(char =>
      char === " "
        ? `<span class="space">&nbsp;</span>`
        : `<span class="char">${char}</span>`
    )
    .join("");
});

/* 🔥 SMOOTH SCROLL ANIMATION */
gsap.fromTo(
  ".quote-box .char",
  {
    color: "#aaa",                 // start soft gray
    willChange: "color"             // GPU hint
  },
  {
    color: "#000",
    stagger: {
      each: 0.04,                  // smoother stagger
      from: "start"
    },
    ease: "power2.out",             // smooth easing
    scrollTrigger: {
      trigger: ".quote-box",
      start: "top 85%",
      end: "bottom 45%",
      scrub: 0.8,                   // 🔥 MAIN SMOOTHNESS
      anticipatePin: 1
    }
  }
);



document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".cat-card");
  const showcases = document.querySelectorAll(".feature-showcase-item");

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      // remove active from all cards
      cards.forEach(c => c.classList.remove("active-cat"));

      // remove active from all showcase items
      showcases.forEach(s => s.classList.remove("active"));

      // add active to clicked card
      card.classList.add("active-cat");

      // add active to matching showcase
      if (showcases[index]) {
        showcases[index].classList.add("active");
      }
    });
  });
});




const panels = document.querySelectorAll(".pittie-panel");

panels.forEach(panel => {
  panel.addEventListener("click", () => {
    panels.forEach(p => p.classList.remove("active"));
    panel.classList.add("active");
  });
});



gsap.registerPlugin(ScrollTrigger);

gsap.from(".joinus-text h2, .joinus-text p, .joinus-cta", {
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".joinus-section",
    start: "top 75%"
  }
});

gsap.from(".joinus-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".joinus-grid",
    start: "top 80%"
  }
});

const joinCards = document.querySelectorAll(".joinus-card");

joinCards.forEach(card => {
  card.addEventListener("click", () => {
    // remove active from all
    joinCards.forEach(c => c.classList.remove("active"));

    // add active to clicked one
    card.classList.add("active");
  });
});


// const popup = document.getElementById("videoPopup");
// const openBtn = document.querySelector(".open-video");
// const closeBtn = document.querySelector(".video-close");
// const iframe = document.getElementById("youtubeFrame");

// const videoURL = "https://www.youtube.com/embed/JS5LZVZ5mwk?autoplay=1";

// openBtn.addEventListener("click", () => {
//   popup.classList.add("active");
//   iframe.src = videoURL;
// });

// closeBtn.addEventListener("click", closePopup);
// popup.addEventListener("click", e => {
//   if (e.target === popup) closePopup();
// });

// function closePopup() {
//   popup.classList.remove("active");
//   iframe.src = ""; // stop video
// }


// const scrollBtn = document.querySelector(".scroll-top");

// scrollBtn.addEventListener("click", () => {
//   window.scrollTo({
//     top: 0,
//     left: 0,
//     behavior: "smooth"
//   });
// });




document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".numbers-tabs .tab");
  const leftItems = document.querySelectorAll(".numbers-left .numbers-tabs-item");
  const rightItems = document.querySelectorAll(".numbers-right .numbers-right-content");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {

      /* ---- REMOVE ACTIVE FROM ALL ---- */
      tabs.forEach(t => t.classList.remove("active"));
      leftItems.forEach(item => item.classList.remove("active"));
      rightItems.forEach(item => item.classList.remove("active"));

      /* ---- ADD ACTIVE TO CURRENT ---- */
      tab.classList.add("active");
      leftItems[index]?.classList.add("active");
      rightItems[index]?.classList.add("active");

    });
  });

});


document.addEventListener("DOMContentLoaded", () => {

  let animatedTabs = new Set(); // track already animated tabs

  function animateCounters(container) {
    if (!container || animatedTabs.has(container)) return;

    animatedTabs.add(container);

    const counters = container.querySelectorAll(".stat-box h3");

    counters.forEach(counter => {

      const originalText = counter.innerText.trim();

      let target = parseInt(originalText.replace(/[^0-9]/g, ""));
      let hasPlus = originalText.includes("+");
      let hasK = originalText.includes("K");

      let current = 0;
      const duration = 1200;
      const stepTime = 20;
      const increment = Math.ceil(target / (duration / stepTime));

      const update = () => {
        current += increment;

        if (current >= target) {
          current = target;
          counter.innerText =
            hasK ? `${current}K` : hasPlus ? `${current}+` : current;
        } else {
          counter.innerText =
            hasK ? `${current}K` : hasPlus ? `${current}+` : current;
          setTimeout(update, stepTime);
        }
      };

      update();
    });
  }

  /* ---- OBSERVER (only active block) ---- */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains("active")) {
        animateCounters(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll(".numbers-right-content").forEach(block => {
    observer.observe(block);
  });

  /* ---- TAB CLICK: trigger animation for active ---- */
  document.querySelectorAll(".numbers-tabs .tab").forEach((tab, index) => {
    tab.addEventListener("click", () => {
      const activeRight = document.querySelectorAll(".numbers-right-content")[index];
      if (activeRight) animateCounters(activeRight);
    });
  });

});



const propertySwiper = new Swiper(".property-slider", {
  slidesPerView: "auto",
  slidesPerGroup: 1,
  spaceBetween: 30,
  centeredSlides: false,   // 👈 MOST IMPORTANT
  loop: true,
  speed: 2000,

  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  }
});


const consumerSwiper = new Swiper(".consumer-slider", {
  slidesPerView: "auto",
  spaceBetween: 20,

  loop: true,
  loopAdditionalSlides: 20,

  speed: 4000,               // continuous speed
  autoplay: {
    delay: 0,                // NO GAP
    disableOnInteraction: false,
  },

  freeMode: true,            // 🔥 REQUIRED
  freeModeMomentum: false,  // 🔥 REQUIRED

  allowTouchMove: false,
  grabCursor: false
});


