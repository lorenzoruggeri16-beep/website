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
import Journal from "../pages/Journal";
import Admin from "../pages/Admin";
import JournalArticle from "../pages/JournalArticle";
import ResetPassword from "../pages/ResetPassword";

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

        <Route
         path="/journal"
         element={<Journal />}
         />

        <Route
        path="/journal/:slug"
        element={<JournalArticle />}
        />

        <Route
         path="/admin"
         element={<Admin />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      </Routes>

    </AnimatePresence>
  );
}