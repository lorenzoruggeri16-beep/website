import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import Home from "../pages/Home";
import Portfolio from "../pages/Portfolio";
import PortfolioDetail from "../pages/PortfolioDetail";
import About from "../pages/About";
import Contact from "../pages/Contact";

export default function AppRouter() {

  const location = useLocation();

  return (
    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        <Route path="/" element={<Home />} />

        <Route
          path="/portfolio"
          element={<Portfolio />}
        />

        <Route
          path="/portfolio/:slug"
          element={<PortfolioDetail />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

      </Routes>

    </AnimatePresence>
  );
}