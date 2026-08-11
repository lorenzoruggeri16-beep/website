import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import SEO from "../components/SEO";
import PageTransition from "../components/ui/PageTransition";

export default function BookingConfirmed() {
  return (
    <PageTransition>
      <SEO
        title="Golden Light Studio — Booking Confirmed"
        description="Your photography session with Golden Light Studio has been confirmed."
        url="https://goldenlight.studio/booking-confirmed"
      />

      <main className="relative flex min-h-[100svh] overflow-hidden bg-[#0B0B0B] px-6 py-7 text-[#F7F7F5] sm:px-10 sm:py-9 lg:px-20 lg:py-12">
        <header className="absolute left-6 top-7 sm:left-10 sm:top-9 lg:left-20 lg:top-12">
          <Link to="/" aria-label="Golden Light Studio home" className="flex items-center gap-3 sm:gap-4">
            <picture className="block">
              <source srcSet="/images/logo-white-nav.avif" type="image/avif" />
              <img
                src="/images/logo-white.png"
                alt="Golden Light Studio"
                className="h-8 w-auto sm:h-10"
              />
            </picture>
            <span className="hidden text-[12px] font-light uppercase tracking-[0.28em] min-[420px]:inline sm:text-[15px] sm:tracking-[0.34em]">
              Golden Light Studio
            </span>
          </Link>
        </header>

        <section aria-labelledby="booking-confirmed-title" className="mx-auto flex w-full max-w-2xl items-center justify-center py-24 text-center sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 id="booking-confirmed-title" className="text-[clamp(3.5rem,12vw,6.5rem)] font-light leading-[0.9] tracking-[-0.03em]">
              Thank you.
            </h1>

            <div className="mx-auto my-7 h-px w-16 bg-[#C8A55A] sm:my-9 sm:w-20" />

            <p className="text-xl font-light leading-tight sm:text-2xl lg:text-3xl">
              Your session is confirmed.
            </p>

            <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-[#F7F7F5]/80 sm:mt-9 sm:text-lg">
              Thank you for choosing Golden Light Studio. Your booking has been received successfully. We will contact you shortly to confirm the details of your session.
            </p>

            <Link
              to="/"
              className="mt-10 inline-flex border border-[#C8A55A] px-7 py-3 text-[11px] uppercase tracking-[0.24em] text-[#F7F7F5] transition-all duration-500 hover:bg-[#C8A55A] hover:text-[#0B0B0B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F7F5] sm:mt-12 sm:px-8 sm:py-4 sm:text-xs sm:tracking-[0.3em]"
            >
              Back to Golden Light Studio
            </Link>
          </motion.div>
        </section>
      </main>
    </PageTransition>
  );
}