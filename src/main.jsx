import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Lenis from "lenis";

import App from "./App";

import "./index.css";
import "./i18n";

const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <HelmetProvider>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </HelmetProvider>

  </React.StrictMode>

);