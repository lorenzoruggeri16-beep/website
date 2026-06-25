import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";
import FadeIn from "../components/ui/FadeIn";

import SEO from "../components/SEO";

import { useTranslation } from "react-i18next";

export default function About() {

  const { t } = useTranslation();

  return (

    <PageTransition>

      <SEO
        title="About Golden Light Studio | Luxury Photographer Tenerife"
        description="Meet the photographers behind Golden Light Studio. Creating timeless fine art and cinematic photography in Tenerife inspired by emotion, light and authentic human connection."
        url="/about"
      />

      <main className="bg-[#f8f6f2] text-black min-h-screen">

        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-32 px-6 md:px-12 text-center">

          <FadeIn>

            <p className="uppercase tracking-[0.4em] text-xs mb-6 text-[#c6a66a]">
              {t("about")}
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-light leading-none">

              {t("about_title_1")}

            </h1>

            <p className="max-w-2xl mx-auto mt-10 text-lg md:text-xl opacity-60 leading-relaxed">

              {t("about_subtitle")}

            </p>

          </FadeIn>

        </section>

        {/* Split Portrait Section */}
        <section className="px-6 md:px-12 pb-24">

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-16 items-center">

            {/* LEFT */}
            <FadeIn>

              <div className="flex flex-col items-center text-center -translate-y-9 pt-2">

                <img
                  src="/images/about-left.jpg"
                  alt=""
                  className="w-[320px] h-[320px] object-cover rounded-full mb-9"
                />

                <div className="relative group inline-block mb-6">

                  <h3 className="name-shine text-3xl font-light text-[#b68d40]">
                    Lorenzo Ruggeri
                  </h3>

                  <span className="shne" />

                  <p className="uppercase tracking-[0.35em] text-[10px] text-[#c6a66a] mt-3 mb-6">

                    Photographer & Creative Director

                  </p>

                </div>

                <p className="text-base leading-relaxed opacity-85 max-w-sm">

                  {t("about_lorenzo")}

                </p>

              </div>

            </FadeIn>

            {/* GOLD LINE */}
            <div className="hidden md:flex justify-center">

              <div className="w-px h-[520px] bg-[#c6a769] -mt-2" />

            </div>

            {/* RIGHT */}
            <FadeIn delay={0.2}>

              <div className="flex flex-col items-center text-center -translate-y-12 pt-2">

                <img
                  src="/images/about-right.jpg"
                  alt=""
                  className="w-[320px] h-[320px] object-cover rounded-full mb-8"
                />

                <div className="relative group inline-block mb-6">

                  <h3
                    className="name-shine text-3xl font-light text-[#b68d40]"
                  >
                    Giorgia Labrozzi
                  </h3>

                  <span className="shne" />

                  <p className="uppercase tracking-[0.35em] text-[10px] text-[#c6a66a] mt-3 mb-6">

                    Photographer & Cinematic Storyteller

                  </p>

                </div>

                <p className="text-base leading-relaxed opacity-85 max-w-sm">

                  {t("about_giorgia")}

                </p>

              </div>

            </FadeIn>

          </div>

        </section>

        {/* Our Story */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-24">

          <FadeIn>

            <p className="uppercase tracking-[0.45em] text-xs mb-8 text-center text-[#c6a66a]">

              {t("about_story_label")}

            </p>

            <div className="w-16 h-px bg-[#c6a66a] mx-auto mb-10" />

            <h2 className="text-4xl md:text-6xl font-light leading-tight text-center mb-10">

              {t("about_story_title")}

            </h2>

          </FadeIn>

          <FadeIn delay={0.2}>

            <div className="space-y-12 text-[18px] leading-[2] opacity-85 max-w-5xl mx-auto text-center">

              <p>
                {t("about_story_text_1")}
              </p>

              <p>
                {t("about_story_text_2")}
              </p>

              <p>
                {t("about_story_text_3")}
              </p>

            </div>

          </FadeIn>

        </section>

        {/* Philosophy */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-24">

          <FadeIn>

            <p className="uppercase tracking-[0.45em] text-xs mb-8 text-center text-[#c6a66a]">

                {t("about_philosophy")}

            </p>

            <div className="w-16 h-px bg-[#c6a66a] mx-auto mb-10" />

            <h2 className="text-4xl md:text-6xl font-light leading-tight text-center mb-16">

              {t("about_philosophy_title")}

            </h2>

          </FadeIn>

          <FadeIn delay={0.2}>

            <div className="space-y-8 text-[18px] leading-[1.9] opacity-85 max-w-4xl mx-auto text-center">
              <p>
                {t("about_text_1")}
              </p>

              <p>
                {t("about_text_2")}
              </p>

              <p>
                {t("about_text_3")}
              </p>

            </div>

          </FadeIn>

        </section>

        <Footer />

      </main>

    </PageTransition>

  );

}