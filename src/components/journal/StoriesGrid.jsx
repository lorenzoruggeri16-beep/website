import {
  useEffect,
  useState,
} from "react";

import journalData from "../../data/journalData";

import StoryCard from "./StoryCard";

export default function StoriesGrid() {

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

  return (

    <section className="px-6 lg:px-20 pb-32">

      {/* TOP */}
      <div className="flex items-center justify-between mb-20">

        <div>

          <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-5">

            Editorial Archive

          </p>

          <h2 className="text-5xl lg:text-7xl font-light">

            Latest Stories

          </h2>

        </div>

        <div className="hidden lg:block w-40 h-px bg-[#c6a66a]" />

      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-16">

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