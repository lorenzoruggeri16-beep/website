import {
  motion,
} from "framer-motion";

import {
  useTranslation,
} from "react-i18next";

export default function JournalHero() {

  const { t } =
    useTranslation();

  return (

    <section className="relative flex min-h-[52vh] items-end overflow-hidden px-6 pb-12 pt-28 sm:px-8 md:items-center md:pb-10 lg:min-h-[48vh] lg:px-20 lg:pt-28">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[#f6f2eb]" />

      {/* LIGHT EFFECT */}
      <div className="absolute top-[-300px] right-[-200px] w-[700px] h-[700px] bg-[#d6b57b]/10 rounded-full blur-3xl" />

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        className="relative z-10 max-w-4xl"
      >

        <p className="uppercase tracking-[0.3em] text-[10px] sm:tracking-[0.45em] sm:text-xs text-[#c6a66a] mb-6">

          Golden Light Studio

        </p>

        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[56px] leading-[1.05] font-light mb-6 max-w-3xl sm:mb-8">

          {t("journal_title_1")}
          <br />
          {t("journal_title_2")}
          <br />
          {t("journal_title_3")}

        </h1>

        <div className="mb-6 h-px w-16 bg-[#c6a66a] sm:mb-8 sm:w-24" />

        <p className="text-base lg:text-lg leading-[1.9] opacity-60 max-w-xl">

          {t("journal_text")}

        </p>

      </motion.div>

    </section>

  );

}