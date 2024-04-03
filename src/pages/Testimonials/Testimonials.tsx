import { SetStateAction, useEffect, useState, useCallback } from "react";
import styles from "./Testimonials.module.css";
import Transition from "../../components/Transition";
import { motion, AnimatePresence } from "framer-motion";
import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
import { wrap } from "popmotion";
import imagesServer from "../../components/data/imageServer";
import testimonialServer from "../../components/data/testimonialsServer";
import Particles from "react-tsparticles";
import { Engine, IOptions } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useTheme } from "../../context/ThemeContext";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

const Testimonials = () => {
  const { t } = useTranslation();
 

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isFlipped, setFlipped] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageClick = (data: { selected: SetStateAction<number> }) => {
    setCurrentPage(data.selected);
  };

  const pageCount = Math.ceil(testimonialServer.length / 1);
  const imageIndex = wrap(
    0,
    windowWidth > 768 ? imagesServer.desktop.length : imagesServer.mobile.length,
    currentPage
  );

  const handleMouseEnter = () => {
    setFlipped(true);
  };

  const handleMouseLeave = () => {
    setFlipped(false);
  };

  const autoChangePage = () => {
    if (!isFlipped) {
      const nextPage = (currentPage + 1) % pageCount;
      setCurrentPage(nextPage);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(autoChangePage, 5000);

    return () => clearInterval(intervalId);
  }, [currentPage, pageCount, isFlipped]);

  const particlesInit = useCallback((engine: Engine) => {
    loadFull(engine);
    return Promise.resolve();
  }, []);

  const { mainColor } = useTheme();

  const particlesConfig: RecursivePartial<IOptions> = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: mainColor,
      },
      shape: {
        type: "polygon",
        stroke: {
          width: 0,
          color: mainColor,
        },
        polygon: {
          sides: 3,
        },
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 4.872463273808071,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 4,
        direction: "top-right",
        random: false,
        straight: true,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: false,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  };

  const [soundClick, setSoundClick] = useState<boolean>(false) 

 const handleAudio = () => {
        const audio = new Audio("/sounds/button_click.mp3");

        if (soundClick) {
            audio.pause(); 
        } else {
            audio.play();
        }
    };

  return (
    <Transition onAnimationComplete={() => {}}>
      <Particles options={particlesConfig} init={particlesInit} />
      <section className={styles.testimonials}>
        <h2 className={styles.heading}>
          <span>//</span>
          {t("testimonials.title")}
          <span>{t("testimonials.text")}</span>
        </h2>
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{
            duration: 2,
            delay: 0.7,
            ease: [0.2, 0, 0.2, 1],
          }}
          className={`${styles.slider_container} ${
            isFlipped ? styles.flipped : ""
          }`}
        >
          <AnimatePresence initial={false}>
            <motion.div
              className={styles.flipContent}
              key={`${currentPage}-${testimonialServer[imageIndex].id}`}
              onMouseLeave={handleMouseLeave}
            >
              <h3>{testimonialServer[imageIndex].title}</h3>
              <p>{t(`testimonials.cards.${imageIndex}.text`)}</p>
            </motion.div>
            <motion.img
              key={`${currentPage}-${testimonialServer[imageIndex].id}-img`}
              src={
                windowWidth > 768
                  ? imagesServer.desktop[imageIndex]
                  : imagesServer.mobile[imageIndex]
              }
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`${styles.imgCard} ${
                isFlipped ? styles.flipAnimation : ""
              }`}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              onMouseEnter={handleMouseEnter}
            />
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: "80%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{
            duration: 2,
            delay: 0.3,
            ease: [0.3, 0, 0.2, 1],
          }}
        >
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            onPageChange={({ selected: selectedPage }) => {
              handlePageClick({ selected: selectedPage });
              handleAudio();
            }}
            containerClassName={styles.pagination}
            activeClassName={styles.activePage}
            forcePage={currentPage}
          />
        </motion.div>
      </section>
    </Transition>
  );
};

export default Testimonials;
