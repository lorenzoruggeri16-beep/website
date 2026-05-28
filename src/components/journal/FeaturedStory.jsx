import { Link } from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import journalData from "../../data/journalData";

export default function FeaturedStory() {

  const [articles,
    setArticles] =
    useState([]);

  useEffect(() => {

    const savedArticles =
      localStorage.getItem(
        "articles"
      );

    if (savedArticles) {

      setArticles(
        JSON.parse(
          savedArticles
        )
      );

    } else {

      setArticles(
        journalData
      );

    }

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

            Featured Editorial

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

            Read Story

            <span>→</span>

          </Link>

        </div>

      </div>

    </section>

  );

}