import {
  useEffect,
  useState,
} from "react";

import {
  motion,
} from "framer-motion";

export default function PortfolioHero() {

  const [heroImage,
    setHeroImage] =
    useState(null);

  useEffect(() => {

    const savedPortfolio =
      localStorage.getItem(
        "portfolio"
      );

    if (savedPortfolio) {

      const portfolio =
        JSON.parse(
          savedPortfolio
        );

      if (
        portfolio.length > 0
      ) {

        setHeroImage(
          portfolio[0]
        );

      }

    }

  }, []);

  return (

    <section className="relative h-screen overflow-hidden">

      {/* IMAGE */}
      {heroImage && (

        <img
          src={heroImage.image}
          alt={heroImage.title}
          className="w-full h-full object-cover scale-[1.02]"
        />

      )}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/25" />

      {/* CONTENT */}
      <div className="absolute inset-0 flex items-end px-6 lg:px-20 pb-24">

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
          className="max-w-6xl"
        >

          <p className="uppercase tracking-[0.45em] text-xs text-white/70 mb-8">

            Golden Light Studio

          </p>

          <h1 className="text-6xl lg:text-[140px] leading-none font-light text-white max-w-6xl mb-12">

            Cinematic stories
            crafted through
            timeless imagery.

          </h1>

          <div className="w-40 h-px bg-[#c6a66a] mb-12" />

          <p className="text-lg lg:text-2xl leading-relaxed text-white/70 max-w-3xl">

            A curated collection of
            motherhood, couples and
            editorial photography
            captured with emotion,
            movement and natural light.

          </p>

        </motion.div>

      </div>

    </section>

  );
}