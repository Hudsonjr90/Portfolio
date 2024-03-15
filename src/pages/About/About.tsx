// CSS
import styles from "./About.module.css";
// COMPONENT
import Transition from "../../components/Transition";
import Particles from "react-tsparticles";
import { Engine, IOptions } from 'tsparticles-engine';
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { loadFull } from "tsparticles";
import { useTheme } from "../../context/ThemeContext";
// IMAGENS
import About_img from "/imgs/hudson.png";
// FRAMER MOTION
import { motion } from "framer-motion";


type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
      ? RecursivePartial<U>[]
      : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

const About = () => {
  const { t } = useTranslation();

  const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
  const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const particlesInit = useCallback((engine: Engine) => {
    loadFull(engine)
    return Promise.resolve();
}, []);

 const {mainColor} = useTheme(); 

  const particlesConfig: RecursivePartial<IOptions> = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: mainColor
      },
      shape: {
        type: "polygon",
        stroke: {
          width: 0,
          color: mainColor
        },
        polygon: {
          sides: 3
        }
      },
      opacity: {
        value: 1,
        random: true,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 4.872463273808071,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: false,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 4,
        direction: "top-right",
        random: false,
        straight: true,
        out_mode: "out",
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 }
      }
    },
    interactivity: {
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        },
        onclick: {
          enable: false,
          mode: "push"
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 150,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  }

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.about}>
      <Particles
                options={particlesConfig}
                init={particlesInit}
            />
        <div className={styles.container_img}>
          <motion.div
            initial={false}
            animate={
              isLoaded && isInView
                ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
            }
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => setIsInView(true)}
          >
            <img
              src={About_img}
              alt="about_img"
              onLoad={() => setIsLoaded(true)}
            />
          </motion.div>
        </div>

        <div>
          <motion.div
            className={styles.about_content}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.2, 0, 0.2, 1],
            }}
          >
            <h2>
              <span>//</span>{t("about.title")}<span>Hudson Kennedy</span>
            </h2>

            <p>
              {t("about.text")}
            </p>
          </motion.div>
        </div>
      </section>
    </Transition>
  );
};

export default About;
