import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Testimonials from './pages/Testimonials/Testimonials'
import Education from './pages/Education/Education'
import Experiences from './pages/Experiences/Experiences'
import Portfolio from './pages/Portfolio/Portfolio'
import Skills from './pages/Skills/Skills'
import Contact from './pages/Contact/Contact'
import { ThemeProvider } from './context/ThemeContext'
import { I18nextProvider } from 'react-i18next'
import i18n from './config/i18n'
import { AnimatePresence } from 'framer-motion'
import { useSEO } from './hooks/useSEO'
import { useStructuredData } from './hooks/useStructuredData'
import SecurityMonitor from './components/SecurityMonitor/SecurityMonitor'
import 'devicon/devicon.min.css';


function App() {
  const location = useLocation()
  const { t } = useTranslation()
  
  useSEO()
  
  useStructuredData()

  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case '/':
          return `${t('menu.home')} | H.K Dev`
        case '/about':
          return `${t('menu.about')} | H.K Dev`
        case '/testimonials':
          return `${t('menu.testimonials')} | H.K Dev`
        case '/education':
          return `${t('menu.academic-education')} | H.K Dev`
        case '/experiences':
          return `${t('menu.experiences')} | H.K Dev`
        case '/skills':
          return `${t('menu.skills')} | H.K Dev`
        case '/portfolio':
          return `${t('menu.portfolio')} | H.K Dev`
        case '/contact':
          return `${t('menu.contact')} | H.K Dev`
        default:
          return 'H.K Dev'
      }
    }

    document.title = getPageTitle()
  }, [location.pathname, t])

  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <SecurityMonitor />
        <Navbar />
        <div className="container" id="container">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/education" element={<Education />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
      </I18nextProvider>
    </ThemeProvider>
  )
}export default App
