// import { useEffect, useRef } from "react";

import gsap from "gsap";

export const TapMenu = () => {
  function handleMenuTap(id, position, color) {
    var tl = gsap.timeline();
    tl.to("#bgBubble", { duration: 0.15, bottom: "-30px", ease: "ease-out" }, 0)
      .to(
        "#bubble1",
        { duration: 0.1, y: "120%", boxShadow: "none", ease: "ease-out" },
        0
      )
      .to(
        "#bubble2",
        { duration: 0.1, y: "120%", boxShadow: "none", ease: "ease-out" },
        0
      )
      .to(
        "#bubble3",
        { duration: 0.1, y: "120%", boxShadow: "none", ease: "ease-out" },
        0
      )
      .to(
        "#bubble4",
        { duration: 0.1, y: "120%", boxShadow: "none", ease: "ease-out" },
        0
      )
      .to(".icon", { duration: 0.05, opacity: 0, ease: "ease-out" }, 0)
      .to(
        "#bgBubble",
        { duration: 0.2, left: position, ease: "ease-in-out" },
        0.1
      )
      .to(
        "#bgBubble",
        { duration: 0.15, bottom: "-50px", ease: "ease-out" },
        "-=0.2"
      )
      .to(
        `#bubble${id}`,
        {
          duration: 0.15,
          y: "0%",
          opacity: 1,
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
          ease: "ease-out",
        },
        "-=0.1"
      )
      .to(
        `#bubble${id}> span`,
        { duration: 0.15, y: "0%", opacity: 0.7, ease: "ease-out" },
        "-=0.1"
      )
      .to(
        "#navbarContainer",
        { duration: 0.3, backgroundColor: color, ease: "ease-in-out" },
        0
      )
      .to(
        "#bg",
        { duration: 0.3, backgroundColor: color, ease: "ease-in-out" },
        0
      )
      .to(
        "#bgBubble",
        { duration: 0.3, backgroundColor: color, ease: "ease-in-out" },
        0
      );
  }
  return (
    <>
      <div id='navbarContainer'>
        <div id='navbar'>
          <div id='bubbleWrapper'>
            <div id='bubble1' className='bubble'>
              <span className='icon'>
                <i className='fas fa-home'></i>
              </span>
            </div>
            <div id='bubble2' className='bubble'>
              <span className='icon'>
                <i className='fab fa-twitter'></i>
              </span>
            </div>
            <div id='bubble3' className='bubble'>
              <span className='icon'>
                <i className='fas fa-bell'></i>
              </span>
            </div>
            <div id='bubble4' className='bubble'>
              <span className='icon'>
                <i className='fas fa-user'></i>
              </span>
            </div>
          </div>
          <div id='menuWrapper'>
            <div
              id='menu1'
              className='menuElement'
              onClick={() => handleMenuTap("1", "50px", "#ffffff")}
            >
              <i className='fas fa-home'></i>
            </div>
            <div
              id='menu2'
              className='menuElement'
              onClick={() => handleMenuTap("2", "150px", "#ffffff")}
            >
              <i className='fab fa-twitter'></i>
            </div>
            <div
              id='menu3'
              className='menuElement'
              onClick={() => handleMenuTap("3", "250px", "#ffffff")}
            >
              <i className='fas fa-bell'></i>
            </div>
          </div>
        </div>
        <div id='bgWrapper'>
          <div id='bg'></div>
          <div id='bgBubble'></div>
        </div>
      </div>

      <svg width='0' height='0'>
        <defs>
          <filter id='goo'>
            <feGaussianBlur
              in='SourceGraphic'
              stdDeviation='20'
              result='blur'
              id='blurFilter'
            />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15'
              result='goo'
            />
            <feComposite in='SourceGraphic' in2='goo' operator='atop' />
          </filter>
        </defs>
      </svg>
    </>
  );
};
