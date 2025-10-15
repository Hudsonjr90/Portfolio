import { useState, useEffect } from "react";
import { useResponsiveNavbar } from "../../hooks/useResponsiveNavbar";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa6";
import styles from "./Navbar.module.css";
import { useTranslation } from "react-i18next";
import { logoTheme, useTheme } from "../../context/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import { useAudio } from "../../hooks/useAudio";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { Us, Fr, Br, Es, It } from "react-flags-select";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import logoDark from "/imgs/hkdev.webp";
import logoLight from "/imgs/hkdev_light.webp";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { handleAudio, toggleSound, soundEnabled, setSoundEnabled } = useAudio();
  const { setMainColor } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightMode, setLightMode] = useState<boolean>(() => {
    const savedLightMode = localStorage.getItem("lightMode");
    return savedLightMode ? JSON.parse(savedLightMode) : false;
  });
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem("currentLanguage") || "pt";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { handleClickButton, handleLinkClick, showMenu } = useResponsiveNavbar();

  const handleToggleLightMode = () => {
    const newLightMode = !lightMode;
    setLightMode(newLightMode);
    localStorage.setItem("lightMode", JSON.stringify(newLightMode));
    setMainColor(newLightMode ? "#f65151" : "#0ef6cc");
  };

  useEffect(() => {
    document.body.classList.toggle("light_mode", lightMode);
  }, [lightMode]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem("currentLanguage", lng);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    setSidebarOpen(false);
  }, [currentLanguage]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("currentLanguage") || "pt";
    i18n.changeLanguage(savedLanguage);
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const savedSoundEnabled = localStorage.getItem("soundEnabled");
    if (savedSoundEnabled !== null) {
      setSoundEnabled(JSON.parse(savedSoundEnabled));
    }
  }, [setSoundEnabled]);

  useEffect(() => {
    localStorage.setItem("soundEnabled", JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  // Efeito de carregamento para animação sequencial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={styles.header}>
      <motion.div 
        className={styles.logo}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.1 
        }}
      >
        <ThemeProvider theme={logoTheme}>
           <NavLink 
            to="/" 
            onClick={handleAudio}
          >
            <Tooltip 
          title={t("menu.home")} 
          placement="right"
          arrow
        >
            <img
              src={lightMode ? logoLight : logoDark}
              alt="Logo"
              height="auto"
              loading="eager"
              className={styles.logo_img}
            />
          </Tooltip>
          </NavLink>       
        </ThemeProvider>
      </motion.div>

      <nav>
        <motion.ul
          className={`${styles.links_list} ${showMenu ? styles.active : ""}`}
          role="menu"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
        >
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 0 }}
            role="none"
            variants={{
              hidden: { 
                opacity: 0, 
                y: -20,
                scale: 0.8 
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : "")}
              role="menuitem"
            >
              {t("menu.about")}
            </NavLink>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 1 }}
            role="none"
            variants={{
              hidden: { 
                opacity: 0, 
                y: -20,
                scale: 0.8 
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <NavLink
              to="/education"
              className={({ isActive }) => (isActive ? styles.active : "")}
              role="menuitem"
            >
              {t("menu.academic-education")}
            </NavLink>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 2 }}
            role="none"
            variants={{
              hidden: { 
                opacity: 0, 
                y: -20,
                scale: 0.8 
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <NavLink
              to="/testimonials"
              className={({ isActive }) => (isActive ? styles.active : "")}
              role="menuitem"
            >
              {t("menu.testimonials")}
            </NavLink>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 3 }}
            role="none"
            variants={{
              hidden: { 
                opacity: 0, 
                y: -20,
                scale: 0.8 
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <NavLink
              to="/experiences"
              className={({ isActive }) => (isActive ? styles.active : "")}
              role="menuitem"
            >
              {t("menu.experiences")}
            </NavLink>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 4 }}
            role="none"
            variants={{
              hidden: { 
                opacity: 0, 
                y: -20,
                scale: 0.8 
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <NavLink
              to="/skills"
              className={({ isActive }) => (isActive ? styles.active : "")}
              role="menuitem"
            >
              {t("menu.skills")}
            </NavLink>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 5 }}
            role="none"
            variants={{
              hidden: { 
                opacity: 0, 
                y: -20,
                scale: 0.8 
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <NavLink
              to="/portfolio"
              className={({ isActive }) => (isActive ? styles.active : "")}
              role="menuitem"
            >
              {t("menu.portfolio")}
            </NavLink>
          </motion.li>
          <motion.li
            onClick={() => {
              handleLinkClick();
              handleAudio();
            }}
            className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
            style={{ ["--i" as any]: 6 }}
            role="none"
            variants={{
              hidden: { 
                opacity: 0, 
                y: -20,
                scale: 0.8 
              },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                },
              },
            }}
          >
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : "")}
              role="menuitem"
            >
              {t("menu.contact")}
            </NavLink>
          </motion.li>
        </motion.ul>
      </nav>

      <motion.div 
        className={styles.icons_container} 
        id="container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2 
        }}
      >
        <button
          onClick={toggleSound}
          className={styles.sound_icon}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>

        <label>
          <input
            type="checkbox"
            className={styles.input_dark_light_mode}
            onClick={() => {
              handleToggleLightMode();
              handleAudio();
            }}
            aria-label="Alternar modo claro/escuro"
            role="switch"
          />
          <FaMoon className={styles.moon_icon} />
          <FaSun className={styles.sun_icon} />
        </label>

        <div className={styles.lng_box}>
          <div className={styles.slide}>
            <button
              className={styles.lng_btn}
              onClick={() => {
                toggleSidebar();
                handleAudio();
              }}
              aria-label="Selecionar idioma"
            >
                {currentLanguage === "pt" && <><Br className={styles.flags} /></>}
                {currentLanguage === "en" && <><Us className={styles.flags} /></>}
                {currentLanguage === "fr" && <><Fr className={styles.flags} /></>}
                {currentLanguage === "it" && <><It className={styles.flags} /></>}
                {currentLanguage === "es" && <><Es className={styles.flags} /></>}
            </button>
            {sidebarOpen && (
              <motion.div
                className={styles.sidebar}
                initial={{ x: "80%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <button
                  onClick={() => {
                    changeLanguage("pt");
                    handleAudio();
                  }}
                >
                  <div className={styles.flags_name}>
                    <Br className={styles.flags} />
                    <span>{t("name.br")}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    changeLanguage("en");
                    handleAudio();
                  }}
                >
                  <div className={styles.flags_name}>
                    <Us className={styles.flags} />
                    <span>{t("name.us")}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    changeLanguage("fr");
                    handleAudio();
                  }}
                >
                  <div className={styles.flags_name}>
                    <Fr className={styles.flags} />
                    <span>{t("name.fr")}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    changeLanguage("it");
                    handleAudio();
                  }}
                >
                  <div className={styles.flags_name}>
                    <It className={styles.flags} />
                    <span>{t("name.it")}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    changeLanguage("es");
                    handleAudio();
                  }}
                >
                  <div className={styles.flags_name}>
                    <Es className={styles.flags} />
                    <span>{t("name.es")}</span>
                  </div>
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            handleClickButton();
            handleAudio();
          }}
          className={`${styles.btn_menu} ${showMenu ? styles.active : ""}`}
          role="button"
          aria-label="Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </motion.div>
    </header>
  );
};

export default Navbar;
