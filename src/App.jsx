import logo from "../images/pblogo.png";
import industrial from "../images/bg_plant_plain_vertical.png";
import living from "../images/bg_living_vertical.png";
import commercial from "../images/bg_commercial_vertical.png";
import design from "../images/bg_design_vertical.png";
import hiring from "../images/bg_hiring_vertical.png";

const elems = [
  { pic: industrial, prop: "industrial", title: "Промышленные объекты" },
  { pic: living, prop: "living", title: "Жилые здания" },
  { pic: commercial, prop: "commercial", title: "Торговые комплексы" },
  { pic: design, prop: "design", title: "Дизайн помещений" },
  { pic: hiring, prop: "hiring", title: "Открытые вакансии" },
];

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

  let ctaButton = document.querySelector(".btn_jittery");
  console.log(ctaButton);

  const handleMouseOver = (prop) => {
    const animatedButtons = document.querySelectorAll(".btn_jittery");
    animatedButtons.forEach((el) => (el.style.animation = "none"));

    const selectedElement = document.getElementById(prop);
    if (selectedElement) {
      selectedElement.style.transition = "filter 0.8s ease-in-out";
      selectedElement.style.filter = "blur(12px) saturate(0%) ";
    }
  };

  const handleMouseOut = (e, prop) => {
    if (!e.relatedTarget.contains(ctaButton)) {
      const selectedElement = document.getElementById(prop);

      if (selectedElement) {
        selectedElement.style.transition = "filter 0.4s ease-in-out";
        selectedElement.style.filter = "";

        const animatedButtons = document.querySelectorAll(".btn_jittery");
        animatedButtons.forEach((el) => {
          el.style.animation = "jittery 6s infinite";
          el.style.animationDelay = `${5 + Math.random() * 10 + Math.random() * 10}s`;
        });
      }
    }
  };

  return (
    <>
      <div className='page'>
        <header className='container_header'>
          <div className='header_group'>
            <img className='logo' src={logo} />
            <ul className='buttons'>
              <li className='btn0 btn-1 neon_container'>
                <a href='#0'>Где находимся</a>
              </li>
              <li className='btn0 btn-1 neon_container'>
                <a href='#0'>Цены</a>
              </li>
              <li className='btn0 btn-1 neon_container'>
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
          {elems.map((el, index) => {
            return (
              <div className='card' key={index}>
                <img className='card picture' id={el.prop} src={el.pic} />
                <div
                  className='btn_jittery title neon_container'
                  onMouseOver={() => handleMouseOver(el.prop)}
                  onMouseOut={(e) => handleMouseOut(e, el.prop)}
                  style={{
                    animationDelay: `${5 + Math.random() * 10 + Math.random() * 10}s`,
                  }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {el.title}
                </div>
              </div>
            );
          })}
        </main>

        <footer className='footer'>
          <div className='footer_title'>
            ООО &quot;Проектное бюро Технология&quot; &#169; 2024
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
