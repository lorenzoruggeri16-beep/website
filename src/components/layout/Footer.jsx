import {
  Link,
} from "react-router-dom";

import {
  useTranslation,
} from "react-i18next";

export default function Footer() {

  const { t } =
    useTranslation();

  return (

    <footer className="bg-[#11110f] text-[#f6f2eb] px-6 lg:px-20 py-2">

      <div className="flex flex-col items-center text-center">

        {/* LOGO */}
        <img
          src="/images/logo-white.png"
          alt="Golden Light Studio"
          className="w-18 lg:w-14 mb-3 object-contain"
        />

        {/* BRAND */}
        <p className="uppercase tracking-[0.45em] text-[14px] mb-6">

          Golden Light Studio

        </p>

        {/* TEXT */}
        <p className="text-[18px] lg:text-sm leading-relaxed opacity-70 max-w-xs mb-6">

          {t("hero_subtitle")}

        </p>

        {/* NAVIGATION */}
        <div className="flex flex-wrap justify-center gap-5 lg:gap-7 uppercase tracking-[0.28em] text-[14px] lg:text-[11px] mb-2">

          <Link
            to="/portfolio"
            className="hover:text-[#c6a66a] hover:opacity-100 transition-all duration-500"
          >
            {t("portfolio")}
          </Link>

          <Link
            to="/journal"
            className="hover:text-[#c6a66a] hover:opacity-100 transition-all duration-500"
          >
            {t("journal")}
          </Link>

          <Link
            to="/about"
            className="hover:text-[#c6a66a] hover:opacity-100 transition-all duration-500"
          >
            {t("about")}
          </Link>

          <Link
            to="/contact"
            className="hover:text-[#c6a66a] hover:opacity-100 transition-all duration-500"
          >
            {t("contact")}
          </Link>

        </div>

        {/* SOCIALS */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6 uppercase tracking-[0.22em] text-[12px] opacity-70 mb-2">

          <a
            href="https://www.instagram.com/goldenlightstudio.es/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#c6a66a] hover:opacity-100 transition-all duration-500"
          >
            Instagram
          </a>

          <Link
            to="/contact"
            className="hover:text-[#c6a66a] hover:opacity-100 transition-all duration-500"
          >
            WhatsApp
          </Link>

          <a
            href="mailto:contacto.goldenlightstudio@gmail.com"
            className="hover:text-[#c6a66a] hover:opacity-100 transition-all duration-500"
          >
            Email
          </a>

        </div>

        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event("gls:open-consent-settings"))}
          className="mb-3 text-[11px] uppercase tracking-[0.18em] text-white/60 underline underline-offset-4 hover:text-[#c6a66a]"
        >
          Cookie settings
        </button>
        {/* COPYRIGHT */}
        <p className="text-[12px] lg:text-[9px] text-white/60 mt-1">

          Â© 2026 Golden Light Studio

        </p>

      </div>

    </footer>

  );

}
