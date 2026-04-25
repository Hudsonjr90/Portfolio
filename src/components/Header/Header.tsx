import { useState, useEffect, useMemo, useRef } from "react";
import { useResponsiveNavbar } from "../../hooks/useResponsiveNavbar";
import { NavLink, useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiAtom,
  mdiMonitor,
  mdiMusic,
  mdiMusicOff,
  mdiThemeLightDark,
  mdiWeatherNight,
  mdiWeatherSunny,
} from "@mdi/js";
import { GrClose } from "react-icons/gr";
import { BiAtom } from "react-icons/bi";
import { TbAtomOff } from "react-icons/tb";
import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";
import { logoTheme, navbarTheme, ThemeMode, TooltipThemeProvider, useTheme } from "../../context/ThemeContext";
import { useParticles } from "../../context/ParticlesContext";
import { useAudio } from "../../hooks/useAudio";
import { Us, Fr, Br, Es, It } from "react-flags-select";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import logo from "/imgs/logo.webp";
import TourButton from "../TourButton/TourButton";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { handleAudio, toggleSound, soundEnabled, volume, setVolume } = useAudio();
  const { themeMode, resolvedTheme, setThemeMode } = useTheme();
  const location = useLocation();
  const { particlesEnabled, toggleParticles } = useParticles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [canHoverMenus, setCanHoverMenus] = useState(false);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => 
    window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  );
  const volumeControlRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const themeCloseTimeoutRef = useRef<number | null>(null);
  const languageCloseTimeoutRef = useRef<number | null>(null);

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

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'light' : 'dark');
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem("currentLanguage") || "pt";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { handleClickButton, handleLinkClick, showMenu } =
    useResponsiveNavbar();

  const navItems = useMemo(
    () => [
      { key: "about", path: "/about", label: t("menu.about") },
      { key: "education", path: "/education", label: t("menu.academic-education") },
      { key: "experiences", path: "/experiences", label: t("menu.experiences") },
      { key: "skills", path: "/skills", label: t("menu.skills") },
      { key: "portfolio", path: "/portfolio", label: t("menu.portfolio") },
      { key: "contact", path: "/contact", label: t("menu.contact") },
      { key: "blog", path: "/blog", label: t("menu.blog") },
    ],
    [t],
  )

  const themeOptions: Array<{ value: ThemeMode; label: string; icon: string }> = useMemo(
    () => {
      const alternativeTheme = systemTheme === 'light' ? 'dark' : 'light';
      
      return [
        { value: 'system', label: t('navbar.themeSystem'), icon: mdiMonitor },
        { 
          value: alternativeTheme, 
          label: alternativeTheme === 'light' ? t('navbar.themeLight') : t('navbar.themeDark'), 
          icon: alternativeTheme === 'light' ? mdiWeatherSunny : mdiWeatherNight 
        },
      ];
    },
    [t, systemTheme],
  )

  const currentThemeIcon = themeMode === 'system'
    ? mdiThemeLightDark
    : resolvedTheme === 'light'
      ? mdiWeatherSunny
      : mdiWeatherNight

  const getNextThemeMode = (currentMode: ThemeMode): ThemeMode => {
    if (currentMode === 'system') {
      return 'light'
    }

    if (currentMode === 'light') {
      return 'dark'
    }

    return 'system'
  }

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.slice(1)

  const languageFlag = useMemo(() => {
    switch (currentLanguage) {
      case 'en':
        return <Us className={styles.flags} />
      case 'fr':
        return <Fr className={styles.flags} />
      case 'it':
        return <It className={styles.flags} />
      case 'es':
        return <Es className={styles.flags} />
      case 'pt':
      default:
        return <Br className={styles.flags} />
    }
  }, [currentLanguage])

  const languageOptions = useMemo(
    () => [
      { value: 'pt', label: 'PT-BR', flag: <Br className={styles.flags} /> },
      { value: 'en', label: 'EN-US', flag: <Us className={styles.flags} /> },
      { value: 'fr', label: 'FR-FR', flag: <Fr className={styles.flags} /> },
      { value: 'it', label: 'IT-IT', flag: <It className={styles.flags} /> },
      { value: 'es', label: 'ES-ES', flag: <Es className={styles.flags} /> },
    ],
    [],
  )

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng);
    localStorage.setItem("currentLanguage", lng);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
    setIsThemeMenuOpen(false);
  };

  const toggleThemeMenu = () => {
    setIsThemeMenuOpen((prev) => !prev)
    setSidebarOpen(false)
  }

  useEffect(() => {
    setSidebarOpen(false);
  }, [currentLanguage]);

  useEffect(() => {
    setSidebarOpen(false)
    setIsThemeMenuOpen(false)
    setShowVolumePopup(false)
  }, [location.pathname])

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
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const updateHoverCapability = (event: MediaQueryList | MediaQueryListEvent) => {
      setCanHoverMenus(event.matches);
    };

    updateHoverCapability(mediaQuery);
    mediaQuery.addEventListener('change', updateHoverCapability);

    return () => mediaQuery.removeEventListener('change', updateHoverCapability);
  }, []);

  useEffect(() => {
    return () => {
      if (themeCloseTimeoutRef.current !== null) {
        window.clearTimeout(themeCloseTimeoutRef.current);
      }

      if (languageCloseTimeoutRef.current !== null) {
        window.clearTimeout(languageCloseTimeoutRef.current);
      }
    };
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

  const handleThemeMouseEnter = () => {
    if (!canHoverMenus) {
      return;
    }

    if (themeCloseTimeoutRef.current !== null) {
      window.clearTimeout(themeCloseTimeoutRef.current);
      themeCloseTimeoutRef.current = null;
    }

    setIsThemeMenuOpen(true);
    setSidebarOpen(false);
  };

  const handleThemeMouseLeave = () => {
    if (!canHoverMenus) {
      return;
    }

    themeCloseTimeoutRef.current = window.setTimeout(() => {
      setIsThemeMenuOpen(false);
      themeCloseTimeoutRef.current = null;
    }, 160);
  };

  const handleLanguageMouseEnter = () => {
    if (!canHoverMenus) {
      return;
    }

    if (languageCloseTimeoutRef.current !== null) {
      window.clearTimeout(languageCloseTimeoutRef.current);
      languageCloseTimeoutRef.current = null;
    }

    setSidebarOpen(true);
    setIsThemeMenuOpen(false);
  };

  const handleLanguageMouseLeave = () => {
    if (!canHoverMenus) {
      return;
    }

    languageCloseTimeoutRef.current = window.setTimeout(() => {
      setSidebarOpen(false);
      languageCloseTimeoutRef.current = null;
    }, 160);
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node

      if (themeMenuRef.current && !themeMenuRef.current.contains(target)) {
        setIsThemeMenuOpen(false)
      }

      if (languageMenuRef.current && !languageMenuRef.current.contains(target)) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

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
        <TooltipThemeProvider theme={logoTheme}>
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
        </TooltipThemeProvider>
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
                onClick={() => {
                  toggleSound();
                  handleAudio();
                }}
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

              <button
                onClick={() => {
                  setThemeMode(getNextThemeMode(themeMode));
                  handleAudio();
                }}
                className={styles.particles_icon}
                aria-label={t('navbar.theme')}
              >
                <Icon path={currentThemeIcon} size={2} />
              </button>
          </li>
          {navItems.map((item, index) => (
            <motion.li
              key={item.key}
              onClick={() => {
                handleLinkClick();
                handleAudio();
              }}
              className={`${styles.active_menu} ${showMenu ? styles.animation_menu : ""}`}
              style={{ ["--i" as any]: index }}
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
                to={item.path}
                className={({ isActive }) => (isActive ? styles.active : "")}
                role="menuitem"
              >
                {item.label}
              </NavLink>
            </motion.li>
          ))}
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
        <TooltipThemeProvider theme={navbarTheme}>
          <div
            ref={volumeControlRef}
            className={`${styles.volumeControl} ${styles.desktop_only_icon}`}
            onMouseEnter={() => setShowVolumePopup(true)}
            onMouseLeave={() => setShowVolumePopup(false)}
            data-tour="sound-toggle"
          >
            <Tooltip title={t("navbar.sound")} placement="left" arrow>
            <button
              className={styles.sound_icon}
              aria-label="Volume"
              onClick={() => {
                toggleSound();
                handleAudio();
              }}
            >
              {soundEnabled && volume > 0 ? <Icon path={mdiMusic} size={2} /> : <Icon path={mdiMusicOff} size={2} />}
            </button>
            </Tooltip>
            {showVolumePopup && (
              <div className={styles.volumePopup}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
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
              {particlesEnabled ? <Icon path={mdiAtom} size={2} /> : <TbAtomOff />}
            </button>
          </Tooltip>

          <Tooltip title={t("navbar.theme")} placement="bottom" arrow>
            <div
              className={`${styles.dropdownBox} ${styles.desktop_only_icon}`}
              ref={themeMenuRef}
              data-tour="theme-toggle"
              onMouseEnter={handleThemeMouseEnter}
              onMouseLeave={handleThemeMouseLeave}
            >
              <button
                className={styles.theme_btn}
                onClick={() => {
                  if (canHoverMenus) {
                    return;
                  }

                  toggleThemeMenu();
                  handleAudio();
                }}
                aria-label={t('navbar.theme')}
                aria-expanded={isThemeMenuOpen}
              >
                <Icon path={currentThemeIcon} size={2} />
              </button>
              {isThemeMenuOpen && (
                <motion.div
                  className={`${styles.dropdownPanel} ${styles.themePanel}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <div className={styles.dropdownHeader}>
                    <span>{t('navbar.theme')}</span>
                    <strong>{themeOptions.find((option) => option.value === themeMode)?.label}</strong>
                  </div>
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`${styles.dropdownAction} ${themeMode === option.value ? styles.dropdownActionActive : ''}`}
                      onClick={() => {
                        setThemeMode(option.value)
                        setIsThemeMenuOpen(false)
                        handleAudio()
                      }}
                    >
                      <span className={styles.dropdownActionIcon}>
                        <Icon path={option.icon} size={1} />
                      </span>
                      <span>{option.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </Tooltip>

           <TourButton currentPage={currentPage} className={styles.tour_button_desktop} />

          <Tooltip title={t("navbar.language")} placement="right" arrow>
            <div
              className={styles.lng_box}
              ref={languageMenuRef}
              data-tour="language-toggle"
              onMouseEnter={handleLanguageMouseEnter}
              onMouseLeave={handleLanguageMouseLeave}
            >
              <div className={styles.slide}>
                <button
                  className={styles.lng_btn}
                  onClick={() => {
                    if (canHoverMenus) {
                      return;
                    }

                    toggleSidebar();
                    handleAudio();
                  }}
                  aria-label="Selecionar idioma"
                  aria-expanded={sidebarOpen}
                >
                  {languageFlag}
                </button>
                {sidebarOpen && (
                  <motion.div
                    className={styles.sidebar}
                    initial={{ x: "80%" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 120 }}
                  >
                    {languageOptions.map((language) => (
                      <button
                        key={language.value}
                        onClick={() => {
                          changeLanguage(language.value)
                          handleAudio()
                        }}
                      >
                        <div className={styles.flags_name}>
                          {language.flag}
                          <span>{language.label}</span>
                        </div>
                      </button>
                    ))}
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
        </TooltipThemeProvider>
      </motion.div>
    </header>
  );
};

export default Header;
