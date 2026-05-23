import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";
import FadeIn from "../components/ui/FadeIn";

export default function About() {
  return (
    <PageTransition>

      <main className="bg-[#f8f6f2] text-black min-h-screen">

        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-24 px-6 md:px-12 text-center">

          <FadeIn>

            <p className="uppercase tracking-[0.4em] text-xs mb-6">
              About
            </p>

            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-none">

              Capturing
              <br />
              emotion honestly.

            </h1>

          </FadeIn>

        </section>

        {/* Story Section */}
        <section className="px-6 md:px-12 pb-40">

          <div className="grid md:grid-cols-2 gap-20 items-center">

            {/* Image */}
            <FadeIn>

              <div className="overflow-hidden">

                <img
                  src="/images/about.jpg"
                  alt="Photographer Portrait"
                  className="w-full h-[700px] object-cover"
                />

              </div>

            </FadeIn>

            {/* Text */}
            <FadeIn delay={0.2}>

              <div>

                <p className="uppercase tracking-[0.3em] text-xs mb-6">
                  The Philosophy
                </p>

                <h2 className="text-5xl md:text-6xl font-light leading-none mb-10">

                  Timeless imagery
                  <br />
                  with cinematic depth.

                </h2>

                <div className="space-y-8 text-lg leading-relaxed opacity-70">

                  <p>
                    I believe wedding photography should feel emotional,
                    elegant, and deeply personal.
                  </p>

                  <p>
                    Inspired by cinema, fashion editorials,
                    and documentary storytelling,
                    my approach focuses on creating imagery
                    that feels timeless rather than trendy.
                  </p>

                  <p>
                    Every celebration is approached with intention,
                    honesty, and an eye for meaningful moments.
                  </p>

                </div>

              </div>

            </FadeIn>

          </div>

        </section>

        <Footer />

      </main>

    </PageTransition>
  );
}