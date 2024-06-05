import { useEffect, useRef, useState } from "react";

const LazyImage = (src, className) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = src;
            img.onload = () => setIsLoaded(true);
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      alt=' '
      className={className}
      style={{ display: isLoaded ? "block" : "none" }}
    />
  );
};

export default LazyImage;
