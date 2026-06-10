import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";
import FadeIn from "../components/ui/FadeIn";

import SEO from "../components/SEO";

export default function About() {

  return (

    <PageTransition>

      <SEO
        title="About Golden Light Studio | Luxury Photographer Tenerife"
        description="Meet the photographers behind Golden Light Studio. Creating timeless fine art and cinematic photography in Tenerife inspired by emotion, light and authentic human connection."
      />

      <main className="bg-[#f8f6f2] text-black min-h-screen">

        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-32 px-6 md:px-12 text-center">

          <FadeIn>

            <p className="uppercase tracking-[0.4em] text-xs mb-6">
              Sobre mí
            </p>

            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-light leading-none">

              Emoción,
              <br />
              luz y conexión.

            </h1>

          </FadeIn>

        </section>

        {/* Split Portrait Section */}
        <section className="px-6 md:px-12 pb-40">

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-16 items-center">

            {/* LEFT */}
            <FadeIn>

              <div className="flex flex-col items-center text-center -translate-y-9 pt-2">

                <img
                  src="/images/about-left.jpg"
                  alt=""
                  className="w-[320px] h-[320px] object-cover rounded-full mb-9"
                />

                <div className="relative group inline-block mb-4">

                  <h3 className="name-shine text-3xl font-light text-[#b68d40]">
                    Lorenzo Ruggeri
                  </h3>

                  <span className="shne" />

                </div>

                <p className="uppercase tracking-[0.3em] text-xs opacity-60 max-w-xs min-h-[60px] flex items-start justify-center">

                  Capturando momentos honestos
                  y emociones reales junto al océano.

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

                <div className="relative group inline-block mb-4">

                  <h3
                    className="name-shine text-3xl font-light mb-4 text-[#b68d40]"
                  >
                    Giorgia Labrozzi
                  </h3>

                  <span className="shne" />

                </div>

                <p className="uppercase tracking-[0.3em] text-xs opacity-60 max-w-xs">

                  Inspirado por la naturaleza,
                  el cine y la estética editorial.

                </p>

              </div>

            </FadeIn>

          </div>

        </section>

        {/* Brand Philosophy */}
        <section className="max-w-5xl mx-auto px-6 md:px-12 pb-40">

          <FadeIn>

            <p className="uppercase tracking-[0.4em] text-xs mb-8 text-center">
              La filosofía
            </p>

            <h2 className="text-4xl md:text-6xl font-light leading-tight text-center mb-16">

              Crear imágenes atemporales que
              transmitan emoción auténtica,
              elegancia y conexión humana.

            </h2>

          </FadeIn>

          <FadeIn delay={0.2}>

            <div className="space-y-10 text-lg leading-relaxed opacity-70 max-w-3xl mx-auto text-center">

              <p>
                Golden Light Studio nace de la idea de transformar
                momentos reales en recuerdos cinematográficos,
                con una estética limpia, emocional y elegante.
              </p>

              <p>
                Cada sesión está diseñada para sentirse natural,
                íntima y profundamente humana,
                creando imágenes que permanezcan vivas con el tiempo.
              </p>

              <p>
                Inspirado por la luz natural,
                la moda editorial y las historias auténticas,
                el objetivo es capturar mucho más que fotografías:
                emociones reales.
              </p>

            </div>

          </FadeIn>

        </section>

        <Footer />

      </main>

    </PageTransition>

  );

}