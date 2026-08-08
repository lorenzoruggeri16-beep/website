import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="flex flex-col items-center"
      >

        <picture className="mb-8 block">
          <source srcSet="/images/logo-black.avif" type="image/avif" />
          <img src="/images/logo-black.png" alt="Golden Light Studio" className="w-20" />
        </picture>

        <p className="uppercase tracking-[0.45em] text-[10px] text-black/40">
          Loading Experience
        </p>

      </motion.div>

    </div>
  );
}