import { useParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { galleries } from "../data/galleryData";

export default function PortfolioDetail() {

  const { slug } = useParams();

  const gallery = galleries.find(
    (item) => item.slug === slug
  );

  if (!gallery) {
    return <div>Gallery not found</div>;
  }

  return (
    <main className="bg-[#f8f6f2] text-black min-h-screen">

      <Navbar />

      {/* Hero */}
      <section className="relative h-screen overflow-hidden">

        <img
          src={gallery.hero}
          alt={gallery.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">

          <p className="uppercase tracking-[0.4em] text-xs mb-6">
            {gallery.location}
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-none">
            {gallery.title}
          </h1>

        </div>

      </section>

      {/* Images */}
      <section className="px-6 md:px-12 py-32">

        <div className="space-y-10">

          {gallery.images.map((image, index) => (

            <img
              key={index}
              src={image}
              alt=""
              className="w-full object-cover"
            />

          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}