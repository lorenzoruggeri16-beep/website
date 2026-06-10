import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useTranslation } from "react-i18next";

export default function PortfolioHero() {

  const [heroImage, setHeroImage] =
    useState(null);

  const { t } =
    useTranslation();

  useEffect(() => {

    const fetchPortfolio =
      async () => {

        const {
          data,
          error,
        } = await supabase

          .from("portfolio")

          .select("*")

          .eq("deleted", false);

        if (error) {

          return;

        }

        if (!data?.length)
          return;

        const images =

          data.map(
            (item) =>
              item.cover_image
          );

        const randomImage =

          images[
            Math.floor(
              Math.random() *
              images.length
            )
          ];

        setHeroImage(
          randomImage
        );

        const interval =
          setInterval(() => {

            const nextImage =

              images[
                Math.floor(
                  Math.random() *
                  images.length
                )
              ];

            setHeroImage(
              nextImage
            );

          }, 7000);

        return () =>
          clearInterval(
            interval
          );

      };

    fetchPortfolio();

  }, []);

  return (

    <section className="relative h-[65vh] lg:h-[92vh] overflow-hidden">

      {/* IMAGE */}
      {heroImage && (

        <motion.img
          key={heroImage}
          src={heroImage}
          alt=""
          fetchPriority="high"
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            scale: 1.02,
          }}
          transition={{
            duration: 4,
            ease: "easeOut",
          }}
          className="w-full h-full object-cover"
        />

      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-end px-6 lg:px-20 pb-12 lg:pb-24">

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
          }}
          className="max-w-4xl"
        >

          <p className="uppercase tracking-[0.45em] text-xs text-white/70 mb-6 lg:mb-8">

            Golden Light Studio

          </p>

          <h1 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.08] font-light text-white max-w-3xl mb-8 lg:mb-10">

            {t("portfolio_title_1")}
            <br />
            {t("portfolio_title_2")}
            <br />
            {t("portfolio_title_3")}

          </h1>

          <div className="w-24 lg:w-40 h-px bg-[#c6a66a] mb-8 lg:mb-10" />

          <p className="text-base lg:text-xl leading-relaxed text-white/70 max-w-2xl">

            {t("portfolio_text")}

          </p>

        </motion.div>

      </div>

    </section>

  );

}