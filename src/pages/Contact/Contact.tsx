import React, { Suspense, useState, useEffect } from "react";
import styles from "./Contact.module.css";
import { useTranslation } from "react-i18next";
import Transition from "../../components/Transition/Transition";
import LocationMap from "../../components/LocationMap/LocationMap";
import { FaHeadset } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import {
  whatsappTheme,
  emailTheme,
  linkedinTheme,
  githubTheme,
} from "../../context/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import { FaWhatsapp, FaLinkedin, FaGithub, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import IconButton from "@mui/material/IconButton";

const ParticlesB = React.lazy(
  () => import("../../components/Particles/ParticlesB")
);

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMapView = () => {
    setShowMap(!showMap);
  };
  return (
    <Transition onAnimationComplete={() => {}}>
      <Suspense fallback={<div>{t("home.loading")}</div>}>
        <ParticlesB />
      </Suspense>
      <section className={styles.contact}>
        <h2 className={styles.heading}>
          {t("contact.title")}
          <span>
            {t("contact.text")} <FaHeadset />{" "}
          </span>
        <motion.div
          className={styles.social_media}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.5,
                rotate: -45,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 8,
                },
              },
            }}
          >
            <ThemeProvider theme={whatsappTheme}>
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
            </ThemeProvider>
          </motion.div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.5,
                rotate: -45,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 8,
                },
              },
            }}
          >
            <ThemeProvider theme={emailTheme}>
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
            </ThemeProvider>
          </motion.div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.5,
                rotate: -45,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 8,
                },
              },
            }}
          >
            <ThemeProvider theme={linkedinTheme}>
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
            </ThemeProvider>
          </motion.div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.5,
                rotate: -45,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 8,
                },
              },
            }}
          >
            <ThemeProvider theme={githubTheme}>
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
            </ThemeProvider>
          </motion.div>
        </motion.div>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.2,
            ease: "easeOut",
          }}
          className={styles.contentContainer}
        >
          {/* Seção do Formulário */}
          <div 
            className={`${styles.formSection} ${isMobile && showMap ? styles.hidden : ''}`}
          >
            <h3 className={styles.formTitle}>
              {t("contact.formTitle")}
            </h3>
            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={styles.input}
                  placeholder={t("contact.namePlaceholder")}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  {t("contact.emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder={t("contact.emailPlaceholder")}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  {t("contact.subjectLabel")}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={styles.input}
                  placeholder={t("contact.subjectPlaceholder")}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className={styles.textarea}
                  placeholder={t("contact.messagePlaceholder")}
                  required
                ></textarea>
              </div>

              <button type="submit" className={styles.submitButton}>
                {t("contact.sendButton")}
              </button>
            </form>
            
            {/* Botão para ver localização - apenas no mobile */}
            {isMobile && (
              <motion.button
                className={styles.locationButton}
                onClick={toggleMapView}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaMapMarkerAlt />
                {t('contact.location.view')}
              </motion.button>
            )}
          </div>

          {/* Seção do Mapa */}
          <div 
            className={`${styles.mapSection} ${isMobile && !showMap ? styles.hidden : ''}`}
          >
            <div className={styles.mapHeader}>
              <h3 className={styles.mapTitle}>
                {t("contact.locationTitle")}
              </h3>
              {/* Botão para fechar mapa - apenas no mobile */}
              {isMobile && (
                <motion.button
                  className={styles.closeMapButton}
                  onClick={toggleMapView}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              )}
            </div>
            <LocationMap height={400} isVisible={!isMobile || showMap} />
          </div>
        </motion.div>
      </section>
    </Transition>
  );
};

export default Contact;
