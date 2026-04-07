import styles from "./About.module.css";
import React, { useState, useEffect, useMemo, Suspense } from "react";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaUserAstronaut } from "react-icons/fa6";

const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB")
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
            {t("about.title")} <span>Hudson Kennedy ? <FaUserAstronaut /></span>
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
