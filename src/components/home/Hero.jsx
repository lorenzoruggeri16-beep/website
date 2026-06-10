import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Hero() {

  const { t } =
    useTranslation();

  const { scrollY } =
    useScroll();

  const y = useTransform(
    scrollY,
    [0, 500],
    [0, 150]
  );

  const words = [
    "LOVE STORIES",
    "MOTHERHOOD",
    "COUPLE STORIES",
    "DESTINATION WEDDINGS",
    "FAMILY STORIES",
  ];

  const [text, setText] =
    useState("");

  const [wordIndex,
    setWordIndex] =
    useState(0);

  const [isDeleting,
    setIsDeleting] =
    useState(false);

  useEffect(() => {

    const currentWord =
      words[wordIndex];

    const timeout =
      setTimeout(() => {

        if (!isDeleting) {

          const nextText =
            currentWord.substring(
              0,
              text.length + 1
            );

          setText(nextText);

          if (
            nextText ===
            currentWord
          ) {

            setTimeout(() => {

              setIsDeleting(
                true
              );

            }, 1800);

          }

        } else {

          const nextText =
            currentWord.substring(
              0,
              text.length - 1
            );

          setText(nextText);

          if (
            nextText === ""
          ) {

            setIsDeleting(
              false
            );

            setWordIndex(
              (prev) =>
                (prev + 1) %
                words.length
            );

          }

        }

      },
      isDeleting
        ? 50
        : 120
      );

    return () =>
      clearTimeout(
        timeout
      );

  }, [
    text,
    isDeleting,
    wordIndex,
  ]);

  return (

    <section className="relative h-screen overflow-hidden">

      {/* Background */}
      <motion.img
        src="/images/hero.jpg"
        alt="Golden Light Studio"
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="
            uppercase
            tracking-[0.6em]
            text-[11px]
            md:text-xs
            mb-8
            opacity-80
          "
        >
          {t("hero_subtitle")}
        </motion.p>

        <div className="h-[120px] md:h-[180px] lg:h-[220px] flex items-center justify-center">

          <motion.h1
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
            }}
            className="
              text-5xl
              md:text-8xl
              lg:text-[10rem]
              font-light
              leading-none
              text-center
            "
          >
            {text}

            <span className="animate-pulse text-[#c6a66a] ml-1">
              |
            </span>

          </motion.h1>

        </div>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.6,
            duration: 1,
          }}
          className="
            max-w-xl
            mt-8
            text-sm
            md:text-base
            tracking-[0.08em]
            opacity-80
            leading-relaxed
          "
        >
          {t("intro_text")}
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="mt-12"
        >

          <Link
            to="/portfolio"
            className="
              border
              border-white
              px-8
              py-4
              uppercase
              tracking-[0.3em]
              text-xs
              hover:bg-white
              hover:text-black
              transition-all
              duration-500
            "
          >
            {t("view_portfolio")}
          </Link>

        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <div
        className="
          absolute
          bottom-10
          left-1/2
          -translate-x-1/2
          text-white
          text-[10px]
          tracking-[0.4em]
          uppercase
          opacity-70
        "
      >
        Scroll
      </div>

    </section>

  );

}
