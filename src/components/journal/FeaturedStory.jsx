import { Link } from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  useTranslation,
} from "react-i18next";

import { supabase } from "../../lib/supabase";

export default function FeaturedStory() {

  const { t } =
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
            (article) => ({

              id:
                article.id,

              slug:
                article.slug,

              title:
                article.title,

              category:
                article.category,

              excerpt:
                article.excerpt,

              coverImage:
                article.cover_image,

              blocks:
                article.blocks,

            })
          );

        setArticles(
          formattedArticles
        );

      };

    fetchArticles();

  }, []);

  const article =
    articles[0];

  if (!article)
    return null;

  return (

    <section className="px-6 lg:px-20 pb-32">

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-16">

        {/* IMAGE */}
        <div className="h-[620px] lg:h-[780px] overflow-hidden bg-[#e8e0d4]">

          <img
            src={
              article.coverImage ||
              article.coverImage
            }
            alt={article.title}
            loading="lazy"
            decoding="async"
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

          <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-8">

            {t("featured_editorial")}

          </p>

          <h2 className="text-4xl lg:text-6xl font-light leading-[1.05] mb-8">

            {article.title}

          </h2>

          <p className="text-base lg:text-lg opacity-60 leading-[1.9] mb-10 max-w-lg">

            {article.excerpt}

          </p>

          <Link
            to={`/journal/${article.slug}`}
            className="uppercase tracking-[0.35em] text-[10px] flex items-center gap-4 hover:opacity-50 transition-all duration-500"
          >

            {t("read_story")}

            <span>→</span>

          </Link>

        </div>

      </div>

    </section>

  );

}