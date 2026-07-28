import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = ["es", "en", "it"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const darkMode = location.pathname !== "/" || hasScrolled;

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
    setOpen(false);
  };

  useEffect(() => {
    if (location.pathname !== "/") return undefined;

    const handleScroll = () => {
      setHasScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const closeMenu = () => setOpen(false);

  const languageControl = (mobile = false) => (
    <div className={`flex items-center ${mobile ? "gap-3 text-sm tracking-[0.16em]" : "gap-2 text-[11px] tracking-[0.14em]"}`}>
      {LANGUAGES.map((language, index) => (
        <span key={language} className={`flex items-center ${mobile ? "gap-3" : "gap-2"}`}>
          {index > 0 && <span className={mobile ? "text-white/35" : "opacity-35"}>·</span>}
          <button
            type="button"
            onClick={() => changeLanguage(language)}
            aria-label={`Change language to ${language.toUpperCase()}`}
            aria-pressed={i18n.language === language}
            className={`transition-colors duration-300 hover:text-[#c6a66a] ${
              i18n.language === language
                ? "text-[#c6a66a]"
                : mobile
                  ? "text-white/65"
                  : ""
            }`}
          >
            {language.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between px-7 py-5 transition-all duration-500 sm:px-9 lg:px-16 xl:px-20 ${
          darkMode
            ? "bg-[#f8f6f2]/80 text-black backdrop-blur-md"
            : "bg-transparent text-white"
        }`}
      >
        <Link to="/" className="flex shrink-0 items-center gap-4">
          <img
            src={darkMode ? "/images/logo-black.png" : "/images/logo-white.png"}
            alt="Golden Light Studio"
            className="h-10 w-auto"
          />
          <span
            className={`text-[15px] font-light uppercase tracking-[0.34em] transition-colors duration-500 ${
              darkMode ? "text-black" : "text-white"
            }`}
            style={!darkMode ? { textShadow: "0 2px 8px rgba(0,0,0,0.85)" } : undefined}
          >
            Golden Light Studio
          </span>
        </Link>

        <div className="hidden items-center gap-9 text-[12px] uppercase tracking-[0.2em] xl:flex xl:gap-11">
          <Link to="/portfolio" className="transition-colors duration-300 hover:text-[#c6a66a]">
            {t("portfolio")}
          </Link>
          <Link to="/journal" className="transition-colors duration-300 hover:text-[#c6a66a]">
            {t("journal")}
          </Link>
          <Link to="/about" className="transition-colors duration-300 hover:text-[#c6a66a]">
            {t("about")}
          </Link>
          <Link to="/contact" className="transition-colors duration-300 hover:text-[#c6a66a]">
            {t("contact")}
          </Link>
          <a
            href="https://calendly.com/contacto-goldenlightstudio/golden-light-session"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#c6a66a] px-7 py-3 text-[11px] uppercase tracking-[0.28em] transition-all duration-500 hover:bg-[#c6a66a] hover:text-white"
          >
            Book a Session
          </a>
          {languageControl()}
        </div>

        <button onClick={() => setOpen(true)} className="xl:hidden" aria-label="Open menu">
          <Menu size={28} />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-[#111] text-white">
          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="text-lg uppercase tracking-[0.35em]">Golden Light</h2>
            <button onClick={closeMenu} aria-label="Close menu">
              <X size={30} />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-10 text-4xl font-light">
            <Link to="/" onClick={closeMenu}>{t("home")}</Link>
            <Link to="/portfolio" onClick={closeMenu}>{t("portfolio")}</Link>
            <Link to="/journal" onClick={closeMenu}>{t("journal")}</Link>
            <Link to="/about" onClick={closeMenu}>{t("about")}</Link>
            <Link to="/contact" onClick={closeMenu}>{t("contact")}</Link>
            <a
              href="https://calendly.com/contacto-goldenlightstudio/golden-light-session"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-2 border border-[#c6a66a] px-8 py-4 text-base uppercase tracking-[0.35em] text-[#c6a66a] transition-all duration-500 hover:bg-[#c6a66a] hover:text-white"
            >
              Book a Session
            </a>
            {languageControl(true)}
          </div>
        </div>
      )}
    </>
  );
}
