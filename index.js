console.log("script");
// слушаем событие resize
window.addEventListener("resize", () => {
  // получаем текущее значение высоты
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
