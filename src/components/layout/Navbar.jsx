import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();

  useEffect(() => {

    // NON-home pages
    if (location.pathname !== "/") {
      setDarkMode(true);
      return;
    }

    // Homepage behavior
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

  return (
    <>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 transition-all duration-500
        ${
          darkMode
            ? "text-black bg-[#f8f6f2]/80 backdrop-blur-md"
            : "text-white bg-transparent"
        }`}
      >

        {/* Logo */}
        <Link
  to="/"
  className="flex items-center gap-4"
>

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
        <div className="hidden md:flex gap-8 uppercase text-xs tracking-[0.25em]">

          <Link
            to="/portfolio"
            className="hover:opacity-60 transition"
          >
            Portfolio
          </Link>

          <Link
            to="/about"
            className="hover:opacity-60 transition"
          >
            Sobre mí
          </Link>

          <Link
            to="/contact"
            className="hover:opacity-60 transition"
          >
            Contacto
          </Link>

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

          {/* Top */}
          <div className="flex justify-between items-center px-6 py-8">

            <h2 className="uppercase tracking-[0.35em] text-lg">
              Golden Light
            </h2>

            <button onClick={() => setOpen(false)}>
              <X size={30} />
            </button>

          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col justify-center items-center gap-10 text-4xl font-light">

            <Link to="/" onClick={() => setOpen(false)}>
              Inicio
            </Link>

            <Link to="/portfolio" onClick={() => setOpen(false)}>
              Portfolio
            </Link>

            <Link to="/about" onClick={() => setOpen(false)}>
              Sobre mí
            </Link>

            <Link to="/contact" onClick={() => setOpen(false)}>
              Contacto
            </Link>

          </div>

        </div>

      )}

    </>
  );
}