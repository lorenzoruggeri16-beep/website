import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const location = useLocation();
  const { t, i18n } = useTranslation();
  const darkMode = location.pathname !== "/" || hasScrolled;

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLanguageOpen(false);
  };

  useEffect(() => {
    if (location.pathname !== "/") return undefined;

    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setHasScrolled(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
  const closeMenus = () => {
    setOpen(false);
    setLanguageOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 lg:px-14 py-5 transition-all duration-500 ${
          darkMode
            ? "text-black bg-[#f8f6f2]/80 backdrop-blur-md"
            : "text-white bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <img
            src={
              darkMode
                ? "/images/logo-black.png"
                : "/images/logo-white.png"
            }
            alt="Golden Light Studio"
            className="h-10 w-auto"
          />

          <span 
          className={`uppercase tracking-[0.36em] text-[16px] font-light transition-colors duration-500 ${
            darkMode ? "text-black" : "text-white"
          }`}
          style={
            !darkMode
              ? { textShadow: "0 2px 8px rgba(0,0,0,0.85)" }
              : undefined
            }
          >
            Golden Light Studio
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-11 uppercase text-[13px] tracking-[0.22em]">

          <Link
            to="/portfolio"
            onClick={() => setLanguageOpen(false)}
            aria-label="Change language"
            className="relative hover:text-[#c6a66a] transition-colors duration-300"
          >
            {t("portfolio")}
          </Link>

          <Link
            to="/journal"
            onClick={() => setLanguageOpen(false)}
            aria-label="Change language"
            className="relative hover:text-[#c6a66a] transition-colors duration-300"
          >
            {t("journal")}
          </Link>

          <Link
            to="/about"
            onClick={() => setLanguageOpen(false)}
            aria-label="Change language"
            className="relative hover:text-[#c6a66a] transition-colors duration-300"
          >
            {t("about")}
          </Link>

          <Link
            to="/contact"
            onClick={() => setLanguageOpen(false)}
            aria-label="Change language"
            className="relative hover:text-[#c6a66a] transition-colors duration-300"
          >
            {t("contact")}
          </Link>

          {/* BOOK BUTTON */}
          <a
            href="https://calendly.com/contacto-goldenlightstudio/golden-light-session"
            target="_blank"
            rel="noopener noreferrer"
            className="
              border
              border-[#c6a66a]
              px-7
              py-3
              text-[11px]
              tracking-[0.28em]
              uppercase
              hover:bg-[#c6a66a]
              hover:text-white
              transition-all
              duration-500
            "
          >
            Book a Session
          </a>

          {/* Language */}
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
              {i18n.language === "es" && "ðŸ‡ªðŸ‡¸"}
              {i18n.language === "it" && "ðŸ‡®ðŸ‡¹"}
              {i18n.language === "en" && "ðŸ‡¬ðŸ‡§"}
            </button>

            {languageOpen && (
              <div
                className="
                  absolute
                  top-10
                  right-0
                  min-w-[190px]
                  rounded-sm
                  backdrop-blur-md
                  hover:bg-[#c6a66a]
                  hover:text-white
                  bg-white
                  text-black
                  border
                  border-black/10
                  shadow-xl
                  overflow-hidden
                "
              >
                <button
                  onClick={() => changeLanguage("es")}
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
                  ðŸ‡ªðŸ‡¸ EspaÃ±ol
                </button>

                <button
                  onClick={() => changeLanguage("it")}
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
                  ðŸ‡®ðŸ‡¹ Italiano
                </button>

                <button
                  onClick={() => changeLanguage("en")}
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
                  ðŸ‡¬ðŸ‡§ English
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-[#111] z-[100] text-white flex flex-col">
          <div className="flex justify-between items-center px-6 py-5">
            <h2 className="uppercase tracking-[0.35em] text-lg">
              Golden Light
            </h2>

            <button onClick={() => setOpen(false)} aria-label="Close menu">
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

            {/* Mobile Book Button */}
            <a
              href="https://calendly.com/contacto-goldenlightstudio/golden-light-session"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenus}
              className="
                mt-2
                border
                border-[#c6a66a]
                px-8
                py-4
                uppercase
                tracking-[0.35em]
                text-base
                text-[#c6a66a]
                hover:bg-[#c6a66a]
                hover:text-white
                transition-all
                duration-500
              "
            >
              Book a Session
            </a>

            {/* Mobile Language Switcher */}
            <div className="flex  items-center gap-4">
              <button
                onClick={() => changeLanguage("es")} aria-label="Spanish">
                <img
                  src="/images/flags/es.svg.avif"
                  alt="EspaÃ±ol"
                  className={`w-6 h-6 transition-all duration-300 ${
                  i18n.language === "es"
                    ? "opacity-100 scale-110"
                    : "opacity-40 hover:opacity-100"
                  }`}
                />
              </button>

              <button onClick={() => changeLanguage("it")} aria-label="Italian">
                <img
                src="/images/flags/it.svg.webp"
                alt="Italiano"
                className={`w-6 h-6 transition-all duration-300 ${
                    i18n.language === "it"
                    ? "opacity-100 scale-110"
                    : "opacity-40 hover:opacity-100"
                }`}
                />
              </button>

              <button onClick={() => changeLanguage("en")} aria-label="English">
                <img
                src="/images/flags/gb.svg.avif"
                alt="English"
                className={`w-6 h-6 transition-all duration-300 ${
                  i18n.language === "en"
                    ? "opacity-100 scale-110"
                    : "opacity-40 hover:opacity-100"
                }`}
                />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
