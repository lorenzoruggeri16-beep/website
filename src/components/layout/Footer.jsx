import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#11110f] px-6 py-10 text-[#f6f2eb] sm:px-10 sm:py-14 lg:px-20 lg:py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <picture className="mb-3 block">
          <source srcSet="/images/logo-white.avif" type="image/avif" />
          <img src="/images/logo-white.png" alt="Golden Light Studio" className="w-10 object-contain sm:w-12 lg:w-14" />
        </picture>
        <p className="mb-5 text-[11px] uppercase tracking-[0.34em] sm:text-[14px] sm:tracking-[0.45em]">Golden Light Studio</p>
        <p className="mb-8 max-w-xs text-sm leading-relaxed opacity-70 sm:mb-9">{t("hero_subtitle")}</p>

        <nav className="mb-7 grid grid-cols-2 gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.2em] sm:flex sm:flex-wrap sm:justify-center sm:gap-7 sm:text-[11px] sm:tracking-[0.28em]">
          <Link to="/portfolio" className="transition-colors duration-500 hover:text-[#c6a66a]">{t("portfolio")}</Link>
          <Link to="/journal" className="transition-colors duration-500 hover:text-[#c6a66a]">{t("journal")}</Link>
          <Link to="/about" className="transition-colors duration-500 hover:text-[#c6a66a]">{t("about")}</Link>
          <Link to="/contact" className="transition-colors duration-500 hover:text-[#c6a66a]">{t("contact")}</Link>
        </nav>

        <div className="mb-5 flex flex-wrap justify-center gap-x-5 gap-y-3 text-[10px] uppercase tracking-[0.18em] opacity-70 sm:gap-x-6 sm:text-[12px] sm:tracking-[0.22em]">
          <a href="https://www.instagram.com/goldenlightstudio.es/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-500 hover:text-[#c6a66a]">Instagram</a>
          <Link to="/contact" className="transition-colors duration-500 hover:text-[#c6a66a]">WhatsApp</Link>
          <a href="mailto:contacto.goldenlightstudio@gmail.com" className="transition-colors duration-500 hover:text-[#c6a66a]">Email</a>
        </div>

        <button type="button" onClick={() => window.dispatchEvent(new Event("gls:open-consent-settings"))} className="mb-5 text-[10px] uppercase tracking-[0.16em] text-white/60 underline underline-offset-4 transition-colors hover:text-[#c6a66a] sm:text-[11px] sm:tracking-[0.18em]">
          Cookie settings
        </button>
        <p className="text-[10px] text-white/60 sm:text-[11px]">{String.fromCharCode(169)} 2026 Golden Light Studio</p>
      </div>
    </footer>
  );
}
