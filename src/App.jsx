import { useState } from "react";

function App() {
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

  // const getRandomDelay = () => {
  //       return Math.random() * 100 + "s";
  // };

  // const getRandomDelay = () => {
  //   return Array.from({ length: 5 }, () => Math.random() * 100 + "s");
  // };

  // const randomDelaysArray = getRandomDelay();

  // const [animationProp, setAnimationProp] = useState(null);

  // function handleMouseOver() {
  //   setAnimationProp({
  //     opacity: 1,
  //     mask: 'url("../images/mask.png")',
  //     maskSize: "3000% 100%",
  //     animation: "mask-playzero 2s steps(29) forwards",
  //   });
  // }

  // function handleMouseLeave() {
  //   setAnimationProp({
  //     opacity: 1,
  //     mask: 'url("../images/mask.png")',
  //     maskSize: "3000% 100%",
  //     animation: "reverse-playzero 2s steps(29) reverse forwards",
  //   });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagesStore = {
    industrial: [
      "./images/bg_plant_plain_vertical.png",
      "./images/bg_plant_plain_vertical2.png",
    ],
    commercial: ["./images/empty.svg", "./images/bg_commercial_vertical2.png"],
    living: [
      "./images/bg_living_house_vertical.png",
      "./images/bg_living_house_vertical2.png",
    ],
    design: [
      "./images/bg_design_vertical.png",
      "./images/bg_design_vertical2.png",
    ],
    hiring: [
      "./images/bg_hiring_vertical.png",
      "./images/bg_design_vertical2.png",
    ],
  };

  // const handleOnLoad = (prop) => {
  //   const selectedElement = document.getElementById(prop);
  //   let imageSrc = imagesStore[prop][0];
  //   console.log(imageSrc);
  //   if (selectedElement) {
  //     // selectedElement.src = imagesStore[prop][0];
  //     selectedElement.style.backgroundImage = `url(${imageSrc})`;
  //   }
  // };

  const handleMouseOver = (prop) => {
    setCurrentImageIndex((currentImageIndex + 1) % imagesStore[prop].length);
    let imageSrc = imagesStore[prop][currentImageIndex];

    const selectedElement = document.getElementById(prop);

    if (selectedElement) {
      selectedElement.src = "./images/empty.svg";
      selectedElement.style.transition = "background-image 0.25s ease-in-out";
      selectedElement.style.backgroundImage = `url(${imageSrc})`;
    }
  };

  const handleMouseOut = (prop) => {
    setCurrentImageIndex((currentImageIndex + 1) % imagesStore[prop].length);
    let imageSrc = imagesStore[prop][currentImageIndex];

    const selectedElement = document.getElementById(prop);

    if (selectedElement) {
      selectedElement.src = "./images/empty.svg";
      selectedElement.style.transition = "background-image 0.25s ease-in-out";
      selectedElement.style.backgroundImage = `url(${imageSrc})`;
    }
  };

  return (
    <>
      <div className='page'>
        <header className='container_header'>
          <div className='header_group'>
            <img className='logo' src='./images/pblogo.png' />
            <ul className='buttons'>
              <li className='btn0 btn-1'>
                <a href='#0'>Где находимся</a>
              </li>
              <li className='btn0 btn-1'>
                <a href='#0'>Цены</a>
              </li>
              <li className='btn0 btn-1'>
                <a href='#0'>Контакты</a>
              </li>
            </ul>
          </div>
          <div className='wrapper'>
            <a className='icon fab fa-vk'></a>
            <a className='icon fab fa-telegram'></a>
            <a className='icon fab fa-instagram'></a>
            <a className='icon fab fa-youtube'></a>
            <a className='icon fab fa-whatsapp'></a>
          </div>
        </header>
        <main className='page-content'>
          <div className='card'>
            <img
              className='picture'
              id='industrial'
              src={`${imagesStore["industrial"][0]}`}
              onMouseOver={() => handleMouseOver("industrial")}
              onMouseOut={() => handleMouseOut("industrial")}
            />
            <button
              className='title btn_jittery'
              style={{ animationDelay: "15s" }}
            >
              Промышленные
              <br />
              объекты
            </button>
          </div>

          <div className='card'>
            <img
              className='picture'
              id='living'
              src={`${imagesStore["living"][0]}`}
              onMouseOver={() => handleMouseOver("living")}
              onMouseOut={() => handleMouseOut("living")}
            />
            <button
              className='title btn_jittery'
              style={{ animationDelay: "5s" }}
            >
              Жилые
              <br />
              здания
            </button>
          </div>

          <div className='card'>
            <img
              className='picture'
              id='commercial'
              src={`${imagesStore["commercial"][0]}`}
              onMouseOver={() => handleMouseOver("commercial")}
              onMouseOut={() => handleMouseOut("commercial")}
            />
            <button
              className='title btn_jittery'
              style={{ animationDelay: "18s" }}
            >
              Торговые
              <br />
              комплексы
            </button>
          </div>

          <div className='card'>
            <img
              className='picture'
              id='design'
              src={`${imagesStore["design"][0]}`}
              onMouseOver={() => handleMouseOver("design")}
              onMouseOut={() => handleMouseOut("design")}
            />
            <button
              className='title btn_jittery'
              style={{ animationDelay: "8s" }}
            >
              Дизайн
              <br />
              помещений
            </button>
          </div>

          <div className='card'>
            <img
              className='picture'
              id='hiring'
              src={`${imagesStore["hiring"][0]}`}
              onMouseOver={() => handleMouseOver("hiring")}
              onMouseOut={() => handleMouseOut("hiring")}
            />
            <button
              className='title btn_jittery'
              style={{ animationDelay: "12s" }}
            >
              Открытые
              <br />
              вакансии
            </button>
          </div>
        </main>

        <footer className='footer'>
          {/* <!-- <img className="logo logo_footer" src="./images/pblogo.png" /> --> */}
          <div className='footer_title'>
            ООО &quot;Проектное бюро Технология&quot; &#169; 2024
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
