import {
  useEffect,
  useState,
} from "react";

import StoryCard from "./StoryCard";

import {
  useTranslation,
} from "react-i18next";

import { supabase } from "../../lib/supabase";
import { localizeContent } from "../../lib/localizedContent";

export default function StoriesGrid() {

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