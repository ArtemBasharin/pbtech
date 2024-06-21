import { useEffect } from "react";

const SmoothScrollComponent = () => {
  useEffect(() => {
    const handleSmoothScroll = (event) => {
      const { pathname, hostname, hash } = event.currentTarget;

      if (
        window.location.pathname.replace(/^\//, "") ===
          pathname.replace(/^\//, "") ||
        window.location.hostname === hostname
      ) {
        let target = document.querySelector(hash);
        if (!target) {
          target = document.querySelector(`[name='${hash.slice(1)}']`);
        }
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          });
          event.preventDefault();
        }
      }
    };

    const links = document.querySelectorAll('a[href*="#"]:not([href="#"])');
    links.forEach((link) => link.addEventListener("click", handleSmoothScroll));

    return () => {
      links.forEach((link) =>
        link.removeEventListener("click", handleSmoothScroll)
      );
    };
  }, []);

  return null;
};

export default SmoothScrollComponent;
