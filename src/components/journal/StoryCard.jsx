import { Link } from "react-router-dom";

export default function StoryCard({ article }) {

  return (

    <Link
      to={`/journal/${article.slug}`}
      className="group block transition-all duration-700"
    >

      {/* IMAGE */}
      <div className="overflow-hidden mb-5 h-[340px] sm:mb-6 sm:h-[420px] lg:h-[460px] bg-[#e8e0d4]">

        <img
          src={
            article.coverImage ||
            article.image
          }
          alt={article.title}
          loading="lazy"
          decoding="async"
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
      <p className="uppercase tracking-[0.35em] text-xs text-[#c6a66a] mb-4">

        {article.category}

      </p>

      {/* TITLE */}
      <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-light leading-[1.15] mb-5 transition-all duration-500 group-hover:text-[#c6a66a]">

        {article.title}

      </h3>

      {/* EXCERPT */}
      <p className="text-base lg:text-lg opacity-60 leading-[1.9] max-w-xl">

        {article.excerpt}

      </p>

    </Link>

  );

}