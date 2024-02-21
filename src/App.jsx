import MorphAnimation from "./svgAnimation";

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

  const getRandomDelay = () => {
    return Math.random() * 100 + "s";
  };

  return (
    <>
      <div className='page'>
        <header className='container_header'>
          <div className='header_group'>
            <img className='logo' src='./images/pblogo.png' />
            <ul className='buttons'>
              <li className='btn0 btn-1'>
                <a href='#0'>Промышленные объекты</a>
              </li>
              <li className='btn0 btn-1'>
                <a href='#0'>Жилые здания</a>
              </li>
              <li className='btn0 btn-1'>
                <a href='#0'>Торговые комплексы</a>
              </li>
              <li className='btn0 btn-1'>
                <a href='#0'>Открытые вакансии</a>
              </li>
            </ul>
          </div>
          <div className='wrapper'>
            <div className='icon facebook btn btn__secondary'>
              <span>
                <i className='fab fa-vk'></i>
              </span>
            </div>
            <div className='icon twitter btn btn__secondary'>
              <span>
                <i className='fab fa-telegram'></i>
              </span>
            </div>
            <div className='icon instagram btn btn__secondary'>
              <span>
                <i className='fab fa-instagram'></i>
              </span>
            </div>
            <div className='icon linkedin btn btn__secondary'>
              <span>
                <i className='fab fa-linkedin'></i>
              </span>
            </div>
            <div className='icon youtube btn btn__secondary'>
              <span>
                <i className='fab fa-youtube'></i>
              </span>
            </div>
            <div className='icon whatsapp btn btn__secondary'>
              <span>
                <i className='fab fa-whatsapp'></i>
              </span>
            </div>
          </div>
        </header>

        <main className='page-content'>
          <div className='card bg_plant' id='caption'>
            <MorphAnimation />
            <button
              className='title btn_jittery'
              style={{ animationDelay: getRandomDelay() }}
            >
              Промышленные
              <br />
              объекты
            </button>
          </div>

          <div className='card bg_living' id='caption'>
            <button
              className='title btn_jittery '
              style={{ animationDelay: getRandomDelay() }}
            >
              Жилые
              <br />
              здания
            </button>
            {/* <!-- <button className="btn">Подробнее</button> --> */}
          </div>

          <div className='card bg_commercial' id='caption'>
            <button
              className='title btn_jittery '
              style={{ animationDelay: getRandomDelay() }}
            >
              Торговые
              <br />
              комплексы
            </button>
            {/* <!-- <button className="btn">Подробнее</button> --> */}
          </div>

          <div className='card bg_design' id='caption'>
            <button
              className='title btn_jittery '
              style={{ animationDelay: getRandomDelay() }}
            >
              Дизайн
              <br />
              помещений
            </button>
            {/* <!-- <button className="btn">Подробнее</button> --> */}
          </div>

          <div className='card bg_hiring' id='caption'>
            <button
              className='title btn_jittery '
              style={{ animationDelay: getRandomDelay() }}
            >
              Открытые
              <br />
              вакансии
            </button>
            {/* <!-- <button className="btn">Подробнее</button> --> */}
          </div>
        </main>

        <footer className='footer'>
          {/* <!-- <img className="logo logo_footer" src="./images/pblogo.png" /> --> */}
          <div className='footer_title'>
            ООО `&quot;`Проектное бюро Технология`&quot;` &#169; 2024
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
