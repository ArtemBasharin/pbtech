import { useEffect, useRef, useState } from "react";
import DG from "2gis-maps";
import {
  Box,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import LocationOnTwoToneIcon from "@mui/icons-material/LocationOnTwoTone";
import DrawIcon from "@mui/icons-material/Draw";
import NavigationIcon from "@mui/icons-material/Navigation";

import * as d3 from "d3";

import { CSSTransition } from "react-transition-group";

import industrialV from "../images/bg_industrial_vertical.png";
import livingV from "../images/bg_living_vertical.png";
import commercialV from "../images/bg_commercial_vertical.png";
import designV from "../images/bg_design_vertical.png";
import hiringV from "../images/bg_hiring_vertical.png";

import industrialV2 from "../images/bg_industrial_vertical2.png";
import livingV2 from "../images/bg_living_vertical2.png";
import commercialV2 from "../images/bg_commercial_vertical2.png";
import designV2 from "../images/bg_design_vertical2.png";
import hiringV2 from "../images/bg_hiring_vertical2.png";

import industrialH from "../images/bg_industrial_horizontal.png";
import livingH from "../images/bg_living_horizontal.png";
import commercialH from "../images/bg_commercial_horizontal.png";
import designH from "../images/bg_design_horizontal.png";
import hiringH from "../images/bg_hiring_horizontal.png";

import industrialH2 from "../images/bg_industrial_horizontal2.png";
import livingH2 from "../images/bg_living_horizontal2.png";
import commercialH2 from "../images/bg_commercial_horizontal2.png";
import designH2 from "../images/bg_design_horizontal2.png";
import hiringH2 from "../images/bg_hiring_horizontal2.png";

import BlogIndustry from "./BlogIndustry";
import BlogLiving from "./BlogLiving";
import BlogCommercial from "./BlogCommercial";
import BlogDesign from "./BlogDesign";
import BlogHiring from "./BlogHiring";
// import { LabelBottomNavigation } from "./TapMenu";

const elems = [
  {
    picV: industrialV,
    picH: industrialH,
    picV2: industrialV2,
    picH2: industrialH2,
    prop: "industrial",
    title: "Промышленные объекты",
  },
  {
    picV: livingV,
    picH: livingH,
    picV2: livingV2,
    picH2: livingH2,
    prop: "living",
    title: "Жилые здания",
  },
  {
    picV: commercialV,
    picH: commercialH,
    picV2: commercialV2,
    picH2: commercialH2,
    prop: "commercial",
    title: "Коммерческие объекты",
  },
  {
    picV: designV,
    picH: designH,
    picV2: designV2,
    picH2: designH2,
    prop: "design",
    title: "Дизайн помещений",
  },
  {
    picV: hiringV,
    picH: hiringH,
    picV2: hiringV2,
    picH2: hiringH2,
    prop: "hiring",
    title: "Открытые вакансии",
  },
];

const stylePopup = {
  position: "absolute",
  // margin: "auto",
  // transform: "translate(0, 50%)",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: "auto",
  width: 400,
  height: "min-content",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const styleCard_portrait = (url) => {
  return { height: "100%", width: "100%", backgroundImage: `url(${url})` };
};

const styleCard_landscape = (url) => {
  return { width: "100%", backgroundImage: `url(${url})` };
};

function App() {
  let pageRef = useRef();
  let mapRef = useRef();

  const [value, setValue] = useState("");

  const handleChangeBottomMenu = (event, newValue) => {
    setValue(newValue);
    if (newValue === "location") {
      handleMapOpen();
      DG.then(function () {
        let map;
        map = DG.map("map", {
          center: [53.34172210833575, 83.77499609815216],
          zoom: 17,
        });
        DG.marker([53.34172210833575, 83.77499609815216]).addTo(map);
      });
    }
    if (newValue === "contacts") {
      handleAboutOpen();
    }
    if (newValue === "price") {
      handlePriceOpen();
    }
  };

  const [isMapOpened, setIsMapOpened] = useState(false);
  const handleMapOpen = () => setIsMapOpened(true);
  const handleMapClose = () => setIsMapOpened(false);

  const [isPriceOpened, setIsPriceOpened] = useState(false);
  const handlePriceOpen = () => setIsPriceOpened(true);
  const handlePriceClose = () => setIsPriceOpened(false);

  const [isAboutOpened, setIsAboutOpened] = useState(false);
  const handleAboutOpen = () => setIsAboutOpened(true);
  const handleAboutClose = () => setIsAboutOpened(false);

  const handleAllClose = () => {
    handleMapClose();
    handlePriceClose();
    handleAboutClose();
    setTimeout(() => {
      setValue("");
    }, 500);
  };

  let screenWidth = screen.width;
  let screenHeight = screen.height;
  const [isPortrait, setIsPortrait] = useState(screenHeight > screenWidth);

  const handleMouseOver = (prop) => {
    const images = document.querySelectorAll(".picture");
    images.forEach((el) => {
      // alert(el.style.backgroundImage);
      console.log(el);
      // console.log(elems.find((el) => el.prop === prop.prop));
      el.style.opacity = 1;
    });

    const animatedButtons = document.querySelectorAll(".btn_jittery");
    animatedButtons.forEach((el) => (el.style.animation = "none"));

    const selectedElementOverlay = document.getElementById(`${prop.prop}`);
    if (selectedElementOverlay) {
      selectedElementOverlay.style.opacity = 0;
    }
  };

  const handleMouseOut = (e, prop) => {
    if (!e.relatedTarget.contains(ctaButton)) {
      const selectedElement = document.getElementById(prop.prop);
      if (selectedElement) {
        const animatedButtons = document.querySelectorAll(".btn_jittery");
        animatedButtons.forEach((el) => {
          el.style.animation = "jittery 6s infinite";
        });
      }
    }
  };

  const [buttonClicked, setButtonClicked] = useState(new Array(3).fill(false));

  const [showBlogIndustry, setShowBlogIndustry] = useState(false);
  const [showBlogLiving, setShowBlogLiving] = useState(false);
  const [showBlogCommercial, setShowBlogCommercial] = useState(false);
  const [showBlogDesign, setShowBlogDesign] = useState(false);
  const [showBlogHiring, setShowBlogHiring] = useState(false);

  const handleBlogClose = () => {
    setShowBlogIndustry(false);
    setShowBlogLiving(false);
    setShowBlogCommercial(false);
    setShowBlogDesign(false);
    setShowBlogHiring(false);
  };

  // Функция-обработчик для нажатия кнопки
  const handleClick = (index) => {
    // Создаем новый массив, изменяя состояние только для нажатой кнопки
    const newButtonClicked = [...buttonClicked];
    newButtonClicked[index] = !newButtonClicked[index];
    // Устанавливаем новое состояние
    setButtonClicked(newButtonClicked);

    switch (index) {
      case 0:
        setShowBlogIndustry((prevState) => !prevState);
        break;
      case 1:
        setShowBlogLiving((prevState) => !prevState);
        break;
      case 2:
        setShowBlogCommercial((prevState) => !prevState);
        break;
      case 3:
        setShowBlogDesign((prevState) => !prevState);
        break;
      case 4:
        setShowBlogHiring((prevState) => !prevState);
        break;
      default:
        break;
    }
  };

  let ctaButton = document.querySelector(".btn_jittery");

  useEffect(() => {
    pageRef && d3.select("#letters").selectAll("path").style("fill", "#f8f8f8");
    pageRef &&
      d3.select("#letters").selectAll("polygon").style("fill", "#f8f8f8");
    pageRef && d3.select("#pen").selectAll("path").style("fill", "#0088d1");

    const updateOrientation = () => {
      let vh = window.innerHeight / 100;
      let vw = window.innerWidth / 100;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);
      const newIsPortrait = vh > vw;
      setIsPortrait(newIsPortrait);
      // console.log(newIsPortrait);
    };

    window.addEventListener("resize", updateOrientation);

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

    // return () => {
    //   window.removeEventListener("resize", updateOrientation);
    //   window.removeEventListener("orientationchange", hideAddressBar);
    // };
  }, [mapRef]);

  return (
    <>
      <div className='page' ref={pageRef}>
        <header className='container_header'>
          <div className='header_group'>
            <svg
              className='logo'
              id='svgLogo'
              xmlns='http://www.w3.org/2000/svg'
              width='70px'
              height='50px'
            >
              <filter id='lettersGlow'>
                <feDropShadow
                  dx='0'
                  dy='0'
                  stdDeviation='50'
                  floodColor='#ffffff'
                  floodOpacity='0.8'
                >
                  <animate
                    attributeName='stdDeviation'
                    from='0'
                    to='70'
                    calcMode='spline'
                    dur='2s'
                    repeatCount='indefinite'
                    keyTimes='0; 0.25; 0.5; 0.75; 1'
                    keySplines='0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1'
                  />
                </feDropShadow>
                <feDropShadow
                  dx='0'
                  dy='0'
                  stdDeviation='50'
                  floodColor='#ffffff'
                  floodOpacity='0.8'
                >
                  <animate
                    attributeName='stdDeviation'
                    from='70'
                    to='0'
                    calcMode='spline'
                    dur='2s'
                    repeatCount='indefinite'
                    keyTimes='0; 0.25; 0.5; 0.75; 1'
                    keySplines='0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1'
                  />
                </feDropShadow>
              </filter>

              <filter id='penGlow'>
                <feDropShadow
                  dx='0'
                  dy='0'
                  stdDeviation='50'
                  floodColor='#8ac3ff'
                  floodOpacity='0.8'
                >
                  <animate
                    attributeName='stdDeviation'
                    from='0'
                    to='70'
                    calcMode='spline'
                    dur='1.5s'
                    repeatCount='indefinite'
                    keyTimes='0; 0.25; 0.5; 0.75; 1'
                    keySplines='0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1'
                  />
                </feDropShadow>
                <feDropShadow
                  dx='0'
                  dy='0'
                  stdDeviation='50'
                  floodColor='#8ac3ff'
                  floodOpacity='0.8'
                >
                  <animate
                    attributeName='stdDeviation'
                    from='50'
                    to='0'
                    calcMode='spline'
                    dur='1.5s'
                    repeatCount='indefinite'
                    keyTimes='0; 0.25; 0.5; 0.75; 1'
                    keySplines='0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1'
                  />
                </feDropShadow>
              </filter>

              <g
                id='letters'
                transform='scale(0.023)'
                filter='url(#lettersGlow)'
                style={{ transformorigin: "center" }}
              >
                {/* <animate
                  attributeType='XML'
                  attributeName='filter'
                  from='url(#fromFlick)'
                  to='url(#toFlick)'
                  dur='0.06s'
                  repeatCount='indefinite'
                /> */}
                <path
                  fill='#5B5B5B'
                  d='M785 803c190,1 345,156 344,347 0,191 -156,345 -347,344 -13,0 -26,-1 -39,-2l0 0 0 -1 -1 -2c0,-11 1,-19 2,-32 13,2 26,3 39,3 171,0 311,-139 312,-310 0,-172 -139,-312 -311,-312 -171,-1 -311,145 -311,310 -1,164 117,287 268,309 1,3 1,-1 2,2 0,5 -1,18 -2,25 -1,1 2,3 0,2l0 5 -4 0c-169,-23 -300,-168 -299,-343 1,-191 156,-346 347,-345z'
                />
                <path
                  fill='#5B5B5B'
                  d='M1197 1496l2 -692 376 2 -10 34 -262 -1c-39,0 -70,31 -70,69l-2 588 -34 0z'
                />
                <path
                  fill='#5B5B5B'
                  d='M2656 42c191,1 345,156 344,347 -1,191 -156,345 -347,344 -191,0 -345,-156 -344,-346 0,-190 158,-342 347,-345 0,5 2,11 2,18l0 1c1,6 2,11 2,16l-5 0 0 0c-171,-1 -311,138 -312,310 0,172 139,311 310,312 172,0 312,-139 312,-310 1,-171 -136,-309 -305,-312 1,-4 -2,-32 -4,-35z'
                />
                <polygon
                  fill='#5B5B5B'
                  points='2076,877 2111,887 2109,1498 2074,1498 '
                />
                <path
                  fill='#5B5B5B'
                  d='M2666 1500c1,-230 2,-461 3,-691l-301 -1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1 0 0 0c-100,0 -181,81 -181,181 -1,87 59,160 141,177 29,-1 78,52 43,107l-145 226 42 0 231 -362 -132 -1c-81,0 -146,-66 -146,-147 0,-81 66,-147 147,-146l0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 231 0c19,0 35,16 35,35l0 63 -1 162 0 103 -1 294 34 0z'
                />
                <path
                  fill='#5B5B5B'
                  d='M787 36c191,1 345,156 344,347 0,6 0,12 0,17l-35 0 -310 -1 -226 0c-38,0 -69,30 -69,69 -1,10 2,20 6,29 46,114 157,196 288,196l0 35c-191,-1 -345,-156 -345,-347 1,-191 156,-345 347,-345zm-227 328l452 1c38,1 69,-30 69,-68 0,-9 -1,-17 -4,-24 0,0 0,-1 0,-2 -45,-116 -158,-200 -290,-200 -133,0 -246,82 -291,199 0,0 -1,1 -1,2 -2,7 -4,15 -4,23 0,38 31,69 69,69z'
                />
                <path
                  fill='#5B5B5B'
                  d='M1244 478l-172 251 -44 -1 227 -330c8,-12 14,-29 13,-42 0,-13 -2,-26 -11,-39l-188 -280 44 1 130 192c2,4 4,7 7,10 13,17 33,28 56,28 22,0 42,-11 55,-27 3,-3 5,-7 8,-10l131 -192 44 0 -187 275c-13,17 -15,25 -15,42 0,17 3,26 14,43l223 331 -45 0 -169 -252c-1,-2 -2,-4 -4,-5 -12,-18 -33,-29 -56,-30 -21,0 -40,10 -53,25 -3,3 -6,6 -8,10z'
                />
                <path
                  fill='#5B5B5B'
                  d='M0 34l10 35 163 0c38,0 69,31 69,69l-2 588 35 0 2 -587c0,-39 31,-69 69,-69l166 0 10 -34 -522 -2z'
                />
                <path
                  fill='#5B5B5B'
                  d='M420 1493l36 0 -199 -692 -204 691 37 0 135 -452c2,-9 15,-21 32,-21 16,0 29,11 32,22l131 452z'
                />
              </g>
              <g
                id='pen'
                transform='scale(0.023)'
                filter='url(#penGlow)'
                style={{ transformorigin: "center" }}
              >
                <path
                  fill='#244082'
                  d='M28 1629c0,0 -2,65 0,0l1573 5 -42 65 -1533 -5 2 -65zm1775 -1628l69 20 -74 250c-10,32 10,67 43,74l1 0 261 78c31,10 64,-8 73,-40l75 -249 68 19 -201 682 -69 -20 74 -249c10,-33 -10,-67 -43,-75l0 0 -262 -78c-31,-9 -65,9 -74,40l-74 249 -68 -20 201 -681zm-23 1223l1 -1c1,-1 2,-3 3,-5l0 0 236 -367 71 20 -490 763 3 -907 70 21 -1 441c0,33 26,59 59,59 19,0 37,-9 48,-24z'
                />
              </g>
            </svg>
            <ul className='buttons'>
              <li
                className='btn0 neon_container'
                onClick={() => handleChangeBottomMenu("location")}
              >
                <a className='link-text' href='#0'>
                  Где находимся
                </a>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>

              <li className='btn0 neon_container' onClick={handlePriceOpen}>
                <a className='link-text' href='#0'>
                  Цены
                </a>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
              <li className='btn0 neon_container' onClick={handleAboutOpen}>
                <a className='link-text' href='#0'>
                  Контакты
                </a>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
            </ul>
          </div>
          <ul className='wrapper'>
            <li className='icon fab fa-vk'></li>
            <li className='icon fab fa-telegram'></li>
            <li className='icon fab fa-instagram'></li>
            <li className='icon fab fa-youtube'></li>
            <li className='icon fab fa-whatsapp'></li>
          </ul>
        </header>
        <main className='page-content'>
          {elems.map((el, index) => {
            return (
              <div className='card' key={index}>
                <div
                  key={index + "img"}
                  className={`card picture`}
                  id={el.prop}
                  style={
                    isPortrait
                      ? styleCard_portrait(el.picH)
                      : styleCard_landscape(el.picV)
                  }
                ></div>

                <div
                  key={index + "img2"}
                  className={`card picture picture_overlay`}
                  id={`${el.prop}2`}
                  style={
                    isPortrait
                      ? styleCard_portrait(el.picH2)
                      : styleCard_landscape(el.picV2)
                  }
                ></div>

                <button
                  className='btn_jittery title neon_container'
                  onMouseOver={() => handleMouseOver(el)}
                  onMouseOut={(e) => handleMouseOut(e, el.prop)}
                  onTouchStart={() => handleMouseOver(el)}
                  onClick={() => handleClick(index)}
                  style={{
                    animationDelay: `${5 + Math.random() * 10 + Math.random() * 10}s`,
                  }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  {el.title}
                </button>
              </div>
            );
          })}

          {isPortrait && (
            <BottomNavigation
              sx={{ width: "100%" }}
              value={value}
              onChange={handleChangeBottomMenu}
            >
              <BottomNavigationAction
                label='Где найти'
                value='location'
                icon={<LocationOnTwoToneIcon sx={{ fontSize: 30 }} />}
              />
              <BottomNavigationAction
                label='Контакты'
                value='contacts'
                icon={<BusinessTwoToneIcon sx={{ fontSize: 30 }} />}
              />
              <BottomNavigationAction
                label='Цены'
                value='price'
                icon={<ShoppingCartTwoToneIcon sx={{ fontSize: 30 }} />}
              />
            </BottomNavigation>
          )}
        </main>

        <footer className='footer'>
          <div className='footer_title'>
            ООО &quot;Проектное бюро Технология&quot; &#169; 2024
          </div>
        </footer>
      </div>

      <Modal
        open={isMapOpened}
        onClose={handleAllClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ width: "auto", marginLeft: "auto", marginRight: "auto" }}
        ref={mapRef}
      >
        <Box sx={isPortrait ? { ...stylePopup, width: "95%" } : stylePopup}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Наш офис на Геблера 28:
          </Typography>
          <Box
            component='section'
            id='map'
            height={400}
            // fullwidth='true'
            sx={{ p: 1, border: "1px dashed grey" }}
          ></Box>
        </Box>
      </Modal>

      <Modal
        open={isPriceOpened}
        onClose={handleAllClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <Box sx={isPortrait ? { ...stylePopup, width: "95%" } : stylePopup}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Предварительная стоимость услуг:
          </Typography>
          <nav aria-label='main mailbox folders'>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DrawIcon />
                  </ListItemIcon>
                  <ListItemText primary='Проект системы водоснабжения' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DrawIcon />
                  </ListItemIcon>
                  <ListItemText primary='Проект системы электроснабжения' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DrawIcon />
                  </ListItemIcon>
                  <ListItemText primary='Проект системы канализации' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DrawIcon />
                  </ListItemIcon>
                  <ListItemText primary='Проект системы вентиляции' />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Modal>

      <Modal
        open={isAboutOpened}
        onClose={handleAllClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <Box sx={isPortrait ? { ...stylePopup, width: "95%" } : stylePopup}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Контакты и юридическая информация
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            ООО &quot;Проектное бюро технология&quot;
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            ИНН 99999999999; ОГРН 999999999999
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            656000, г. Барнаул, ул. Геблера 28
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Телефон: +7 999 999 99 99, +7 385 2 99 99 99
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            mailto: xxxyyyzzz@ya.ru
          </Typography>
        </Box>
      </Modal>

      <div className='popup_map'></div>
      <div className='popup_about'></div>
      <div className='popup_price'></div>

      <CSSTransition
        in={showBlogIndustry}
        timeout={500}
        classNames='slide'
        unmountOnExit
      >
        <>
          <BlogIndustry />
          <Fab
            variant='extended'
            sx={{
              position: "fixed",
              bottom: 25,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
            }}
            onClick={handleBlogClose}
          >
            <NavigationIcon sx={{ mr: 1, transform: "rotate(270deg)" }} />
            Назад
          </Fab>
        </>
      </CSSTransition>

      <CSSTransition
        in={showBlogLiving}
        timeout={500}
        classNames='slide'
        unmountOnExit
      >
        <>
          <BlogLiving />
          <Fab
            variant='extended'
            sx={{
              position: "fixed",
              bottom: 25, // Положение от нижнего края экрана
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000, // Высокий z-index, чтобы кнопка была поверх других элементов
            }}
            onClick={handleBlogClose}
          >
            <NavigationIcon sx={{ mr: 1, transform: "rotate(270deg)" }} />
            Назад
          </Fab>
        </>
      </CSSTransition>

      <CSSTransition
        in={showBlogCommercial}
        timeout={500}
        classNames='slide'
        unmountOnExit
      >
        <>
          <BlogCommercial />
          <Fab
            variant='extended'
            sx={{
              position: "fixed",
              bottom: 25, // Положение от нижнего края экрана
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000, // Высокий z-index, чтобы кнопка была поверх других элементов
            }}
            onClick={handleBlogClose}
          >
            <NavigationIcon sx={{ mr: 1, transform: "rotate(270deg)" }} />
            Назад
          </Fab>
        </>
      </CSSTransition>

      <CSSTransition
        in={showBlogDesign}
        timeout={500}
        classNames='slide'
        unmountOnExit
      >
        <>
          <BlogDesign />
          <Fab
            variant='extended'
            sx={{
              position: "fixed",
              bottom: 25, // Положение от нижнего края экрана
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000, // Высокий z-index, чтобы кнопка была поверх других элементов
            }}
            onClick={handleBlogClose}
          >
            <NavigationIcon sx={{ mr: 1, transform: "rotate(270deg)" }} />
            Назад
          </Fab>
        </>
      </CSSTransition>

      <CSSTransition
        in={showBlogHiring}
        timeout={500}
        classNames='slide'
        unmountOnExit
      >
        <>
          <BlogHiring />
          <Fab
            variant='extended'
            sx={{
              position: "fixed",
              bottom: 25, // Положение от нижнего края экрана
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000, // Высокий z-index, чтобы кнопка была поверх других элементов
            }}
            onClick={handleBlogClose}
          >
            <NavigationIcon sx={{ mr: 1, transform: "rotate(270deg)" }} />
            Назад
          </Fab>
        </>
      </CSSTransition>
    </>
  );
}

export default App;
