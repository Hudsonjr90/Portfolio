import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import React from 'react'
import Header from './components/Header/Header'
const Home = React.lazy(() => import('./pages/Home/Home'))
const About = React.lazy(() => import('./pages/About/About'))
const Testimonials = React.lazy(() => import('./pages/Testimonials/Testimonials'))
const Education = React.lazy(() => import('./pages/Education/Education'))
const Experiences = React.lazy(() => import('./pages/Experiences/Experiences'))
const Portfolio = React.lazy(() => import('./pages/Portfolio/Portfolio'))
const Skills = React.lazy(() => import('./pages/Skills/Skills'))
const Contact = React.lazy(() => import('./pages/Contact/Contact'))
import { ThemeProvider } from './context/ThemeContext'
import { ParticlesProvider } from './context/ParticlesContext'
import { I18nextProvider } from 'react-i18next'
import i18n from './config/i18n'
import { AnimatePresence } from 'framer-motion'
import { useSEO } from './hooks/useSEO'
import { useStructuredData } from './hooks/useStructuredData'
import { usePerformanceMonitoring, useResourceLoading } from './hooks/usePerformanceMonitoring'
import SecurityMonitor from './components/SecurityMonitor/SecurityMonitor'
import 'devicon/devicon.min.css';


function App() {
  const location = useLocation()
  const { t } = useTranslation()
  
  useSEO()
  
  useStructuredData()

  usePerformanceMonitoring((metrics) => {
    if (process.env.NODE_ENV === 'production') {

      console.log('Performance metrics:', metrics);
    }
  })
  
  useResourceLoading()

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
      <ParticlesProvider>
        <I18nextProvider i18n={i18n}>
          <SecurityMonitor />
          <Header />
          <div className="container" id="container">
            <AnimatePresence mode="wait">
              <Suspense fallback={
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: '50vh',
                  color: 'var(--main_color)' 
                }}>
                  {t("home.loading")}
                </div>
              }>
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
              </Suspense>
            </AnimatePresence>
          </div>
        </I18nextProvider>
      </ParticlesProvider>
    </ThemeProvider>
  )
}

export default App
