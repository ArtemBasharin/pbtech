import { useEffect, useRef } from "react";

const BlogIndustry = () => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const scrollAnimateRef = useRef(null);
  const scrollAnimateMainRef = useRef(null);

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const footerElement = footerRef.current;
    const contentElement = contentRef.current;
    const scrollAnimateElement = scrollAnimateRef.current;
    const scrollAnimateMainElement = scrollAnimateMainRef.current;
    const headerElement = headerRef.current;

    const footerHeight = footerElement.offsetHeight;
    const heightDocument =
      windowHeight + contentElement.offsetHeight + footerHeight - 20;

    scrollAnimateElement.style.height = `${heightDocument}px`;
    scrollAnimateMainElement.style.height = `${heightDocument}px`;

    headerElement.style.height = `${windowHeight}px`;
    headerElement.style.lineHeight = `${windowHeight}px`;

    document.querySelector(".wrapper-parallax").style.marginTop =
      `${windowHeight}px`;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      scrollAnimateMainElement.style.top = `-${scrollY}px`;
      headerElement.style.backgroundPositionY = `${50 - (scrollY * 100) / heightDocument}%`;

      if (scrollY >= footerHeight) {
        footerElement.style.bottom = "0px";
      } else {
        footerElement.style.bottom = `-${footerHeight}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id='scroll-animate' ref={scrollAnimateRef}>
      <div id='scroll-animate-main' ref={scrollAnimateMainRef}>
        <div className='wrapper-parallax'>
          <header ref={headerRef} className='blog_header'>
            <h1>Header</h1>
          </header>
          <section className='blog_content' ref={contentRef}>
            <h1>Content</h1>
          </section>
          <footer ref={footerRef} className='blog_footer'>
            <h1>Footer</h1>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default BlogIndustry;
