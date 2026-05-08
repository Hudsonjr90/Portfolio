import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import React from 'react'
import Header from './components/Header/Header'
import AccessibilityPanel from './components/AccessibilityPanel'
const Home = React.lazy(() => import('./pages/Home/Home'))
const About = React.lazy(() => import('./pages/About/About'))
const Education = React.lazy(() => import('./pages/Education/Education'))
const Experiences = React.lazy(() => import('./pages/Experiences/Experiences'))
const Portfolio = React.lazy(() => import('./pages/Portfolio/Portfolio'))
const Blog = React.lazy(() => import('./pages/Blog/Blog'))
const BlogDetail = React.lazy(() => import('./pages/BlogDetail/BlogDetail'))
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

  return (
    <ThemeProvider>
      <ParticlesProvider>
        <I18nextProvider i18n={i18n}>
          <SecurityMonitor />
          <Header />
          <AccessibilityPanel />
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
                  <Route path="/education" element={<Education />} />
                  <Route path="/experiences" element={<Experiences />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:postId" element={<BlogDetail />} />
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
