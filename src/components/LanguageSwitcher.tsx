import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Us, Fr, Br, Es, It } from 'react-flags-select'
import styles from './LanguageSwitcher.module.css'
import { motion } from 'framer-motion'

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const [soundClick, setSoundClick] = useState<boolean>(false)
  const [currentLanguage, setCurrentLanguage] = useState<string>('pt')
  const [SidebarOpen, setSidebarOpen] = useState(false)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setCurrentLanguage(lng || '')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!SidebarOpen)
  }

  const handleAudio = () => {
    const audio = new Audio('/sounds/button_click.mp3')

    if (soundClick) {
      audio.pause()
      setSoundClick(false)
    } else {
      audio.play()
    }
  }

  useEffect(() => {
    setSidebarOpen(false)
  }, [currentLanguage])

  return (
    <div className={styles.lng_box}>
      <div className={styles.slide}>
        <button
          className={styles.lng_btn}
          onClick={() => {
            toggleSidebar()
            handleAudio()
          }}
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
  )
}

export default LanguageSwitcher
