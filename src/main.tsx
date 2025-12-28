import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import './styles/tour.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { initializeTrustedTypes } from './utils/security'
import setupLocatorUI from "@locator/runtime";

if (import.meta.env.DEV) {
  setupLocatorUI();
}

initializeTrustedTypes();

const rootElement = document.getElementById("root")

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </React.StrictMode>,
  )
}

