import {
  useEffect,
  useState,
} from "react";

export default function EditorialGrid() {

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

  return (

    <section className="px-6 lg:px-20 pb-32">

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

      <div className="grid lg:grid-cols-2 gap-20">

        {articles.slice(1).map(
          (article) => (

            <article
              key={article.id}
              className="group"
            >

              <div className="overflow-hidden mb-10 h-[650px]">

                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-[1800ms]"
                />

              </div>

              <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-6">

                {article.category}

              </p>

              <h3 className="text-4xl lg:text-5xl font-light leading-tight mb-8">

                {article.title}

              </h3>

              <p className="text-lg opacity-60 leading-relaxed">

                {article.excerpt}

              </p>

            </article>

          )

        )}

      </div>

    </section>

  );
}