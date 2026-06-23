import {
  useEffect,
  useState,
} from "react";

import StoryCard from "./StoryCard";

import {
  useTranslation,
} from "react-i18next";

import { supabase } from "../../lib/supabase";

export default function StoriesGrid() {

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

  return (

    <section className="px-6 lg:px-20 pb-24">

      {/* TOP */}
      <div className="flex items-end justify-between mb-12">

        <div>

          <p className="uppercase tracking-[0.4em] text-xs text-[#c6a66a] mb-4">

            {t("editorial_archive")}

          </p>

          <h2 className="text-4xl lg:text-[56px] font-light leading-none">

            {t("latest_stories")}

          </h2>

        </div>

        <div className="hidden lg:block w-32 h-px bg-[#c6a66a]" />

      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">

        {articles.slice(1).map(
          (article) => (

            <StoryCard
              key={article.id}
              article={article}
            />

          )
        )}

      </div>

    </section>

  );

}