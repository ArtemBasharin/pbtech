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

