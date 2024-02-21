import "./App.css";

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

  // const btnElements = document.querySelectorAll(".btn_jittery");

  // btnElements.forEach((btn, index) => {
  //   const randomDelay = index * 0.5 + "s"; // Генерация разных задержек для разных элементов
  //   btn.style.setProperty("--random-delay", randomDelay);
  // });

  for (let i = 1; i < 5; i++) {
    const btn = document.querySelector(`.btn_jittery${i}`);
    btn.style.setProperty(`--random-delay${i}`, `${Math.random() * 12}s`);
  }

  return (
    <>
      <body className='page'>
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
          <div className='card animation-container' id='caption'>
            <div
              className='liquid bg_plant'
              data-first='./images/bg_industry_vertical.svg'
              data-second='./images/bg_industry_vertical2.svg'
              data-displacement='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLZ1R3IndRPpHLRYWHQufxPM_T1SH51SMzlQ&usqp=CAU'
            ></div>
            <div className='button_container btn_jittery btn_jittery1'>
              <button className='title'>
                Промышленные
                <br />
                объекты
              </button>
              <div className='button_pointer'></div>
            </div>
          </div>

          <div className='card' id='caption'>
            <div className='bg_living img1 img'></div>
            <div className='button_container btn_jittery btn_jittery2'>
              <button id='play' className='title'>
                Жилые
                <br />
                здания
              </button>
              {/* <!-- <button className="btn">Подробнее</button> --> */}
              <div className='button_pointer'></div>
            </div>
          </div>

          <div className='card bg_commercial' id='caption'>
            <button className='title btn_jittery btn_jittery3'>
              Торговые
              <br />
              комплексы
            </button>
            {/* <!-- <button className="btn">Подробнее</button> --> */}
          </div>

          <div className='card bg_design' id='caption'>
            <button className='title btn_jittery btn_jittery4'>
              Дизайн
              <br />
              помещений
            </button>
            {/* <!-- <button className="btn">Подробнее</button> --> */}
          </div>

          <div className='card bg_hiring' id='caption'>
            <button className='title btn_jittery btn_jittery5'>
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
      </body>
    </>
  );
}

export default App;
