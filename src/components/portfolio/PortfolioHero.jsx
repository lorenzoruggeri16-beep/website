import { useEffect, useState} from "react";

import { motion,} from "framer-motion";

import { supabase } from "../../lib/supabase";

export default function PortfolioHero() {

  const [heroImage,
    setHeroImage] =
    useState(null);

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

          console.log(error);

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

    <section className="relative h-[92vh] overflow-hidden">

      {/* IMAGE */}
      {heroImage && (

        <motion.img
         key={heroImage}
         src={heroImage}
         alt=""
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

          <h1 className="text-5xl lg:text-[96px] leading-none font-light text-white max-w-6xl mb-12">

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