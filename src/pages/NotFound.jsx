import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 | Golden Light Studio"
        description="The page you are looking for doesn't exist."
        url="/404"
        noIndex
      />

      <main className="bg-[#f6f2eb] min-h-screen overflow-hidden">

        <Navbar />

        <section className="min-h-screen flex items-center justify-center px-6 lg:px-20">

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="text-center max-w-4xl"
          >

            <p className="uppercase tracking-[0.45em] text-xs text-[#c6a66a] mb-8">
              Golden Light Studio
            </p>

            <h1 className="text-[120px] lg:text-[220px] leading-none font-light text-black/10">
              404
            </h1>

            <h2 className="text-4xl lg:text-6xl font-light leading-tight mb-8">
              This page couldn't be found.
            </h2>

            <p className="text-lg opacity-60 leading-relaxed max-w-2xl mx-auto mb-14">
              The page you're looking for may have been moved,
              renamed or no longer exists.
              Continue exploring our photography experiences.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">

              <Link
                to="/"
                className="
                  border
                  border-[#c6a66a]
                  px-10
                  py-5
                  uppercase
                  tracking-[0.35em]
                  text-xs
                  text-[#c6a66a]
                  hover:bg-[#c6a66a]
                  hover:text-black
                  transition-all
                  duration-500
                "
              >
                Back Home
              </Link>

              <Link
                to="/portfolio"
                className="
                  border
                  border-black/10
                  px-10
                  py-5
                  uppercase
                  tracking-[0.35em]
                  text-xs
                  hover:bg-black
                  hover:text-white
                  transition-all
                  duration-500
                "
              >
                Explore Portfolio
              </Link>

            </div>

          </motion.div>

        </section>

        <Footer />

      </main>
    </>
  );
}
