// import * as THREE from "./three";
// import TweenMax from "gsap";
// import THREE from "./node_modules/three/src/Three";
// import TweenMax from "./node_modules/gsap/gsap-core";
import Kute from "./node_modules/kute.js";
response.setHeader("Content-Type", "application/javascript");

window.addEventListener("resize", () => {
  let vh = window.innerHeight / 100;
  let vw = window.innerWidth / 100;

  document.documentElement.style.setProperty("--vh", `${vh}px`);
  document.documentElement.style.setProperty("--vw", `${vw}px`);
});

function hideAddressBar() {
  if (!window.location.hash) {
    if (document.height < window.outerHeight) {
      document.body.style.height = window.outerHeight + 50 + "px";
    }

    setTimeout(function () {
      window.scrollTo(0, 1);
    }, 50);
  }
}

window.addEventListener("load", function () {
  if (!window.scrollY) {
    hideAddressBar();
  }
});

window.addEventListener("orientationchange", hideAddressBar);

// const btnElements = document.querySelectorAll(".btn_jittery");

// btnElements.forEach((btn, index) => {
//   const randomDelay = index * 0.5 + "s"; // Генерация разных задержек для разных элементов
//   btn.style.setProperty("--random-delay", randomDelay);
// });

for (let i = 1; i < 5; i++) {
  const btn = document.querySelector(`.btn_jittery${i}`);
  btn.style.setProperty(`--random-delay${i}`, `${Math.random() * 12}s`);
}

// Создание SVG изображения
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "100");
svg.setAttribute("height", "100");
svg.innerHTML = "<rect x='10' y='10' width='30' height='30' fill='red' />";
document.body.appendChild(svg);
// Создание анимации
var animation = new Kute.Animation();
// Добавление файлов картинок
animation.add(svg, {
  duration: 1,
  easing: "easeInOut",
  animate: function (value) {
    svg.innerHTML = "<image xlink:href='image1.png' width='30' height='30' />";
  },
  animate: function (value) {
    svg.innerHTML = "<image xlink:href='image2.png' width='30' height='30' />";
  }
});
// Запуск анимации
animation.play();
