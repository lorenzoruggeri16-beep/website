import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HERO_WORDS = [
  "LOVE STORIES",
  "MOTHERHOOD",
  "COUPLE STORIES",
  "DESTINATION WEDDINGS",
  "FAMILY STORIES",
];

export default function Hero() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % HERO_WORDS.length);
    }, 3600);

    return () => window.clearInterval(rotation);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <motion.img
        src="/images/hero.jpg"
        alt="Golden Light Studio"
        style={{ y }}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-[120%] w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-8 text-[11px] uppercase tracking-[0.6em] opacity-80 md:text-xs"
        >
          {t("hero_subtitle")}
        </motion.p>

        <div className="flex h-[132px] items-center justify-center md:h-[180px] lg:h-[220px]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={wordIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="max-w-[94vw] text-center text-5xl font-light leading-[0.98] md:text-8xl lg:text-[10rem]"
            >
              {HERO_WORDS[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-8 max-w-xl text-sm leading-relaxed tracking-[0.08em] opacity-80 md:text-base"
        >
          {t("intro_text")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <Link
            to="/portfolio"
            className="border border-white px-8 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-black"
          >
            {t("view_portfolio")}
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white opacity-70">
        Scroll
      </div>
    </section>
  );
}
