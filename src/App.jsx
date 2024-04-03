import { useEffect, useRef, useState } from "react";
import DG from "2gis-maps";
import {
  Box,
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

import * as d3 from "d3";

import industrialV from "../images/bg_industrial_vertical.png";
import livingV from "../images/bg_living_vertical.png";
import commercialV from "../images/bg_commercial_vertical.png";
import designV from "../images/bg_design_vertical.png";
import hiringV from "../images/bg_hiring_vertical.png";

import industrialH from "../images/bg_industrial_horizontal.png";
import livingH from "../images/bg_living_horizontal.png";
import commercialH from "../images/bg_commercial_horizontal.png";
import designH from "../images/bg_design_horizontal.png";
import hiringH from "../images/bg_hiring_horizontal.png";
// import { LabelBottomNavigation } from "./TapMenu";

const elems = [
  {
    picV: industrialV,
    picH: industrialH,
    prop: "industrial",
    title: "Промышленные объекты",
  },
  { picV: livingV, picH: livingH, prop: "living", title: "Жилые здания" },
  {
    picV: commercialV,
    picH: commercialH,
    prop: "commercial",
    title: "Торговые комплексы",
  },
  { picV: designV, picH: designH, prop: "design", title: "Дизайн помещений" },
  { picV: hiringV, picH: hiringH, prop: "hiring", title: "Открытые вакансии" },
];

const stylePopup = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
};

const styleCard_portrait = {
  height: "auto",
  width: "100%",
};

const styleCard_landscape = {
  height: "100%",
  width: "auto",
};

function App() {
  let ref = useRef();

  const [value, setValue] = useState("");
  const handleChangeBottomMenu = (event, newValue) => {
    setValue(newValue);
    handleAllClose();
    if (newValue === "location") {
      handleMapOpen();
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
  };

  let screenWidth = screen.width;
  let screenHeight = screen.height;
  let isPortrait = screenHeight > screenWidth;
  console.log(screenWidth, screenHeight);

  const handleMouseOver = (prop) => {
    const animatedButtons = document.querySelectorAll(".btn_jittery");
    animatedButtons.forEach((el) => (el.style.animation = "none"));

    const selectedElement = document.getElementById(prop);
    if (selectedElement) {
      selectedElement.style.transition = "filter 0.4s ease-in-out";
      selectedElement.style.filter = "blur(12px) saturate(0%) brightness(60%)";
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
        });
      }
    }
  };

  let ctaButton = document.querySelector(".btn_jittery");

  DG.then(function () {
    let map;
    map = DG.map("map", {
      center: [53.34172210833575, 83.77499609815216],
      zoom: 17,
    });
    DG.marker([53.34172210833575, 83.77499609815216]).addTo(map);
  });

  useEffect(() => {
    ref && d3.select("#letters").selectAll("path").style("fill", "#f8f8f8");
    ref && d3.select("#letters").selectAll("polygon").style("fill", "#f8f8f8");
    ref && d3.select("#pen").selectAll("path").style("fill", "#0088d1");

    window.addEventListener("resize", () => {
      let vh = window.innerHeight / 100;
      let vw = screen.innerWidth / 100;

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
  }, []);

  return (
    <>
      <div className='page' ref={ref}>
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
                transformOrigin='center'
                transform='scale(0.023)'
                filter='url(#lettersGlow)'
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
                transformOrigin='center'
                transform='scale(0.023)'
                filter='url(#penGlow)'
              >
                <path
                  fill='#244082'
                  d='M28 1629c0,0 -2,65 0,0l1573 5 -42 65 -1533 -5 2 -65zm1775 -1628l69 20 -74 250c-10,32 10,67 43,74l1 0 261 78c31,10 64,-8 73,-40l75 -249 68 19 -201 682 -69 -20 74 -249c10,-33 -10,-67 -43,-75l0 0 -262 -78c-31,-9 -65,9 -74,40l-74 249 -68 -20 201 -681zm-23 1223l1 -1c1,-1 2,-3 3,-5l0 0 236 -367 71 20 -490 763 3 -907 70 21 -1 441c0,33 26,59 59,59 19,0 37,-9 48,-24z'
                />
              </g>
            </svg>
            {/* <div className='title_main'>
              Проектное бюро &quot;Технология&quot;
            </div> */}
            <ul className='buttons'>
              <li className='btn0 btn-1 neon_container' onClick={handleMapOpen}>
                <a href='#0'>Где находимся</a>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>

              <li
                className='btn0 btn-1 neon_container'
                onClick={handlePriceOpen}
              >
                <a href='#0'>Цены</a>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
              <li
                className='btn0 btn-1 neon_container'
                onClick={handleAboutOpen}
              >
                <a href='#0'>Контакты</a>
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
                <img
                  className='card picture'
                  id={el.prop}
                  src={isPortrait ? el.picH : el.picV}
                  style={isPortrait ? styleCard_portrait : styleCard_landscape}
                />
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

          <BottomNavigation
            sx={{ width: "100%" }}
            value={value}
            onChange={handleChangeBottomMenu}
          >
            <BottomNavigationAction
              label='Где найти'
              value='location'
              icon={<LocationOnTwoToneIcon />}
            />
            <BottomNavigationAction
              label='Контакты'
              value='contacts'
              icon={<BusinessTwoToneIcon />}
            />
            <BottomNavigationAction
              label='Цены'
              value='price'
              icon={<ShoppingCartTwoToneIcon />}
            />
          </BottomNavigation>
        </main>

        <footer className='footer'>
          <div className='footer_title'>
            ООО &quot;Проектное бюро Технология&quot; &#169; 2024
          </div>
        </footer>
      </div>

      <Modal
        open={isMapOpened}
        onClose={handleMapClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ width: "auto", marginLeft: 5, marginRight: 5 }}
      >
        <Box sx={stylePopup}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Наш офис на Геблера 28:
          </Typography>
          <Box
            component='section'
            id='map'
            height={400}
            fullwidth
            sx={{ p: 1, border: "1px dashed grey" }}
          ></Box>
        </Box>
      </Modal>

      <Modal
        open={isPriceOpened}
        onClose={handlePriceClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ width: "auto", marginLeft: 5, marginRight: 5 }}
      >
        <Box sx={stylePopup}>
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
        onClose={handleAboutClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        sx={{ width: "auto", marginLeft: 5, marginRight: 5 }}
      >
        <Box sx={stylePopup}>
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
    </>
  );
}

export default App;
