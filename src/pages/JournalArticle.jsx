import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SEO from "../components/SEO";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

export default function JournalArticle() {

  const { slug } = useParams();

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

        setArticle({

          id:
            data.id,

          slug:
            data.slug,

          title:
            data.title,

          category:
            data.category,

          excerpt:
            data.excerpt,

          coverImage:
            data.cover_image,

          blocks:
            data.blocks,

        });

      };

    fetchArticle();

  }, [slug]);

  if (!article) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );

  }

  return (

    <>

      <SEO
        title={`${article.title} | Golden Light Studio`}
        description={
          article.excerpt ||
          "Editorial photography stories, inspiration and guidance from Golden Light Studio."
        }
        image={article.coverImage}
      />

      <main className="bg-[#f6f2eb] min-h-screen overflow-hidden">

        <Navbar />

        {/* HERO */}
        <section className="relative h-screen overflow-hidden">

          <img
            src={article.coverImage}
            alt={article.title}
            fetchPriority="high"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-20 left-6 lg:left-20 text-white max-w-4xl">

            <p className="uppercase tracking-[0.35em] text-xs opacity-70 mb-6">

              {article.category}

            </p>

            <h1 className="text-5xl lg:text-8xl font-light leading-[0.95] mb-8">

              {article.title}

            </h1>

            <p className="text-lg lg:text-2xl opacity-80 leading-relaxed max-w-2xl">

              {article.excerpt}

            </p>

          </div>

        </section>

        {/* CONTENT */}
        <section className="px-6 lg:px-20 py-24">

          <div className="max-w-3xl mx-auto">

            <div className="space-y-20">

              {article.blocks?.map(
                (block, index) => {

                  // TEXT
                  if (block.type === "text") {

                    return (

                      <p
                        key={index}
                        className="text-xl leading-[2] opacity-70 whitespace-pre-line"
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
                          alt=""
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
                        className="text-3xl lg:text-5xl font-light leading-[1.4] opacity-80 italic border-l border-[#c6a66a] pl-10 py-4"
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
        <section className="px-6 lg:px-20 pb-32">

          <div className="max-w-4xl mx-auto text-center">

            <div className="w-24 h-px bg-[#c6a66a] mx-auto mb-12" />

            <p className="uppercase tracking-[0.4em] text-xs text-[#c6a66a] mb-8">

              Continue Exploring

            </p>

            <h2 className="text-4xl lg:text-6xl font-light leading-tight mb-10">

              Every story deserves
              <br />
              to be remembered.

            </h2>

            <p className="text-lg opacity-60 leading-relaxed max-w-2xl mx-auto mb-12">

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