import { motion } from "framer-motion";

export default function WelcomeScreen({
  userName,
}) {

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#f5f2ec] z-[200] flex items-center justify-center"
    >

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
        }}
        className="text-center"
      >

        <p className="uppercase tracking-[0.4em] text-xs opacity-40 mb-6">

          Golden Light Studio

        </p>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-light">

          Welcome {userName}

        </h1>

      </motion.div>

    </motion.div>

  );
}