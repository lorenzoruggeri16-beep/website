import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useTranslation } from "react-i18next";

const HERO_IMAGE_LIMIT = 5;

export default function PortfolioHero() {
  const [heroImages, setHeroImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchPortfolioHero = async () => {
      const { data, error } = await supabase
        .from("portfolio")
        .select("cover_image, created_at")
        .eq("deleted", false)
        .order("created_at", { ascending: false })
        .limit(HERO_IMAGE_LIMIT);

      if (error) return;

      const images = [
        ...new Set((data || []).map((item) => item.cover_image).filter(Boolean)),
      ];

      setHeroImages(images);
      setActiveImageIndex(0);
    };

    fetchPortfolioHero();
  }, []);

  useEffect(() => {
    if (heroImages.length < 2) return undefined;

    const interval = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % heroImages.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [heroImages]);

  const activeImage = heroImages[activeImageIndex];

  return (
    <section className="relative h-[65vh] overflow-hidden lg:h-[92vh]">
      <AnimatePresence mode="sync">
        {activeImage && (
          <motion.img
            key={activeImage}
            src={activeImage}
            alt="Luxury photography portfolio by Golden Light Studio in Tenerife"
            fetchPriority={activeImageIndex === 0 ? "high" : "auto"}
            decoding="async"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/35" />

      <div className="absolute inset-0 flex items-end px-6 pb-16 lg:px-20 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.45em] text-white">
            Golden Light Studio
          </p>

          <h1 className="mb-8 max-w-3xl text-4xl font-light leading-[1.08] text-white md:text-5xl lg:mb-10 lg:text-[56px]">
            {t("portfolio_title_1")}
            <br />
            {t("portfolio_title_2")}
            <br />
            {t("portfolio_title_3")}
          </h1>

          <div className="mb-8 h-px w-24 bg-[#c6a66a] lg:mb-10 lg:w-40" />

          <p className="max-w-2xl text-base leading-relaxed text-white lg:text-xl">
            {t("portfolio_text")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
