// CSS
import './App.css'
// REACT ROUTER DOM
import { Routes, Route, useLocation } from 'react-router-dom'
// COMPONENTS
import Navbar from './components/Navbar'
// PAGES
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Testimonials from './pages/Testimonials/Testimonials'
import Education from './pages/Education/Education'
import Experiences from './pages/Experiences/Experiences'
import Portfolio from './pages/Portfolio/Portfolio'
import Skills from './pages/Skills/Skills'
import Contact from './pages/Contact/Contact'
// CONTEXT
import { ThemeProvider } from './context/ThemeContext'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'
// FRAMER MOTION
import { AnimatePresence } from 'framer-motion'

function App() {
  const location = useLocation()
  return (
    <>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
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
        </I18nextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
