import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

export default function Services() {

  const [featuredPortfolio,
    setFeaturedPortfolio] =
    useState(null);

  // LOAD RANDOM PORTFOLIO
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

        const randomItem =

          portfolio[
            Math.floor(
              Math.random() *
              portfolio.length
            )
          ];

        setFeaturedPortfolio(
          randomItem
        );

      }

    }

  }, []);

  return (

    <section className="bg-[#f8f6f2] px-6 md:px-12 py-40 overflow-hidden">

      <div className="grid md:grid-cols-2 gap-20 items-center">

        {/* IMAGE */}
        <div className="overflow-hidden relative group">

          {featuredPortfolio && (

            <img
              src={
                featuredPortfolio.image
              }
              alt={
                featuredPortfolio.title
              }
              className="w-full h-[700px] object-cover group-hover:scale-[1.03] transition duration-[2000ms]"
            />

          )}

          {/* LIGHT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-60 pointer-events-none" />

        </div>

        {/* CONTENT */}
        <div className="max-w-xl">

          <p className="uppercase tracking-[0.4em] text-xs mb-6 opacity-40">

            Featured Experience

          </p>

          <h2 className="text-5xl md:text-7xl leading-none font-light mb-10">

            {featuredPortfolio
              ?.title || (
              <>
                Honest
                <br />
                storytelling.
              </>
            )}

          </h2>

          <div className="w-32 h-px bg-[#c6a66a] mb-10" />

          <p className="text-xl leading-relaxed opacity-70 max-w-lg mb-12">

            {featuredPortfolio
              ?.description ||

              `Blending documentary emotion with refined editorial aesthetics, creating timeless imagery with cinematic depth and intentional composition.`}

          </p>

          {/* BUTTON */}
          {featuredPortfolio && (

            <Link
              to={`/portfolio/${featuredPortfolio.slug || featuredPortfolio.id}`}
            >

              <button className="uppercase tracking-[0.3em] text-sm border border-black px-8 py-4 hover:bg-black hover:text-white transition duration-500">

                Explore Session

              </button>

            </Link>

          )}

        </div>

      </div>

    </section>
  );
}