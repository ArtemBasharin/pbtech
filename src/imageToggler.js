export const imageToggle = (imagePath1, imagePath2, selector) => {
  const images = [imagePath1, imagePath2];
  let currentImageIndex = 0;

  const selectedBlock = document.querySelector(selector);

  function viewBgImage(src) {
    selectedBlock.style.transition = "background-image 1s ease-in-out";
    selectedBlock.style.backgroundImage = src;
  }

  function toggleImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    const imageSrc = images[currentImageIndex];
    viewBgImage(imageSrc);
  }

  selectedBlock.addEventListener("mouseover", toggleImage);
};
