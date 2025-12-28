const slides = document.querySelectorAll(".slide");
const track = document.querySelector(".slider-track");

let index = 0;

document.getElementById("next").onclick = () => {
  index = (index + 1) % slides.length;
  updateSlider();
};

document.getElementById("prev").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
};

function updateSlider() {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");

  track.style.transform = `translateX(-${index * 240}px)`;
}
