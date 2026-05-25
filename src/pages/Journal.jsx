import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";
import FadeIn from "../components/ui/FadeIn";

const posts = [
  {
    title: "Best Beaches in Tenerife for Family Photos",
    category: "Location Guide",
    image: "/images/motherhood-1.jpg",
  },

  {
    title: "What to Wear for a Sunset Beach Session",
    category: "Style Tips",
    image: "/images/motherhood-2.jpg",
  },

  {
    title: "How to Prepare Children for a Relaxed Photoshoot",
    category: "Family Photography",
    image: "/images/motherhood-3.jpg",
  },
];

export default function Journal() {
  return (
    <PageTransition>

      <main className="bg-[#f8f6f2] text-black min-h-screen">

        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-24 px-6 md:px-12 text-center">

          <FadeIn>

            <p className="uppercase tracking-[0.4em] text-xs mb-6">
              Journal
            </p>

            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-none">

              Guides &
              <br />
              Stories

            </h1>

          </FadeIn>

        </section>

        {/* Posts */}
        <section className="px-6 md:px-12 pb-40">

          <div className="grid md:grid-cols-2 gap-16">

            {posts.map((post, index) => (

              <FadeIn
                key={index}
                delay={index * 0.1}
              >

                <article className="group cursor-pointer">

                  <div className="overflow-hidden">

                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-[650px] object-cover group-hover:scale-[1.04] transition duration-700"
                    />

                  </div>

                  <div className="pt-6">

                    <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">
                        {post.category}
                    </p>
                    <p className="text-sm opacity-40 mb-8">
                      6 min read · May 2026
                    </p>

                    <h2 className="text-4xl md:text-5xl font-light leading-tight">

                      {post.title}

                    </h2>

                  </div>

                </article>

              </FadeIn>

            ))}

          </div>

        </section>

        <Footer />

      </main>

    </PageTransition>
  );
}