import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { openCalendly } from "../../lib/calendly";

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
    const handleScroll = () => setHasScrolled(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const languageControl = (mobile = false) => (
    <div className={`flex items-center ${mobile ? "gap-3 text-sm tracking-[0.16em]" : "gap-2 text-[11px] tracking-[0.14em]"}`}>
      {LANGUAGES.map((language, index) => (
        <span key={language} className={`flex items-center ${mobile ? "gap-3" : "gap-2"}`}>
          {index > 0 && <span className={mobile ? "text-white/35" : "opacity-35"}>{"\u00b7"}</span>}
          <button
            type="button"
            onClick={() => changeLanguage(language)}
            aria-label={`Change language to ${language.toUpperCase()}`}
            aria-pressed={i18n.language === language}
            className={`transition-colors duration-300 hover:text-[#c6a66a] ${
              i18n.language === language ? "text-[#c6a66a]" : mobile ? "text-white/65" : ""
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
        className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between px-5 py-4 transition-all duration-500 sm:px-9 sm:py-5 lg:px-16 xl:px-20 ${
          darkMode ? "bg-[#f8f6f2]/80 text-black backdrop-blur-md" : "bg-transparent text-white"
        }`}
      >
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-4">
          <picture className="block">
            <source srcSet={darkMode ? "/images/logo-black-nav.avif" : "/images/logo-white-nav.avif"} type="image/avif" />
            <img
              src={darkMode ? "/images/logo-black.png" : "/images/logo-white.png"}
              alt="Golden Light Studio"
              className="h-8 w-auto sm:h-10"
            />
          </picture>
          <span
            className={`hidden text-[13px] font-light uppercase tracking-[0.28em] transition-colors duration-500 min-[420px]:inline sm:text-[15px] sm:tracking-[0.34em] ${
              darkMode ? "text-black" : "text-white"
            }`}
            style={!darkMode ? { textShadow: "0 2px 8px rgba(0,0,0,0.85)" } : undefined}
          >
            Golden Light Studio
          </span>
        </Link>

        <div className="hidden items-center gap-9 text-[12px] uppercase tracking-[0.2em] xl:flex xl:gap-11">
          <Link to="/portfolio" className="transition-colors duration-300 hover:text-[#c6a66a]">{t("portfolio")}</Link>
          <Link to="/journal" className="transition-colors duration-300 hover:text-[#c6a66a]">{t("journal")}</Link>
          <Link to="/about" className="transition-colors duration-300 hover:text-[#c6a66a]">{t("about")}</Link>
          <Link to="/contact" className="transition-colors duration-300 hover:text-[#c6a66a]">{t("contact")}</Link>
          <button type="button" onClick={openCalendly} className="border border-[#c6a66a] px-7 py-3 text-[11px] uppercase tracking-[0.28em] transition-all duration-500 hover:bg-[#c6a66a] hover:text-white">
            Book a Session
          </button>
          {languageControl()}
        </div>

        <button type="button" onClick={() => setOpen(true)} className="rounded-full p-2 xl:hidden" aria-label="Open menu">
          <Menu size={26} strokeWidth={1.5} />
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[100] flex min-h-[100svh] flex-col overflow-y-auto bg-[#111] px-6 py-5 text-white sm:px-10">
          <div className="flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-[0.3em] sm:text-lg sm:tracking-[0.35em]">Golden Light</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-full p-2">
              <X size={27} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10 text-3xl font-light sm:gap-8 sm:text-4xl">
            <Link to="/" onClick={() => setOpen(false)}>{t("home")}</Link>
            <Link to="/portfolio" onClick={() => setOpen(false)}>{t("portfolio")}</Link>
            <Link to="/journal" onClick={() => setOpen(false)}>{t("journal")}</Link>
            <Link to="/about" onClick={() => setOpen(false)}>{t("about")}</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>{t("contact")}</Link>
            <button type="button" onClick={() => { setOpen(false); openCalendly(); }} className="mt-2 border border-[#c6a66a] px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-[#c6a66a] transition-all duration-500 hover:bg-[#c6a66a] hover:text-white sm:px-8 sm:py-4 sm:text-base sm:tracking-[0.35em]">
              Book a Session
            </button>
            {languageControl(true)}
          </div>
        </div>
      )}
    </>
  );
}
