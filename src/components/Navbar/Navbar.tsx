import { useState, useEffect } from 'react'
import { useResponsiveNavbar } from '../../hooks/useResponsiveNavbar'
import { NavLink } from 'react-router-dom'
import { FaMoon, FaSun, FaPalette } from 'react-icons/fa6'
import styles from './Navbar.module.css'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { useAudio } from '../../hooks/useAudio'
import { Us, Fr, Br, Es, It } from 'react-flags-select'
import { motion } from 'framer-motion'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const { handleAudio } = useAudio()

  const [lightMode, setLightMode] = useState<boolean>(false)
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [paletteInputInvisible, setPaletteInputInvisible] =
    useState<boolean>(false)
  const [currentLanguage, setCurrentLanguage] = useState<string>('pt')
  const [SidebarOpen, setSidebarOpen] = useState(false)

  const { mainColor, setMainColor } = useTheme()
  const { handleClickButton, handleLinkClick, showMenu } = useResponsiveNavbar()

  const handleToggleLightMode = () => {
    setLightMode(!lightMode)
    setPaletteInputInvisible(!lightMode)
  }

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add('light_mode')
      setMainColor('#dc2626')
    } else {
      document.body.classList.remove('light_mode')
      setMainColor('#0ef')
      setTimeout(() => {
        document.body.style.transition = 'background-color 1.5s, color 1.5s'
      }, 1500)
    }
  }, [lightMode])

  const handlePaletteToggle = () => {
    setPaletteOpen(!paletteOpen)
  }

  const handleColorSelection = (color: string) => {
    setSelectedColor(color)
  }

  useEffect(() => {
    if (selectedColor === 'ball_0') {
      document.documentElement.style.setProperty('--main_color', '#ffb703')
      setMainColor('#ffb703')
    } else if (selectedColor === 'ball_2') {
      document.documentElement.style.setProperty('--main_color', '#3a86ff')
      setMainColor('#3a86ff')
    } else if (selectedColor === 'ball_1') {
      document.documentElement.style.setProperty('--text_color', '#8ecae6')
      setMainColor(mainColor)
    } else if (selectedColor === 'ball_3') {
      document.documentElement.style.setProperty('--text_color', '#eb5e28')
      setMainColor(mainColor)
    } else if (selectedColor === 'ball_4') {
      document.documentElement.style.setProperty('--main_color', '#0ef')
      document.documentElement.style.setProperty('--text_color', '#fff')
      setMainColor('#0ef')
    }
  }, [selectedColor])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setCurrentLanguage(lng || '')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!SidebarOpen)
  }

  useEffect(() => {
    setSidebarOpen(false)
  }, [currentLanguage])

  return (
    <header className={styles.header}>
      <div className={styles.logo}>{t('home.logo')}</div>

      <nav>
        <ul
          className={`${styles.links_list} ${showMenu ? styles.active : ''}`}
          role="menu"
        >
          <li
            onClick={() => {
              handleLinkClick()
              handleAudio()
            }}
            className={`${styles.active_menu} ${
              showMenu ? styles.animation_menu : ''
            }`}
            style={{ ['--i' as string]: 0 }}
            role="none"
          >
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
              role="menuitem"
            >
              {t('menu.home')}
            </NavLink>
          </li>

          <li
            onClick={() => {
              handleLinkClick()
              handleAudio()
            }}
            className={`${styles.active_menu} ${
              showMenu ? styles.animation_menu : ''
            }`}
            style={{ ['--i' as string]: 1 }}
            role="none"
          >
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : '')}
              role="menuitem"
            >
              {t('menu.about')}
            </NavLink>
          </li>

          <li
            onClick={() => {
              handleLinkClick()
              handleAudio()
            }}
            className={`${styles.active_menu} ${
              showMenu ? styles.animation_menu : ''
            }`}
            style={{ ['--i' as string]: 1 }}
            role="none"
          >
            <NavLink
              to="/education"
              className={({ isActive }) => (isActive ? styles.active : '')}
              role="menuitem"
            >
              {t('menu.academic-education')}
            </NavLink>
          </li>

          <li
            onClick={() => {
              handleLinkClick()
              handleAudio()
            }}
            className={`${styles.active_menu} ${
              showMenu ? styles.animation_menu : ''
            }`}
            style={{ ['--i' as string]: 1 }}
            role="none"
          >
            <NavLink
              to="/testimonials"
              className={({ isActive }) => (isActive ? styles.active : '')}
              role="menuitem"
            >
              {t('menu.testimonials')}
            </NavLink>
          </li>

          <li
            onClick={() => {
              handleLinkClick()
              handleAudio()
            }}
            className={`${styles.active_menu} ${
              showMenu ? styles.animation_menu : ''
            }`}
            style={{ ['--i' as string]: 1 }}
            role="none"
          >
            <NavLink
              to="/experiences"
              className={({ isActive }) => (isActive ? styles.active : '')}
              role="menuitem"
            >
              {t('menu.experiences')}
            </NavLink>
          </li>

          <li
            onClick={() => {
              handleLinkClick()
              handleAudio()
            }}
            className={`${styles.active_menu} ${
              showMenu ? styles.animation_menu : ''
            }`}
            style={{ ['--i' as string]: 1 }}
            role="none"
          >
            <NavLink
              to="/skills"
              className={({ isActive }) => (isActive ? styles.active : '')}
              role="menuitem"
            >
              {t('menu.skills')}
            </NavLink>
          </li>

          <li
            onClick={() => {
              handleLinkClick()
              handleAudio()
            }}
            className={`${styles.active_menu} ${
              showMenu ? styles.animation_menu : ''
            }`}
            style={{ ['--i' as string]: 2 }}
            role="none"
          >
            <NavLink
              to="/portfolio"
              className={({ isActive }) => (isActive ? styles.active : '')}
              role="menuitem"
            >
              {t('menu.portfolio')}
            </NavLink>
          </li>

          <li
            onClick={() => {
              handleLinkClick()
              handleAudio()
            }}
            className={`${styles.active_menu} ${
              showMenu ? styles.animation_menu : ''
            }`}
            style={{ ['--i' as string]: 3 }}
            role="none"
          >
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : '')}
              role="menuitem"
            >
              {t('menu.contact')}
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.icons_container} id="container">
        <label>
          <input
            type="checkbox"
            className={styles.input_darc_light_mode}
            onClick={() => {
              handleToggleLightMode()
              handleAudio()
            }}
            aria-label="Alternar modo claro/escuro"
            role="switch"
          />

          <FaMoon className={styles.moon_icon} />
          <FaSun className={styles.sun_icon} />
        </label>

        <label style={{ display: paletteInputInvisible ? 'none' : '' }}>
          <input
            type="checkbox"
            className={styles.input_palette_colors}
            onClick={() => {
              handlePaletteToggle()
              handleAudio()
            }}
            aria-label="Abrir paleta de cores"
            role="switch"
          />

          <FaPalette className={styles.palette} />

          <div
            className={`${styles.toggle_palette_theme} ${
              paletteOpen ? styles.palette_open : ''
            }`}
          >
            <button
              className={`${styles.ball} ${styles.ball_0}`}
              style={{ ['--p' as string]: 1 }}
              onClick={() => handleColorSelection('ball_0')}
              aria-label="Selecionar cor 1"
              role="button"
            ></button>

            <button
              className={`${styles.ball} ${styles.ball_1}`}
              style={{ ['--p' as string]: 2 }}
              onClick={() => handleColorSelection('ball_1')}
              aria-label="Selecionar cor 2"
              role="button"
            ></button>

            <button
              className={`${styles.ball} ${styles.ball_2}`}
              style={{ ['--p' as string]: 3 }}
              onClick={() => handleColorSelection('ball_2')}
              aria-label="Selecionar cor 3"
              role="button"
            ></button>

            <button
              className={`${styles.ball} ${styles.ball_3}`}
              style={{ ['--p' as string]: 4 }}
              onClick={() => handleColorSelection('ball_3')}
              aria-label="Selecionar cor 4"
              role="button"
            ></button>

            <button
              className={`${styles.ball} ${styles.ball_4}`}
              style={{ ['--p' as string]: 5 }}
              onClick={() => handleColorSelection('ball_4')}
              aria-label="Selecionar cor 5"
              role="button"
            ></button>
          </div>
        </label>

        <div className={styles.lng_box}>
          <div className={styles.slide}>
            <button
              className={styles.lng_btn}
              onClick={() => {
                toggleSidebar()
                handleAudio()
              }}
              aria-label="Selecionar idioma"
            >
              {currentLanguage === 'pt' && <Br className={styles.flags} />}
              {currentLanguage === 'en' && <Us className={styles.flags} />}
              {currentLanguage === 'fr' && <Fr className={styles.flags} />}
              {currentLanguage === 'it' && <It className={styles.flags} />}
              {currentLanguage === 'es' && <Es className={styles.flags} />}
            </button>
            {SidebarOpen && (
              <motion.div
                className={styles.sidebar}
                initial={{ x: '80%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
              >
                <button
                  onClick={() => {
                    changeLanguage('pt')
                    handleAudio()
                  }}
                >
                  <div className={styles.flags_name}>
                    <Br className={styles.flags} />
                    <span>{t('name.br')}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    changeLanguage('en')
                    handleAudio()
                  }}
                >
                  <div className={styles.flags_name}>
                    <Us className={styles.flags} />
                    <span>{t('name.us')}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    changeLanguage('fr')
                    handleAudio()
                  }}
                >
                  <div className={styles.flags_name}>
                    <Fr className={styles.flags} />
                    <span>{t('name.fr')}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    changeLanguage('it')
                    handleAudio()
                  }}
                >
                  <div className={styles.flags_name}>
                    <It className={styles.flags} />
                    <span>{t('name.it')}</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    changeLanguage('es')
                    handleAudio()
                  }}
                >
                  <div className={styles.flags_name}>
                    <Es className={styles.flags} />
                    <span>{t('name.es')}</span>
                  </div>
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            handleClickButton()
            handleAudio()
          }}
          className={`${styles.btn_menu} ${showMenu ? styles.active : ''}`}
          role="button"
          aria-label="Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
