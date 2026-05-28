import { Link } from "react-router-dom";

export default function StoryCard({ article }) {

  return (

    <Link
      to={`/journal/${article.slug}`}
      className="group block"
    >

      {/* IMAGE */}
      <div className="overflow-hidden mb-8 h-[520px] bg-[#e8e0d4]">

        <img
          src={
            article.coverImage ||
            article.image
          }
          alt={article.title}
          className="

            w-full
            h-full
            object-cover

            group-hover:scale-[1.03]

            transition-all
            duration-[1800ms]

          "
        />

      </div>

      {/* CATEGORY */}
      <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-5">

        {article.category}

      </p>

      {/* TITLE */}
      <h3 className="text-3xl lg:text-4xl font-light leading-[1.1] mb-6">

        {article.title}

      </h3>

      {/* EXCERPT */}
      <p className="text-lg opacity-60 leading-relaxed max-w-xl">

        {article.excerpt}

      </p>

    </Link>

  );

}