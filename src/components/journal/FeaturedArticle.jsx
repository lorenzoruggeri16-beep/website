import {
  useEffect,
  useState,
} from "react";

export default function FeaturedArticle() {

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

    }

  }, []);

  if (!articles.length)
    return null;

  const article =
    articles[0];

  return (

    <section className="px-6 lg:px-20 pb-32">

      <div className="grid lg:grid-cols-2 bg-white overflow-hidden">

        {/* IMAGE */}
        <div className="h-[800px] overflow-hidden">

          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-[1.03] transition duration-[2000ms]"
          />

        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-center p-10 lg:p-24">

          <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-8">

            Featured Story

          </p>

          <h2 className="text-5xl lg:text-7xl font-light leading-[1.05] mb-10">

            {article.title}

          </h2>

          <p className="text-lg opacity-60 leading-relaxed mb-12">

            {article.excerpt}

          </p>

          <button className="uppercase tracking-[0.35em] text-xs hover:opacity-50 transition duration-500">

            Read Story

          </button>

        </div>

      </div>

    </section>

  );
}