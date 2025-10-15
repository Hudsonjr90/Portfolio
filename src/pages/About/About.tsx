import styles from "./About.module.css";
import React, { useState, useCallback, Suspense } from "react";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import about from "/imgs/home.webp";
import codegif from "/imgs/code.gif";
import { motion } from "framer-motion";

const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB")
);

const About = () => {
  const { t } = useTranslation();

  const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
  const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const setIsLoadedCallback = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isLoaded && isInView) {
      setIsHovered(true);
    }
  }, [isLoaded, isInView]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <Transition onAnimationComplete={() => {}}>
      <section className={styles.about}>
        <Suspense fallback={<div>Loading...</div>}>
          <ParticlesB />
        </Suspense>
        <div className={styles.container_img}>
          <Suspense fallback={<div>Loading image...</div>}>
            <motion.div
              initial={false}
              animate={
                isLoaded && isInView
                  ? { webkitMaskImage: visibleMask, maskImage: visibleMask }
                  : { webkitMaskImage: hiddenMask, maskImage: hiddenMask }
              }
              transition={{ duration: 1, delay: 1 }}
              viewport={{ once: true }}
              onViewportEnter={() => setIsInView(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: isLoaded && isInView ? 'pointer' : 'default' }}
            >
              <img
                src={isHovered ? codegif : about}
                alt="about_img"
                onLoad={setIsLoadedCallback}
                width="100%"
                height="auto"
                loading="eager"
                style={{
                  transition: 'opacity 0.3s ease-in-out',
                }}
              />
            </motion.div>
          </Suspense>
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
              <span>//</span>
              {t("about.title")}
              <span>Hudson Kennedy</span>
            </h2>

            <div className={styles.textContainer}>
              <p className={`${styles.aboutText} ${isExpanded ? styles.expanded : styles.collapsed}`}>
                {t("about.text")}
              </p>
              <button 
                className={styles.toggleButton}
                onClick={toggleExpanded}
                aria-label={isExpanded ? t("about.showLess") : t("about.showMore")}
              >
                {isExpanded ? t("about.showLess") : t("about.showMore")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Transition>
  );
};

export default About;
