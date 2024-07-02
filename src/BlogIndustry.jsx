import { useEffect } from "react";
import ScrollMagic from "scrollmagic";
import { gsap, Power2 } from "gsap";
import "scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
ScrollMagicPluginGsap(ScrollMagic, gsap);

const ScrollMagicComponent = () => {
  useEffect(() => {
    const controller = new ScrollMagic.Controller();

    document.querySelectorAll("[data-scrollmagic]").forEach((elem) => {
      const title = elem.querySelector("h3");
      const text = elem.querySelector("p");
      const btn = elem.querySelector("a");
      // create tween
      const tl = gsap.timeline({ paused: true });
      tl.add("start")
        .fromTo(
          title,
          { y: "40px", opacity: 0 },
          { y: 0, opacity: 1, ease: Power2.easeInOut },
          "start"
        )
        .fromTo(
          text,
          { y: "60px", opacity: 0 },
          { y: 0, opacity: 1, ease: Power2.easeInOut },
          "start"
        )
        .fromTo(
          btn,
          { y: "100px", opacity: 0 },
          { y: 0, opacity: 1, ease: Power2.easeInOut },
          "start"
        );

      new ScrollMagic.Scene({
        triggerElement: elem,
        offset: 0,
      })
        .setTween(tl)
        .addTo(controller);
    });

    return () => controller.destroy(true);
  }, []);

  return (
    <div>
      <header className='header_blog'>
        <article>
          <h1>Опыт проектирования промышленных объектов</h1>
          {/* <p>Lets start showing off some magic...</p> */}
        </article>
      </header>
      <main>
        <section className='section'>
          <div className='section__left'></div>
          <div className='section__right'>
            <article data-scrollmagic>
              <h3>
                The weather started getting rough — the tiny ship was tossed.
              </h3>
              <p>
                If not for the courage of the fearless crew the Minnow would be
                lost. the Minnow would be lost? The Brady Bunch the Brady Bunch
                thats the way we all became the Brady Bunch.
              </p>
            </article>
          </div>
        </section>
        <section className='section'>
          <div className='section__left'>
            <article data-scrollmagic>
              <h3>
                Its mission — to explore strange new worlds to seek out new life
              </h3>
              <p>
                In a freak mishap Ranger 3 and its pilot Captain William Buck
                Rogers are blown out of their trajectory into an orbit which
                freezes his life support systems and returns Buck Rogers to
                Earth five-hundred years later.
              </p>
            </article>
          </div>
          <div className='section__right'></div>
        </section>
        <section className='section'>
          <div className='section__left'></div>
          <div className='section__right'>
            <article data-scrollmagic>
              <h3>
                The weather started getting rough — the tiny ship was tossed.
              </h3>
              <p>
                If not for the courage of the fearless crew the Minnow would be
                lost. the Minnow would be lost? The Brady Bunch the Brady Bunch
                thats the way we all became the Brady Bunch.
              </p>
              <a href='#' className='btn btn--ghost'>
                Подробнее
              </a>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ScrollMagicComponent;
