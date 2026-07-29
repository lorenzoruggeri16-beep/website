import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  useTranslation,
} from "react-i18next";

import { supabase } from "../../lib/supabase";
import { localizeContent } from "../../lib/localizedContent";

export default function FeaturedStory() {

  const { t, i18n } =
    useTranslation();

  const [articles,
    setArticles] =
    useState([]);

  useEffect(() => {

    const fetchArticles =
      async () => {

        const {
          data,
          error,
        } = await supabase

          .from("articles")

          .select("*")

          .eq("deleted", false)

          .order(
            "created_at",
            {
              ascending: false,
            }
          );

        if (error) {

          return;

        }

        const formattedArticles =

          data.map(
            (article) => {
              const localized = localizeContent(article, i18n.language);

              return ({

              id:
                article.id,

              slug:
                article.slug,

              title:
                localized.title,

              category:
                localized.category,

              excerpt:
                localized.excerpt,

              coverImage:
                article.cover_image,

              blocks:
                localized.blocks,

              });
            }
          );

        setArticles(
          formattedArticles
        );

      };

    fetchArticles();

  }, [i18n.language]);

  const article =
    articles[0];

  if (!article)
    return null;

  return (

    <section className="px-6 pb-16 sm:px-8 sm:pb-20 lg:px-20">

      <div className="max-w-7xl mx-auto">

        <p className="uppercase tracking-[0.4em] text-xs text-[#c6a66a] mb-8">

          {t("featured_editorial")}

        </p>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] items-center gap-12 lg:gap-20">

          {/* IMAGE */}
          <div className="h-[320px] sm:h-[420px] lg:h-[600px] overflow-hidden bg-[#e8e0d4]">

            <img
              src={
                article.coverImage
              }
              alt={article.title}
              fetchPriority="high"
              className="

                w-full
                h-full
                object-cover

                hover:scale-[1.02]

                transition-all
                duration-[2500ms]

              "
            />

          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center max-w-xl">

            <p className="uppercase tracking-[0.35em] text-xs text-[#c6a66a] mb-6">

              {article.category}

            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-light leading-[1.05] mb-6">

              {article.title}

            </h2>

            <div className="w-20 h-px bg-[#c6a66a] mb-8" />

            <p className="text-base lg:text-lg opacity-60 leading-[1.9] mb-10">

              {article.excerpt}

            </p>

            <Link
              to={`/journal/${article.slug}`}
              className="uppercase tracking-[0.35em] text-[11px] flex items-center gap-4 hover:text-[#c6a66a] transition-all duration-500"
            >

              {t("read_story")}

              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />

            </Link>

          </div>

        </div>

      </div>

    </section>

  );

}