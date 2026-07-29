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

      setHeroImages([
        ...new Set((data || []).map((item) => item.cover_image).filter(Boolean)),
      ]);
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
    <section className="relative h-[68svh] min-h-[500px] overflow-hidden lg:h-[92vh] lg:min-h-0">
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
            className="absolute inset-0 h-full w-full object-cover object-[58%_center] lg:object-center"
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/30 lg:from-black/75 lg:via-black/40 lg:to-black/35" />

      <div className="absolute inset-0 flex items-end px-6 pb-12 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-sm"
        >
          <p className="mb-4 text-[10px] uppercase tracking-[0.38em] text-white/80">
            Golden Light Studio
          </p>
          <h1 className="text-[clamp(2.5rem,11vw,3.65rem)] font-light leading-[0.94] text-white">
            {t("portfolio_title_1")}
          </h1>
          <div className="my-6 h-px w-16 bg-[#c6a66a]" />
          <p className="max-w-[29rem] text-sm leading-relaxed text-white/85">
            {t("portfolio_mobile_text")}
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 hidden items-end px-20 pb-28 lg:flex">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="max-w-4xl"
        >
          <p className="text-sm uppercase tracking-[0.45em] text-white">Golden Light Studio</p>
          <h1 className="mb-10 max-w-3xl text-[56px] font-light leading-[1.08] text-white">
            {t("portfolio_title_1")}
            <br />
            {t("portfolio_title_2")}
            <br />
            {t("portfolio_title_3")}
          </h1>
          <div className="mb-10 h-px w-40 bg-[#c6a66a]" />
          <p className="max-w-2xl text-xl leading-relaxed text-white">{t("portfolio_text")}</p>
        </motion.div>
      </div>
    </section>
  );
}
