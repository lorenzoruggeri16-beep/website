import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HERO_WORDS = ["LOVE STORIES", "MOTHERHOOD", "COUPLE STORIES", "DESTINATION WEDDINGS", "FAMILY STORIES"];

export default function Hero() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const rotation = window.setInterval(() => setWordIndex((current) => (current + 1) % HERO_WORDS.length), 3600);
    return () => window.clearInterval(rotation);
  }, []);

  return (
    <section className="relative flex min-h-[620px] h-[100svh] items-center overflow-hidden">
      <motion.img src="/images/hero.jpg" alt="Golden Light Studio" style={{ y }} fetchPriority="high" decoding="async" className="absolute inset-0 h-[116%] w-full object-cover" />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pt-14 text-center text-white sm:px-8 md:px-12">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-6 text-[10px] uppercase tracking-[0.3em] opacity-80 sm:mb-8 sm:text-xs sm:tracking-[0.6em]">
          {t("hero_subtitle")}
        </motion.p>

        <div className="flex h-[116px] items-center justify-center sm:h-[140px] md:h-[180px] lg:h-[220px]">
          <AnimatePresence mode="wait">
            <motion.h1 key={wordIndex} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.55, ease: "easeOut" }} className="max-w-[92vw] text-center text-[clamp(2.35rem,10.5vw,3.5rem)] font-light leading-[0.92] sm:text-5xl md:text-8xl lg:text-[10rem] lg:leading-[0.98]">
              {HERO_WORDS[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-5 max-w-xl text-sm leading-relaxed tracking-[0.03em] opacity-80 sm:mt-8 sm:text-base sm:tracking-[0.08em]">
          {t("intro_text")}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 sm:mt-12">
          <Link to="/portfolio" className="border border-white px-7 py-3 text-[11px] uppercase tracking-[0.24em] transition-all duration-500 hover:bg-white hover:text-black sm:px-8 sm:py-4 sm:text-xs sm:tracking-[0.3em]">
            {t("view_portfolio")}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white opacity-70 sm:block">Scroll</div>
    </section>
  );
}
