import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  Suspense,
} from "react";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";
import myself from "/imgs/home-v.webp";
import { motion } from "framer-motion";
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
  const targetText = "Hudson Kennedy";

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const typedStrings = useMemo(() => {
    return [
      t("home.function1"),
      t("home.function2"),
      t("home.function3"),
      t("home.function4"),
    ];
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
    }, 400);

    return () => clearInterval(interval);
  }, []);

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
              <Typewriter
                options={{
                  strings: typedStrings,
                  autoStart: true,
                  loop: true,
                  delay: 40,
                  deleteSpeed: 30,
                }}
              />
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
