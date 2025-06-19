import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  Suspense,
} from "react";
import { NavLink } from "react-router-dom";
import Transition from "../../components/Transition/Transition";
import { useTranslation } from "react-i18next";
import Typewriter from "typewriter-effect";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import {
  whatsappTheme,
  emailTheme,
  linkedinTheme,
  githubTheme,
} from "../../context/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import { FaWhatsapp, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import about from "/imgs/code.gif";
import myself from "/imgs/my.webp";
import { motion } from "framer-motion";
import Modal from "../../components/Modal/Modal";
import styles from "./Home.module.css";
import "atropos/css";
import { Atropos } from "atropos/react";

const ParticlesA = React.lazy(
  () => import("../../components/Particles/ParticlesA")
);
  const defaultImg = about;
  const hoverImg = myself;

const Home = React.memo(() => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentImg, setCurrentImg] = useState(defaultImg);
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
        <motion.section className={styles.home}>
          <motion.div className={styles.home_content}>
            <Suspense fallback={<div>Loading...</div>}>
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

            <motion.div className={styles.social_media}>
              <ThemeProvider theme={whatsappTheme}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 3,
                    delay: 1.2,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                      type: "spring",
                      damping: 5,
                      stiffness: 100,
                      restDelta: 0.001,
                    },
                  }}
                >
                  <NavLink
                    to="https://api.whatsapp.com/send?phone=5521969609121"
                    className={styles.whatsapp}
                    target="_blank"
                  >
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Whatsapp"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <FaWhatsapp className={styles.icon} />
                      </IconButton>
                    </Tooltip>
                  </NavLink>
                </motion.div>
              </ThemeProvider>

              <ThemeProvider theme={emailTheme}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 3,
                    delay: 1.5,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                      type: "spring",
                      damping: 5,
                      stiffness: 100,
                      restDelta: 0.001,
                    },
                  }}
                >
                  <NavLink
                    to="mailto:hudsonhugo90@gmail.com?body=Olá Hudson, podemos conversar?&subject=Contato pelo Portfólio"
                    className={styles.email}
                    target="_blank"
                  >
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Email"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <MdEmail className={styles.icon} />
                      </IconButton>
                    </Tooltip>
                  </NavLink>
                </motion.div>
              </ThemeProvider>

              <ThemeProvider theme={linkedinTheme}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 1.7,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                      type: "spring",
                      damping: 5,
                      stiffness: 100,
                      restDelta: 0.001,
                    },
                  }}
                >
                  <NavLink
                    to="https://www.linkedin.com/in/hudsonkennedyjr"
                    className={styles.linkedin}
                    target="_blank"
                  >
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Linkedin"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <FaLinkedin className={styles.icon} />
                      </IconButton>
                    </Tooltip>
                  </NavLink>
                </motion.div>
              </ThemeProvider>

              <ThemeProvider theme={githubTheme}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 3,
                    delay: 1.9,
                    ease: [0, 0.71, 0.2, 1.01],
                    scale: {
                      type: "spring",
                      damping: 5,
                      stiffness: 100,
                      restDelta: 0.001,
                    },
                  }}
                >
                  <NavLink
                    to="https://github.com/Hudsonjr90"
                    className={styles.github}
                    target="_blank"
                  >
                    <Tooltip
                      TransitionComponent={Zoom}
                      title="Github"
                      placement="top"
                      arrow
                    >
                      <IconButton>
                        <FaGithub className={styles.icon} />
                      </IconButton>
                    </Tooltip>
                  </NavLink>
                </motion.div>
              </ThemeProvider>
            </motion.div>

            <motion.div className={styles.btn_box}>
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
            onHoverStart={() => setCurrentImg(hoverImg)}
            onHoverEnd={() => setCurrentImg(defaultImg)}
          >
            <Atropos shadow={false} highlight={false}>
              <img src={currentImg} alt="home_img" loading="eager" />
            </Atropos>
          </motion.div>
        </motion.section>
        <motion.div
          className={styles.footer}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          whileHover={{ scale: 1.2 }}
          transition={{
            duration: 2,
            delay: 0.7,
            ease: [0.2, 0, 0.2, 1],
          }}
        >
          © 2025 H.K DEV
        </motion.div>
      </Transition>
      <Modal show={showModal} onClose={handleCloseModal} />
    </>
  );
});

export default Home;
