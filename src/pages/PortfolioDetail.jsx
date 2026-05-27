import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import useEmblaCarousel
from "embla-carousel-react";

import Navbar
from "../components/layout/Navbar";

import Footer
from "../components/layout/Footer";

import PageTransition
from "../components/ui/PageTransition";

export default function PortfolioDetail() {

  const { slug } =
    useParams();

  const [portfolio,
    setPortfolio] =
    useState(null);

  const [moreSessions,
    setMoreSessions] =
    useState([]);

  const [
  emblaRef,
  emblaApi,
] = useEmblaCarousel({

  loop: true,
  align: "center",

});



  // LOAD PORTFOLIO
  useEffect(() => {

    const savedPortfolio =
      localStorage.getItem(
        "portfolio"
      );

    if (savedPortfolio) {

      const portfolioItems =
        JSON.parse(
          savedPortfolio
        );

      // CURRENT
      const foundPortfolio =

        portfolioItems.find(
          (item) =>

            (
              item.slug ||

              item.id
                .toString()

            ) === slug

        );

      setPortfolio(
        foundPortfolio
      );

      // RELATED
      const related =

        portfolioItems
          .filter(

            (item) =>

              (
                item.slug ||

                item.id
                  .toString()

              ) !== slug

          )
          .slice(0, 3);

      setMoreSessions(
        related
      );

    }

  }, [slug]);

  // LOADING
  if (!portfolio) {

    return (

      <main className="min-h-screen bg-[#f6f2eb] flex items-center justify-center">

        <p className="uppercase tracking-[0.35em] text-xs opacity-40">

          Loading Session...

        </p>

      </main>

    );

  }

  return (

    <PageTransition>

      <main className="bg-[#f6f2eb] overflow-hidden">

        <Navbar />

        {/* HERO */}
        <section className="relative h-screen overflow-hidden">

          <img
            src={
              portfolio.coverImage ||
              portfolio.image
            }
            alt={portfolio.title}
            className="w-full h-full object-cover scale-[1.02]"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/25" />

          {/* TEXT */}
          <div className="absolute bottom-0 left-0 w-full px-6 lg:px-20 pb-24 z-10">

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
                duration: 1,
              }}
            >

              <p className="uppercase tracking-[0.45em] text-xs text-white/70 mb-8">

                {portfolio.location}

              </p>

              <h1 className="text-6xl lg:text-[140px] leading-none font-light text-white max-w-6xl">

                {portfolio.title}

              </h1>

            </motion.div>

          </div>

        </section>

        {/* INTRO */}
        <section className="px-6 lg:px-20 py-32">

          <div className="grid lg:grid-cols-12 gap-20">

            {/* LEFT */}
            <div className="lg:col-span-4">

              <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-8">

                Cinematic Session

              </p>

              <div className="w-32 h-px bg-[#c6a66a] mb-10" />

            </div>

            {/* RIGHT */}
            <div className="lg:col-span-8">

              <p className="text-2xl lg:text-4xl font-light leading-relaxed opacity-80 max-w-4xl">

                {portfolio.description}

              </p>

            </div>

          </div>

        </section>

        {/* CINEMATIC GALLERY */}
        <section className="pb-32 overflow-hidden">

          <div
           ref={emblaRef}
           className="overflow-hidden px-6 lg:px-20"
           >
            <div className="flex gap-6">

            {portfolio.images?.map(
              (image, index) => (

                <motion.div
                 key={index}
                 initial={{
                  opacity: 0,
                  y: 60,
                 }}
                 whileInView={{
                  opacity: 1,
                  y: 0,
                 }}
                 transition={{
                  duration: 1,
                 }}
                 viewport={{
                  once: true,
                 }}
                 className="
                 
                 flex-shrink-0
                 
                 w-[92vw]
                 md:w-[75vw]
                 lg:w-[55vw]
                 
                 snap-center
                 
                 "
                 >
                
                <div className="overflow-hidden">

                  <img
                   src={image}
                   alt=""
                   className="
                   
                   w-full
                   h-[70vh]
                   lg:h-[85vh]
                   
                   object-cover
                   
                   hover:scale-[1.02]
                   
                   transition
                   duration-[2500ms]
                   
                   "
                   />

                </div>

              </motion.div>

              ))}

            </div>

           </div>

        </section>


        {/* MORE SESSIONS */}
        <section className="px-6 lg:px-20 pb-32">

          <div className="flex items-center justify-between mb-20">

            <div>

              <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-5">

                Continue Exploring

              </p>

              <h2 className="text-5xl lg:text-7xl font-light">

                More Sessions

              </h2>

            </div>

            <div className="hidden lg:block w-40 h-px bg-[#c6a66a]" />

          </div>

          <div className="grid lg:grid-cols-3 gap-10">

            {moreSessions.map(
              (item) => (

                <Link
                  key={item.id}
                  to={`/portfolio/${item.slug || item.id}`}
                  className="group"
                >

                  <article className="overflow-hidden bg-white hover:-translate-y-2 transition duration-700">

                    <div className="overflow-hidden">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[450px] object-cover group-hover:scale-[1.03] transition duration-[1800ms]"
                      />

                    </div>

                    <div className="p-8">

                      <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-5">

                        {item.location}

                      </p>

                      <h3 className="text-3xl font-light leading-tight">

                        {item.title}

                      </h3>

                    </div>

                  </article>

                </Link>

              )

            )}

          </div>

        </section>

        {/* CINEMATIC STRIP */}
        <section className="pb-32 overflow-hidden">

          <div className="border-y border-[#c6a66a]/30 py-10 whitespace-nowrap">

            <div className="flex gap-20 text-[12vw] font-light opacity-[0.06] uppercase tracking-[0.08em] animate-marquee">

              <span>

                Golden Light Studio

              </span>

              <span>

                Cinematic Memories

              </span>

              <span>

                Tenerife Photography

              </span>

              <span>

                Editorial Sessions

              </span>

            </div>

          </div>

        </section>

        <Footer />

      </main>

    </PageTransition>

  );
}