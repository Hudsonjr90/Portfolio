// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { debounce, throttle } from "./utils";

// Função para inicializar o Web Worker
function initWorker() {
  const worker = new Worker(new URL("./worker.ts", import.meta.url));

  worker.postMessage({ task: "processData", data: [1, 2, 3, 4, 5] });

  worker.onmessage = function (event: MessageEvent) {
    console.log("Result:", event.data);
  };
}

// Exemplo de uso de debounce e throttle
const handleResize = debounce(() => {
  console.log("Window resized");
}, 200);

const handleScroll = throttle(() => {
  console.log("Window scrolled");
}, 200);

window.addEventListener("resize", handleResize);
window.addEventListener("scroll", handleScroll);

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );

  // Inicializa o Web Worker
  initWorker();
}
