import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useTranslation } from "react-i18next";
import { localizeContent } from "../../lib/localizedContent";

const PORTFOLIO_CATEGORIES = [
  { id: "Portrait Sessions", translationKey: "category_portraits" },
  { id: "Commercial", translationKey: "category_commercial" },
  { id: "Weddings", translationKey: "category_weddings" },
  { id: "Events", translationKey: "category_events" },
];

export default function PortfolioEditorialGrid() {

  const { t, i18n } =
    useTranslation();

  const [portfolioItems, setPortfolioItems] =
    useState([]);

  const [activeCategory, setActiveCategory] =
    useState("Portrait Sessions");

  useEffect(() => {

    const fetchPortfolio =
      async () => {

        const {
          data,
          error,
        } = await supabase

          .from("portfolio")

          .select("*")

          .eq("deleted", false)

          .order("created_at", {
            ascending: false,
          });

        if (error) {
        
          return;
        }

        setPortfolioItems(

          data.map((item) => {
            const localized = localizeContent(item, i18n.language);

            return ({

            ...item,

            title: localized.title,
            location: localized.location,
            description: localized.description,

            coverImage:
              item.cover_image,

            images:
              item.gallery || [],

            });
          })

        );

      };

    fetchPortfolio();

  }, [i18n.language]);

  const groupedPortfolio = {

     Commercial: 
      portfolioItems.filter(
        (item) => 
          item.category === 
          "Commercial"
      ),

    Weddings:
      portfolioItems.filter(
        (item) =>
          item.category ===
          "Weddings"
      ),

    Events:
      portfolioItems.filter(
        (item) =>
          item.category ===
          "Events"
      ),

    "Portrait Sessions":
      portfolioItems.filter(
        (item) =>
          item.category ===
          "Portrait Sessions"
      )

  };

  return (

    <section className="px-0 py-0 bg-[#f6f2eb]">

      <div className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-20 lg:pb-32">
        <h2 className="sr-only">ç
          {t("portfolio_gallery")}
        </h2>

        {/* CATEGORY NAV */}
        <div className="mb-10 grid sm:mb-14 grid-cols-2 gap-x-7 gap-y-1 border-y border-black/10 py-6 lg:hidden">
          {PORTFOLIO_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`border-b py-4 text-left text-[10px] uppercase tracking-[0.2em] transition-colors ${
                activeCategory === category.id
                  ? "border-[#c6a66a] text-black"
                  : "border-black/10 text-black/55"
              }`}
            >
              {t(category.translationKey)}
            </button>
          ))}
        </div>

        <div className="hidden justify-center lg:flex">
          <div className="mb-24 flex flex-wrap justify-center gap-16 border-b border-black/10 py-10">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={`relative pb-4 text-base uppercase tracking-[0.35em] transition-all duration-500 ${
                  activeCategory === category.id
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {t(category.translationKey)}
                <span
                  className={`absolute bottom-[-2px] left-0 h-px bg-[#c6a66a] transition-all duration-700 ${
                    activeCategory === category.id
                      ? "w-full opacity-100"
                      : "w-0 opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {groupedPortfolio[
            activeCategory
          ]?.map((item) => (

            <motion.div
              whileHover={{
                y: -10,
              }}
              key={item.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
              }}
            >

              <Link
                to={`/portfolio/${item.slug || item.id}`}
                className="group block"
              >

                {/* IMAGE */}
                <div className="relative overflow-hidden bg-black">

                  <img
                    src={
                      item.coverImage ||
                      item.image
                    }
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-[1.04] transition duration-[2500ms]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition duration-700" />

                </div>

                {/* CONTENT */}
                <div className="pt-6 sm:pt-8 transition-all duration-700 group-hover:translate-y-[-6px]">

                  <p className="uppercase tracking-[0.35em] text-[10px] opacity-40 mb-4">

                    {item.location}

                  </p>

                  <h3 className="text-3xl font-light leading-tight mb-6">

                    {item.title}

                  </h3>

                  <div className="w-16 h-px bg-[#c6a66a] mb-6" />

                  <span className="uppercase tracking-[0.35em] text-[11px] hover:tracking-[0.45em] transition-all duration-500">

                    {t("view_story")}

                  </span>

                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </div>

    </section>

  );

}