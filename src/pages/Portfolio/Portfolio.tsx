// CSS
import "./Portfolio.css";
import styles from "./Portfolio.module.css";
// HOOKS
import { useState, useEffect, useCallback } from "react";
// REACT ROUTER DOM
import { NavLink } from "react-router-dom";
// COMPONENT
import Transition from "../../components/Transition";
import { useTranslation } from "react-i18next";
import Particles from "react-tsparticles";
import { Engine, IOptions } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { useTheme } from "../../context/ThemeContext";
import portfolioServer from "../../data/portfolioServer";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

const Portfolio = () => {
  const { t } = useTranslation();

  const [slidePerview, setSlidePerview] = useState<number>(3);
  const [initialSlide] = useState<number>(3);
  const [transitionCompleted, setTransitionCompleted] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 580) {
        setSlidePerview(1);
      } else {
        setSlidePerview(3);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

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

  return (
    <Transition onAnimationComplete={() => setTransitionCompleted(true)}>
      {transitionCompleted && (
        <section className={styles.portfolio}>
          <Particles options={particlesConfig} init={particlesInit} />
          <h2 className={styles.heading}>
            <span>//</span> {t("projects.title")}{" "}
            <span>{t("projects.text")}</span>
          </h2>

          <Swiper
            className="animation-cards"
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={false}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            slidesPerView={slidePerview}
            pagination={{ clickable: true }}
            navigation
            initialSlide={initialSlide}
            autoplay={{ delay: 3000 }} 
            onSwiper={(swiper) => {
              swiper.el.onmouseover = () => {
                swiper.autoplay.stop();
              };
              swiper.el.onmouseout = () => {
                swiper.autoplay.start();
              };
            }}
          >
            {portfolioServer.map((item) => (
              <SwiperSlide key={item.id} className="teste">
                <div className={styles.portfolio_container}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.item_slide}
                  />
                  <div className={styles.portfolio_content}>
                    <h2 className={styles.name}>{item.name}</h2>
                    <p className={styles.description}>
                      {t(`projects.data.${item.id}.description`)}
                    </p>

                    <div className={styles.technologies}>
                      <h3>{t("projects.subtitle")}</h3>
                      <ul>
                        {item.technologies &&
                          item.technologies.map((tech, index) => (
                            <li key={index}>{tech}</li>
                          ))}
                      </ul>
                    </div>

                    <div className={styles.links}>
                      <NavLink
                        to={item.linkDeploy || ""}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Deploy
                      </NavLink>

                      <NavLink
                        to={item.linkRepository || ""}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Code
                      </NavLink>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </Transition>
  );
};

export default Portfolio;
