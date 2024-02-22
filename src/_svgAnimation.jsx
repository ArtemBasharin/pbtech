import { useRef, useEffect } from "react";
import KUTE from "kute.js";
import svg1 from "../images/svg/bg_living_horiz.svg";
import svg2 from "../images/svg/bg_living_horiz2.svg";

const MorphAnimation = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svgElem = svgRef.current;

    svgElem &&
      fetch(svg1)
        .then((res) => res.text())
        .then((data) => {
          const svg1Content = new DOMParser()
            .parseFromString(data, "image/svg+xml")
            .querySelector("svg");
          const paths1 = svg1Content.querySelectorAll("path");

          fetch(svg2)
            .then((res) => res.text())
            .then((data) => {
              const svg2Content = new DOMParser()
                .parseFromString(data, "image/svg+xml")
                .querySelector("svg");
              const paths2 = svg2Content.querySelectorAll("path");

              paths1.forEach((path, index) => {
                const fromPath = path.getAttribute("d");
                const toPath = paths2[index].getAttribute("d");

                KUTE.fromTo(
                  path,
                  { path: fromPath },
                  { path: toPath },
                  { duration: 1000 }
                ).start();
              });
            });
        });
  }, []);

  return <svg ref={svgRef} width='200' height='200'></svg>;
};

export default MorphAnimation;
