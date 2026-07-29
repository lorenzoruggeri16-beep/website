import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/SEO";
import Loader from "../components/ui/Loader";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";
import {
  getImageAltText,
  localizeContent,
} from "../lib/localizedContent";

export default function JournalArticle() {

  const { slug } = useParams();
  const { i18n } = useTranslation();

  const [article,
    setArticle] =
    useState(null);

  useEffect(() => {

    const fetchArticle =
      async () => {

        const {
          data,
          error,
        } = await supabase

          .from("articles")

          .select("*")

          .eq(
            "slug",
            slug
          )

          .single();

        if (error) {

          return;

        }

        const localized = localizeContent(data, i18n.language);

        setArticle({

          id:
            data.id,

          slug:
            data.slug,

          title:
            localized.title,

          category:
            localized.category,

          excerpt:
            localized.excerpt,

          coverImage:
            data.cover_image,

          blocks:
            localized.blocks,

          seo:
            localized.seo,

          imageAltText:
            localized.imageAltText,

        });

      };

    fetchArticle();

  }, [slug, i18n.language]);

  if (!article) return <Loader />;

  return (

    <>

      <SEO
        title={article.seo?.title || `${article.title} | Golden Light Studio`}
        description={
          article.seo?.description ||
          article.excerpt ||
          "Editorial photography stories, inspiration and guidance from Golden Light Studio."
        }
        url={`/journal/${article.slug}`}
        image={article.coverImage}
      />

      <main className="bg-[#f6f2eb] min-h-screen overflow-hidden">

        <Navbar />

        {/* HERO */}
        <section className="relative h-[72svh] min-h-[500px] overflow-hidden sm:h-[78svh] lg:h-screen lg:min-h-0">

          <img
            src={article.coverImage}
            alt={getImageAltText(article, article.coverImage, i18n.language, article.title)}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-12 left-5 sm:bottom-16 sm:left-8 lg:bottom-20 lg:left-20 text-white max-w-4xl">

            <p className="uppercase tracking-[0.28em] text-[10px] opacity-70 mb-4 sm:tracking-[0.35em] sm:text-xs sm:mb-6">

              {article.category}

            </p>

            <h1 className="text-[clamp(2.55rem,10vw,4rem)] sm:text-6xl lg:text-8xl font-light leading-[0.95] mb-5 sm:mb-8">

              {article.title}

            </h1>

            <p className="max-w-xl text-base leading-relaxed opacity-80 sm:text-lg lg:max-w-2xl lg:text-2xl">

              {article.excerpt}

            </p>

          </div>

        </section>

        {/* CONTENT */}
        <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-20 lg:py-24">

          <div className="max-w-3xl mx-auto">

            <div className="space-y-12 sm:space-y-16 lg:space-y-20">

              {article.blocks?.map(
                (block, index) => {

                  // TEXT
                  if (block.type === "text") {

                    return (

                      <p
                        key={index}
                        className="text-base leading-[1.9] sm:text-lg lg:text-xl lg:leading-[2] opacity-70 whitespace-pre-line"
                      >

                        {block.content}

                      </p>

                    );

                  }

                  // IMAGE
                  if (block.type === "image") {

                    return (

                      <div
                        key={index}
                        className="overflow-hidden"
                      >

                        <img
                          src={block.image}
                          alt={getImageAltText(article, block.image, i18n.language, article.title)}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-auto object-cover"
                        />

                      </div>

                    );

                  }

                  // QUOTE
                  if (block.type === "quote") {

                    return (

                      <blockquote
                        key={index}
                        className="border-l border-[#c6a66a] py-3 pl-5 text-2xl font-light italic leading-[1.35] opacity-80 sm:pl-8 sm:text-3xl lg:py-4 lg:pl-10 lg:text-5xl lg:leading-[1.4]"
                      >

                        {block.content}

                      </blockquote>

                    );

                  }

                  return null;

                }
              )}

            </div>

          </div>

        </section>

        {/* EDITORIAL CTA */}
        <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-20 lg:pb-32">

          <div className="max-w-4xl mx-auto text-center">

            <div className="mx-auto mb-8 h-px w-16 bg-[#c6a66a] sm:mb-12 sm:w-24" />

            <p className="uppercase tracking-[0.4em] text-xs text-[#c6a66a] mb-8">

              Continue Exploring

            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light leading-tight mb-10">

              Every story deserves
              <br />
              to be remembered.

            </h2>

            <p className="text-base opacity-60 leading-relaxed sm:text-lg max-w-2xl mx-auto mb-12">

              Discover more editorials, love stories and
              timeless moments captured through the
              Golden Light Studio experience.

            </p>

            <a
              href="/journal"
              className="uppercase tracking-[0.35em] text-xs border border-[#c6a66a] px-8 py-4 inline-block hover:bg-[#c6a66a] hover:text-white transition-all duration-500"
            >

              Explore The Journal

            </a>

          </div>

        </section>

        <Footer />

      </main>

    </>

  );

}
