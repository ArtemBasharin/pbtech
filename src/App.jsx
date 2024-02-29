import logo from "../images/pblogo.png";
import industrial from "../images/bg_plant_plain_vertical.png";
import living from "../images/bg_living_vertical.png";
import commercial from "../images/bg_commercial_vertical.png";
import design from "../images/bg_design_vertical.png";
import hiring from "../images/bg_hiring_vertical.png";
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
import { useState } from "react";
// import { load } from "@2gis/mapgl";
import DG from "2gis-maps";
import DrawIcon from "@mui/icons-material/Draw";

const elems = [
  { pic: industrial, prop: "industrial", title: "Промышленные объекты" },
  { pic: living, prop: "living", title: "Жилые здания" },
  { pic: commercial, prop: "commercial", title: "Торговые комплексы" },
  { pic: design, prop: "design", title: "Дизайн помещений" },
  { pic: hiring, prop: "hiring", title: "Открытые вакансии" },
];

const style = {
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

function App() {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [isMapOpened, setIsMapOpened] = useState(false);
  const handleMapOpen = () => setIsMapOpened(true);
  const handleMapClose = () => setIsMapOpened(false);

  const [isPriceOpened, setIsPriceOpened] = useState(false);
  const handlePriceOpen = () => setIsPriceOpened(true);
  const handlePriceClose = () => setIsPriceOpened(false);

  const [isAboutOpened, setIsAboutOpened] = useState(false);
  const handleAboutOpen = () => setIsAboutOpened(true);
  const handleAboutClose = () => setIsAboutOpened(false);

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

  const handleMouseOver = (prop) => {
    const animatedButtons = document.querySelectorAll(".btn_jittery");
    animatedButtons.forEach((el) => (el.style.animation = "none"));

    const selectedElement = document.getElementById(prop);
    if (selectedElement) {
      selectedElement.style.transition = "filter 0.4s ease-in-out";
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

  DG.then(function () {
    let map;
    map = DG.map("map", {
      center: [53.34172210833575, 83.77499609815216],
      zoom: 17,
    });
    DG.marker([53.34172210833575, 83.77499609815216]).addTo(map);
  });
  return (
    <>
      <div className='page'>
        <header className='container_header'>
          <div className='header_group'>
            <img className='logo' src={logo} />
            <ul className='buttons'>
              <li className='btn0 btn-1 neon_container' onClick={handleMapOpen}>
                <a href='#0'>Где находимся</a>
              </li>
              <li
                className='btn0 btn-1 neon_container'
                onClick={handlePriceOpen}
              >
                <a href='#0'>Цены</a>
              </li>
              <li
                className='btn0 btn-1 neon_container'
                onClick={handleAboutOpen}
              >
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

      <Modal
        open={isMapOpened}
        onClose={handleMapClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
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
      >
        <Box sx={style}>
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
      >
        <Box sx={style}>
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
