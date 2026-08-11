import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  lazy,
  Suspense,
} from "react";

import Loader from "../components/ui/Loader";

import { AnimatePresence } from "framer-motion";

const Home =
  lazy(() =>
    import("../pages/Home")
  );

const Portfolio =
  lazy(() =>
    import("../pages/Portfolio")
  );

const PortfolioDetail =
  lazy(() =>
    import("../pages/PortfolioDetail")
  );

const About =
  lazy(() =>
    import("../pages/About")
  );

const Contact =
  lazy(() =>
    import("../pages/Contact")
  );

const Journal =
  lazy(() =>
    import("../pages/Journal")
  );

const Admin =
  lazy(() =>
    import("../pages/Admin")
  );

const JournalArticle =
  lazy(() =>
    import("../pages/JournalArticle")
  );

const NotFound =
  lazy(() =>
    import("../pages/NotFound")
  );

const ResetPassword =
  lazy(() =>
    import("../pages/ResetPassword")
  );

const BookingConfirmed =
  lazy(() =>
    import("../pages/BookingConfirmed")
  );

export default function AppRouter() {

  const location =
    useLocation();

  return (

    <AnimatePresence mode="wait">

      <Suspense
        fallback={<Loader />}
      >

        <Routes
          location={location}
          key={location.pathname}
        >

          <Route
            path="/"
            element={<Home />}
          />

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
            path="/studio-control"
            element={<Admin />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="/booking-confirmed"
            element={<BookingConfirmed />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </Suspense>

    </AnimatePresence>

  );

}