import {
  Link,
} from "react-router-dom";

export default function Footer() {

  return (

    <footer className="bg-[#11110f] text-[#f6f2eb] px-15 lg:px-20 py-4">

      <div className="grid grid-cols-3 items-center">

        {/* LEFT */}
        <div className="flex flex-col items-start -mt-36 gap-4 uppercase tracking-[0.28em] text-[10px] lg:text-[11px]">

          <Link
            to="/portfolio"
            className="hover:opacity-50 transition-all duration-500"
          >
            Portfolio
          </Link>

          <Link
            to="/portfolio"
            className="hover:opacity-50 transition-all duration-500"
          >
            Sessions
          </Link>

        </div>

        {/* CENTER */}
        <div className="flex flex-col items-center text-center">

          {/* LOGO */}
          <img
            src="/images/logo-white.png"
            alt="Golden Light Studio"
            className="w-16 mb-4 object-contain"
          />

          {/* BRAND */}
          <p className="uppercase tracking-[0.45em] text-[10px] mb-6">

            Golden Light Studio

          </p>

          {/* TEXT */}
          <p className="text-sm leading-relaxed opacity-70 max-w-xs mb-6">

            Cinematic photography inspired by emotion,
            movement and timeless storytelling.

          </p>

          {/* SOCIALS */}
          <div className="flex items-center gap-6 uppercase tracking-[0.22em] text-[10px] opacity-70">

            <a
              href="#"
              className="hover:opacity-50 transition-all duration-500"
            >
              Instagram
            </a>

            <a
              href="#"
              className="hover:opacity-50 transition-all duration-500"
            >
              Facebook
            </a>

            <a
              href="#"
              className="hover:opacity-50 transition-all duration-500"
            >
              Linkedin
            </a>

            <a
              href="#"
              className="hover:opacity-50 transition-all duration-500"
            >
              Email
            </a>

          </div>

          {/* COPYRIGHT */}
          <p className="text-[10px] opacity-30 mt-4">

            © 2026 Golden Light Studio

          </p>

        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end -mt-36 gap-4 uppercase tracking-[0.28em] text-[10px] lg:text-[11px]">

          <Link
            to="/about"
            className="hover:opacity-50 transition-all duration-500"
          >
            Sobre mí
          </Link>

          <Link
            to="/contact"
            className="hover:opacity-50 transition-all duration-500"
          >
            Contacto
          </Link>

        </div>

      </div>

    </footer>

  );

}