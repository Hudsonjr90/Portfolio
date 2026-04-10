import { useState, useEffect, useRef } from "react";
import { useResponsiveNavbar } from "../../hooks/useResponsiveNavbar";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiMusic, mdiMusicOff, mdiAtom } from "@mdi/js";
import { GrClose } from "react-icons/gr";
import { BiAtom } from "react-icons/bi";
import { TbAtomOff } from "react-icons/tb";
import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";
import { logoTheme, navbarTheme } from "../../context/ThemeContext";
import { useParticles } from "../../context/ParticlesContext";
import { ThemeProvider } from "@mui/material/styles";
import { useAudio } from "../../hooks/useAudio";
import { Us, Fr, Br, Es, It } from "react-flags-select";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import logo from "/imgs/logo.webp";
import TourButton from "../TourButton/TourButton";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { handleAudio, toggleSound, soundEnabled, volume, setVolume } = useAudio();
  const location = useLocation();
  const { particlesEnabled, toggleParticles } = useParticles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const volumeControlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = volumeControlRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setVolume(Math.min(100, Math.max(0, volume + (e.deltaY < 0 ? 5 : -5))));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [volume, setVolume]);
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem("currentLanguage") || "pt";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { handleClickButton, handleLinkClick, showMenu } =
    useResponsiveNavbar();


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
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  return (
    <header className={styles.header} data-tour="navbar">
      <motion.div
        className={styles.logo}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.1,
        }}
      >
        <ThemeProvider theme={logoTheme}>
          <NavLink to="/" onClick={handleAudio}>
            <Tooltip title={location.pathname === "/" ? "" : t("menu.home")} placement="right" arrow>
              <img
                src={logo}
                alt="Logo"
                width="80"
                height="80"
                loading="eager"
                className={styles.logo_img}
                aria-label={t("menu.home")}
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
          {showMenu && (
            <li className={styles.drawer_close_item}>
              <button
                className={styles.drawer_close_btn}
                onClick={() => { handleClickButton(); handleAudio(); }}
                aria-label="Fechar menu"
              >
                <GrClose />
              </button>
            </li>
          )}
          <li className={styles.mobile_drawer_actions}>
            <button
              onClick={toggleSound}
              className={styles.sound_icon}
              aria-label="Toggle Sound"
            >
              {soundEnabled && volume > 0 ? <Icon path={mdiMusic} size={2} /> : <Icon path={mdiMusicOff} size={2} />}
            </button>

            <button
              onClick={() => {
                toggleParticles();
                handleAudio();
              }}
              className={styles.particles_icon}
              aria-label="Toggle Particles"
            >
              {particlesEnabled ? <BiAtom /> : <TbAtomOff />}
            </button>

          </li>
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
                scale: 0.8,
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
                scale: 0.8,
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
                scale: 0.8,
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
            style={{ ["--i" as any]: 3 }}
            role="none"
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
                scale: 0.8,
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
            style={{ ["--i" as any]: 4 }}
            role="none"
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
                scale: 0.8,
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
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : "")}
              role="menuitem"
            >
              {t("menu.contact")}
            </NavLink>
          </motion.li>
        </motion.ul>
      </nav>

      {showMenu && (
        <div className={styles.drawer_overlay} onClick={handleClickButton} />
      )}

      <motion.div
        className={styles.icons_container}
        id="container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          delay: 0.2,
        }}
      >
        <ThemeProvider theme={navbarTheme}>
 
            <TourButton currentPage={location.pathname === '/' ? 'home' : location.pathname.slice(1)} className={styles.tour_button_desktop} />

          <div
            ref={volumeControlRef}
            className={`${styles.volumeControl} ${styles.desktop_only_icon}`}
            onMouseEnter={() => setShowVolumePopup(true)}
            onMouseLeave={() => setShowVolumePopup(false)}
            data-tour="sound-toggle"
          >
            <button
              className={styles.sound_icon}
              aria-label="Volume"
            >
              {soundEnabled && volume > 0 ? <Icon path={mdiMusic} size={2} /> : <Icon path={mdiMusicOff} size={2} />}
            </button>
            {showVolumePopup && (
              <div className={styles.volumePopup}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className={styles.volumeSlider}
                  style={{ '--val': `${volume}%` } as React.CSSProperties}
                  aria-label="Volume"
                />
                <span className={styles.volumeValue}>{volume}%</span>
              </div>
            )}
          </div>

          <Tooltip title={t("navbar.effect")} placement="bottom" arrow>
            <button
              onClick={() => {
                toggleParticles();
                handleAudio();
              }}
              className={`${styles.particles_icon} ${styles.desktop_only_icon}`}
              aria-label="Toggle Particles"
              data-tour="particles-toggle"
            >
              {particlesEnabled ? <Icon path={mdiAtom} size={2}/> : <TbAtomOff />}
            </button>
          </Tooltip>

          <Tooltip title={t("navbar.language")} placement="right" arrow>
            <div className={styles.lng_box} data-tour="language-toggle">
              <div className={styles.slide}>
                <button
                  className={styles.lng_btn}
                  onClick={() => {
                    toggleSidebar();
                    handleAudio();
                  }}
                  aria-label="Selecionar idioma"
                >
                  {currentLanguage === "pt" && (
                    <>
                      <Br className={styles.flags} />
                    </>
                  )}
                  {currentLanguage === "en" && (
                    <>
                      <Us className={styles.flags} />
                    </>
                  )}
                  {currentLanguage === "fr" && (
                    <>
                      <Fr className={styles.flags} />
                    </>
                  )}
                  {currentLanguage === "it" && (
                    <>
                      <It className={styles.flags} />
                    </>
                  )}
                  {currentLanguage === "es" && (
                    <>
                      <Es className={styles.flags} />
                    </>
                  )}
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
                        <span>PT-BR</span>
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
                        <span>EN-US</span>
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
                        <span>FR-FR</span>
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
                        <span>IT-IT</span>
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
                        <span>ES-ES</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </Tooltip>

          <Tooltip title={t("menu.home")} placement="bottom" arrow>
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
          </Tooltip>
        </ThemeProvider>
      </motion.div>
    </header>
  );
};

export default Header;
