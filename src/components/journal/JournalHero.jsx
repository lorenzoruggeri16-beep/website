import {
  motion,
} from "framer-motion";

export default function JournalHero() {

  return (

    <section className="relative min-h-screen flex items-center px-6 lg:px-20 pt-32 pb-20 overflow-hidden">

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
        className="relative z-10 max-w-6xl"
      >

        <p className="uppercase tracking-[0.45em] text-xs opacity-40 mb-8">

          Golden Light Studio

        </p>

        <h1 className="text-7xl lg:text-[140px] leading-none font-light mb-12 max-w-5xl">

          Stories captured
          through light
          and emotion.

        </h1>

        <div className="w-40 h-px bg-[#c6a66a] mb-12" />

        <p className="text-lg lg:text-2xl leading-relaxed opacity-60 max-w-3xl">

          A cinematic journal of
          motherhood, intimacy,
          editorial storytelling
          and timeless moments
          captured across Tenerife.

        </p>

      </motion.div>

    </section>

  );
}