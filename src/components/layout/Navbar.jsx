import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const location = useLocation();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLanguageOpen(false);
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      setDarkMode(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setDarkMode(window.scrollY > heroHeight);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);

  const closeMenus = () => {
    setOpen(false);
    setLanguageOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 transition-all duration-500 ${
          darkMode
            ? "text-black bg-[#f8f6f2]/80 backdrop-blur-md"
            : "text-white bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-4">
          <img
            src={
              darkMode
                ? "/images/logo-black.png"
                : "/images/logo-white.png"
            }
            alt="Golden Light Studio"
            className="h-10 w-auto"
          />

          <span className="uppercase tracking-[0.35em] text-lg">
            Golden Light Studio
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 uppercase text-xs tracking-[0.25em]">
          <Link
            to="/portfolio"
            onClick={() => setLanguageOpen(false)}
            className="hover:opacity-60 transition"
          >
            {t("portfolio")}
          </Link>

          <Link
            to="/journal"
            onClick={() => setLanguageOpen(false)}
            className="hover:opacity-60 transition"
          >
            {t("journal")}
          </Link>

          <Link
            to="/about"
            onClick={() => setLanguageOpen(false)}
            className="hover:opacity-60 transition"
          >
            {t("about")}
          </Link>

          <Link
            to="/contact"
            onClick={() => setLanguageOpen(false)}
            className="hover:opacity-60 transition"
          >
            {t("contact")}
          </Link>

          <div className="relative">
            <button
              onClick={() =>
                setLanguageOpen(!languageOpen)
              }
              className="
                text-lg
                hover:opacity-70
                transition-all
                duration-300
              "
            >
              {i18n.language === "es" && "🇪🇸"}
              {i18n.language === "it" && "🇮🇹"}
              {i18n.language === "en" && "🇬🇧"}
            </button>

            {languageOpen && (
              <div
                className="
                  absolute
                  top-10
                  right-0
                  min-w-[180px]
                  bg-white
                  text-black
                  border
                  border-black/10
                  shadow-xl
                  overflow-hidden
                "
              >
                <button
                  onClick={() =>
                    changeLanguage("es")
                  }
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    hover:bg-black
                    hover:text-white
                    transition
                  "
                >
                  🇪🇸 Español
                </button>

                <button
                  onClick={() =>
                    changeLanguage("it")
                  }
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    hover:bg-black
                    hover:text-white
                    transition
                  "
                >
                  🇮🇹 Italiano
                </button>

                <button
                  onClick={() =>
                    changeLanguage("en")
                  }
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    hover:bg-black
                    hover:text-white
                    transition
                  "
                >
                  🇬🇧 English
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-[#111] z-[100] text-white flex flex-col">
          <div className="flex justify-between items-center px-6 py-8">
            <h2 className="uppercase tracking-[0.35em] text-lg">
              Golden Light
            </h2>

            <button onClick={() => setOpen(false)}>
              <X size={30} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center gap-10 text-4xl font-light">
            <Link to="/" onClick={closeMenus}>
              {t("home")}
            </Link>

            <Link
              to="/portfolio"
              onClick={closeMenus}
            >
              {t("portfolio")}
            </Link>

            <Link
              to="/journal"
              onClick={closeMenus}
            >
              {t("journal")}
            </Link>

            <Link
              to="/about"
              onClick={closeMenus}
            >
              {t("about")}
            </Link>

            <Link
              to="/contact"
              onClick={closeMenus}
            >
              {t("contact")}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
