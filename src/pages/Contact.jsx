import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";
import FadeIn from "../components/ui/FadeIn";

export default function Contact() {
  return (
    <PageTransition>

      <main className="bg-[#f8f6f2] text-black min-h-screen">

        <Navbar />

        {/* Hero */}
        <section className="pt-40 pb-24 px-6 md:px-12 text-center">

          <FadeIn>

            <p className="uppercase tracking-[0.4em] text-xs mb-6">
              Contact
            </p>

            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-none">

              Let’s Create
              <br />
              Something Beautiful

            </h1>

          </FadeIn>

        </section>

        {/* Content */}
        <section className="px-6 md:px-12 pb-40">

          <div className="grid md:grid-cols-2 gap-20">

            {/* Left */}
            <FadeIn>

              <div>

                <p className="uppercase tracking-[0.3em] text-xs mb-6">
                  Inquiries
                </p>

                <h2 className="text-5xl md:text-6xl font-light leading-none mb-10">

                  I can’t wait
                  <br />
                  to hear your story.

                </h2>

                <p className="text-lg opacity-70 leading-relaxed max-w-md mb-10">

                  For wedding collections, editorial projects,
                  and destination celebrations worldwide.

                </p>

                <div className="space-y-4 text-lg">

                  <p>
                    hello@goldenlightstudio.com
                  </p>

                  <p>
                    Instagram / @goldenlightstudio
                  </p>

                </div>

              </div>

            </FadeIn>

            {/* Right */}
            <FadeIn delay={0.2}>

              <form  action="https://formspree.io/f/mbdbkjvz" method="POST" className="space-y-8">

                <div>

                  <label className="block uppercase tracking-[0.3em] text-xs mb-3">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="w-full border-b border-black bg-transparent py-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block uppercase tracking-[0.3em] text-xs mb-3">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="w-full border-b border-black bg-transparent py-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block uppercase tracking-[0.3em] text-xs mb-3">
                    Event Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    className="w-full border-b border-black bg-transparent py-4 outline-none"
                  />

                </div>

                <div>

                  <label className="block uppercase tracking-[0.3em] text-xs mb-3">
                    Your Story
                  </label>

                  <textarea
                    rows="5"
                    name="message"
                    className="w-full border-b border-black bg-transparent py-4 outline-none resize-none"
                  />

                </div>

                <button
                  type="submit"
                  className="uppercase tracking-[0.3em] text-sm border border-black px-8 py-4 hover:bg-black hover:text-white transition duration-500"
                >

                  Send Inquiry

                </button>

              </form>

            </FadeIn>

          </div>

        </section>

        <Footer />

      </main>

    </PageTransition>
  );
}