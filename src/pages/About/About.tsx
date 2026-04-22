import styles from "./About.module.css";
import React, { useState, useEffect, useMemo, Suspense } from "react";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../../assets/about.json";

const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB"),
);

const About = () => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const aboutText = t("about.text");

  const rainWords = useMemo(() => {
    return aboutText
      .split(/\s+/)
      .map((word) => word.trim())
      .filter(Boolean);
  }, [aboutText]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.about} data-tour="about-section">
        <Suspense fallback={<div>{t("home.loading")}</div>}>
          <ParticlesB />
        </Suspense>

        <div className={styles.container_lottie} data-tour="about-image">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 60,
              rotate: -8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotate: 0,
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.05,
              rotate: 2,
            }}
            className={styles.lottieMotion}
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Lottie animationData={animationData} loop={true} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={styles.about_content}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.6,
            ease: [0.2, 0, 0.2, 1],
          }}
          data-tour="about-content"
        >
          <h2>
            {t("about.title")} <span>Hudson Kennedy ?</span>
          </h2>

          <div className={styles.textContainer}>
            {isMobile ? (
              <p className={styles.aboutText}>{aboutText}</p>
            ) : (
              <motion.p
                className={`${styles.aboutText} ${styles.rainText}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.03,
                      delayChildren: 0.15,
                    },
                  },
                }}
              >
                {rainWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    className={styles.rainWord}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: -28,
                        filter: "blur(4px)",
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: {
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>
            )}
          </div>
        </motion.div>
      </section>
    </Transition>
  );
};

export default About;
