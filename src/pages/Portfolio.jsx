import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FadeIn from "../components/ui/FadeIn";
import { galleries } from "../data/galleryData";
import PageTransition from "../components/ui/PageTransition";

export default function Portfolio() {
  return (
    <main className="bg-[#f8f6f2] text-black min-h-screen">

      <Navbar />

      {/* Hero */}
      <FadeIn>

        <section className="pt-40 pb-24 px-6 md:px-12 text-center">

          <p className="uppercase tracking-[0.4em] text-xs mb-6">
            Portfolio
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-none">

            Recent
            <br />
            Stories

          </h1>

        </section>

      </FadeIn>

      {/* Gallery Grid */}
      <section className="px-6 md:px-12 pb-40">

        <div className="grid md:grid-cols-2 gap-10">

          {galleries.map((gallery, index) => (

            <FadeIn
              key={gallery.slug}
              delay={index * 0.1}
            >

              <Link
                to={`/portfolio/${gallery.slug}`}
                className="group block"
              >

                <div className="overflow-hidden">

                  <img
                    src={gallery.hero}
                    alt={gallery.title}
                    className="w-full h-[700px] object-cover group-hover:scale-[1.03] transition duration-700"
                  />

                </div>

                <div className="pt-6">

                  <p className="uppercase tracking-[0.3em] text-xs opacity-60 mb-3">
                    {gallery.location}
                  </p>

                  <h2 className="text-4xl md:text-5xl font-light">
                    {gallery.title}
                  </h2>

                </div>

              </Link>

            </FadeIn>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}