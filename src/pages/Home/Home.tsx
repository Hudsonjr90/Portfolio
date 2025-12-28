import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  Suspense,
} from "react";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import myself from "/imgs/my.webp";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal/Modal";
import styles from "./Home.module.css";
import "atropos/css";
import { Atropos } from "atropos/react";


const ParticlesA = React.lazy(
  () => import("../../components/Particles/ParticlesA")
);

const Home = React.memo(() => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const targetText = "Hudson Kennedy";

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const typedStrings = useMemo(() => {
  const result = t("home.roles", { returnObjects: true });
  return Array.isArray(result) ? result : [];
}, [t]);

  useEffect(() => {
    const randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let currentText = "";
    let iteration = 0;

    const interval = setInterval(() => {
      if (iteration < targetText.length) {
        currentText = targetText
          .split("")
          .map((_, index) =>
            index <= iteration
              ? targetText[index]
              : randomChars[Math.floor(Math.random() * randomChars.length)]
          )
          .join("");
        setDisplayedText(currentText);
        iteration++;
      } else {
        clearInterval(interval);
        setDisplayedText(targetText);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        (prevIndex + 1) % typedStrings.length
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [typedStrings.length]);

  return (
    <>
      <Transition onAnimationComplete={() => {}}>
        <motion.section className={styles.home} data-tour="hero-section">
          <motion.div className={styles.home_content}>
            <Suspense fallback={<div>{t("home.loading")}</div>}>
              <ParticlesA />
            </Suspense>

            <motion.div
              animate={{ y: [30, 150, 10], opacity: 1, scale: 1 }}
              transition={{
                duration: 3,
                delay: 0.3,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              data-tour="name-title"
            >
              <h1 className={styles.text_reveal}>{displayedText}</h1>
            </motion.div>

            <motion.div
              animate={{ x: [30, 150, 10], opacity: 1, scale: 1 }}
              transition={{
                duration: 3,
                delay: 0.3,
                ease: [0.5, 0.71, 1, 1.5],
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              className={styles.transparent_text}
              data-tour="typewriter"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTextIndex}
                  initial={{ 
                    opacity: 0, 
                    rotateX: 90,
                    y: 50 
                  }}
                  animate={{ 
                    opacity: 1, 
                    rotateX: 0,
                    y: 0 
                  }}
                  exit={{ 
                    opacity: 0, 
                    rotateX: -90,
                    y: -50 
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                  style={{
                    transformOrigin: "center center",
                    display: "inline-block",
                    minHeight: "1.2em",
                    color: "var(--main_color)"
                  }}
                >
                  {typedStrings[currentTextIndex]}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div className={styles.btn_box} data-tour="resume-button">
              <button className={styles.btn} onClick={handleOpenModal}>
                {t("home.resume")}
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.home_img}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{
              duration: 2,
              delay: 0.7,
              ease: [0.2, 0, 0.2, 1],
            }}
            data-tour="profile-image"
          >
            <Atropos shadow={false} highlight={false}>
              <img 
                src={myself} 
                alt="Hudson Kennedy - Desenvolvedor Full Stack" 
                loading="eager"
              />
            </Atropos>
          </motion.div>
        </motion.section>
      </Transition>
      <Modal show={showModal} onClose={handleCloseModal} />
    </>
  );
});

export default Home;
