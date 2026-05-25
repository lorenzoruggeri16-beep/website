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

      
{/* Stories */}
<section className="px-6 md:px-12 pb-40">

   <div className="space-y-40">

      {galleries.map((gallery, index) => (

       <FadeIn
         key={gallery.slug}
         delay={index * 0.1}
       >

        <Link
          to={`/portfolio/${gallery.slug}`}
          className={`grid md:grid-cols-2 gap-12 items-center ${
            index % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >

          {/* Image */}
          <div className="overflow-hidden">

            <img
              src={gallery.hero}
              alt={gallery.title}
              className="w-full h-[85vh] object-cover hover:scale-[1.03] transition duration-700"
            />

          </div>

          {/* Content */}
          <div className="px-4 md:px-12">

            <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

              {gallery.location}

            </p>

            <h2 className="text-5xl md:text-7xl font-light leading-none mb-8">

              {gallery.title}

            </h2>

            <p className="text-lg leading-relaxed opacity-70 max-w-md mb-10">

              Emotional storytelling captured with cinematic elegance,
              intentional composition, and timeless imagery.

            </p>

            <span className="uppercase tracking-[0.3em] text-xs border-b border-black pb-2">

              View Story

            </span>

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