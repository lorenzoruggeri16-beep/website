import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FadeIn from "../ui/FadeIn";
import { supabase } from "../../lib/supabase";
import {
  getImageAltText,
  localizeContent,
} from "../../lib/localizedContent";

export default function GalleryPreview() {

  const { t, i18n } =
    useTranslation();

  const [stories,
    setStories] =
    useState([]);

  useEffect(() => {

    const fetchStories =
      async () => {

        const {
          data,
          error,
        } = await supabase

          .from("portfolio")

          .select("*")

          .eq(
            "deleted",
            false
          )

          .order(
            "created_at",
            {
              ascending: false,
            }
          )

          .limit(3);

        if (error) {

          return;

        }

        setStories(
          data.map((item) => ({
            ...item,
            ...localizeContent(item, i18n.language),
          }))
        );

      };

    fetchStories();

  }, [i18n.language]);

  return (

    <section className="bg-[#f8f6f2] px-6 py-16 sm:px-8 sm:py-20 md:px-12">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <FadeIn className="mb-12 text-center sm:mb-16 lg:mb-20">

          <p
            className="
              uppercase
              tracking-[0.5em]
              text-[11px]
              opacity-60
              mb-6
            "
          >
            {t("featured_stories")}
          </p>

          <p
            className="
              max-w-2xl
              mx-auto
              text-lg
              leading-relaxed
              opacity-70
            "
          >
            {t("featured_description")}
          </p>

        </FadeIn>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {stories.map((item, index) => (

            <FadeIn
              key={item.id}
              delay={index * 0.15}
            >

              <Link
                to={`/portfolio/${item.slug || item.id}`}
                className="group block"
              >

                {/* IMAGE */}
                <div className="overflow-hidden bg-black">

                  <img
                    src={item.cover_image}
                    alt={getImageAltText(item, item.cover_image, i18n.language, item.title)}
                    loading="lazy"
                    decoding="async"
                    className="
                      w-full
                      h-[380px]
                      sm:h-[460px]
                      lg:h-[520px]
                      object-cover
                      transition-all
                      duration-[2500ms]
                      group-hover:scale-[1.04]
                    "
                  />

                </div>

                {/* CONTENT */}
                <div className="pt-8">

                  <p
                    className="
                      uppercase
                      tracking-[0.35em]
                      text-[10px]
                      opacity-40
                      mb-4
                    "
                  >
                    {item.location}
                  </p>

                  <h3
                    className="
                      text-2xl
                      sm:text-3xl
                      font-light
                      leading-tight
                      mb-6
                    "
                  >
                    {item.title}
                  </h3>

                  <div
                    className="
                      w-16
                      h-px
                      bg-[#c6a66a]
                      mb-6
                    "
                  />

                  <span
                    className="
                      uppercase
                      tracking-[0.35em]
                      text-[11px]
                      hover:tracking-[0.45em]
                      transition-all
                      duration-500
                    "
                  >
                    {t("view_story")}
                  </span>

                </div>

              </Link>

            </FadeIn>

          ))}

        </div>

        {/* CTA */}
        <FadeIn
          delay={0.4}
          className="mt-14 text-center sm:mt-20"
        >

          <Link
            to="/portfolio"
            className="
              inline-flex
              items-center
              border
              border-black
              px-8
              py-4
              uppercase
              tracking-[0.3em]
              text-xs
              hover:bg-black
              hover:text-white
              transition-all
              duration-500
            "
          >
            {t("view_portfolio")}
          </Link>

        </FadeIn>

      </div>

    </section>

  );

}