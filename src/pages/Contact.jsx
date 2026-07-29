import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";
import FadeIn from "../components/ui/FadeIn";

import SEO from "../components/SEO";

import { useTranslation } from "react-i18next";

export default function Contact() {

  const { t } = useTranslation();

  return (

    <PageTransition>

      <SEO
        title="Contact Luxury Photographer Tenerife | Golden Light Studio"
        description="Get in touch with Golden Light Studio. Luxury photography in Tenerife for couples, weddings, motherhood and meaningful life stories."
        url="/contact"
      />

      <main className="bg-[#f8f6f2] text-black min-h-screen">

        <Navbar />

        {/* Hero */}
        <section className="px-6 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 md:px-12 md:pb-20 md:pt-40 text-center">

          <FadeIn>

            <p className="uppercase tracking-[0.45em] text-xs mb-6 text-[#c6a66a]">

              {t("contact_page")}

            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-light leading-none">

              {t("contact_title_1")}
              <br />
              {t("contact_title_2")}

            </h1>

          </FadeIn>

        </section>

        {/* Content */}
        <section className="px-6 pb-20 sm:px-8 sm:pb-24 md:px-12 md:pb-32">

          <div className="grid gap-12 md:grid-cols-2 md:gap-24 max-w-7xl mx-auto">

            {/* Left */}
            <FadeIn>

              <div>

                <p className="uppercase tracking-[0.35em] text-xs mb-6 text-[#c6a66a]">

                  {t("contact_inquiries")}

                </p>

                <div className="w-16 h-px bg-[#c6a66a] mb-10" />

                <h2 className="mb-7 text-3xl font-light leading-[1.08] sm:mb-10 sm:text-4xl md:text-5xl">

                  Every story begins
                  <br />
                  with a conversation.

                </h2>

                <p className="mb-9 max-w-md text-base leading-[1.8] opacity-80 sm:mb-12 sm:text-lg sm:leading-[1.9]">

                  Whether you're planning a wedding,
                  a couples session, a family experience
                  or an editorial project, we'd love
                  to hear your vision.

                </p>

                <div className="space-y-5 text-lg">

                  <p className="opacity-80">
                    hello@goldenlightstudio.com
                  </p>

                  <p className="opacity-80">
                    Instagram / @goldenlightstudio
                  </p>

                </div>

              </div>

            </FadeIn>

            {/* Right */}
            <FadeIn delay={0.2}>

              <form
                action="https://formspree.io/f/mbdbkjvz"
                method="POST"
                className="space-y-7 sm:space-y-10"
              >

                <div>

                  <label className="block uppercase tracking-[0.3em] text-xs mb-3">

                    {t("contact_name")}

                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border-b border-black bg-transparent py-3 text-base outline-none sm:py-4"
                  />

                </div>

                <div>

                  <label className="block uppercase tracking-[0.3em] text-xs mb-3">

                    {t("contact_email")}

                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border-b border-black bg-transparent py-3 text-base outline-none sm:py-4"
                  />

                </div>

                <div>

                  <label className="block uppercase tracking-[0.3em] text-xs mb-3">

                    Session Type

                  </label>

                  <select
                    name="session_type"
                    className="w-full border-b border-black bg-transparent py-3 text-base outline-none sm:py-4"
                  >

                    <option>Couples</option>
                    <option>Wedding</option>
                    <option>Maternity</option>
                    <option>Family</option>
                    <option>Editorial</option>
                    <option>Branding</option>
                    <option>Other</option>

                  </select>

                </div>

                <div>

                  <label className="block uppercase tracking-[0.3em] text-xs mb-3">

                    {t("contact_location")}

                  </label>

                  <input
                    type="text"
                    name="location"
                    className="w-full border-b border-black bg-transparent py-3 text-base outline-none sm:py-4"
                  />

                </div>

                <div>

                  <label className="block uppercase tracking-[0.3em] text-xs mb-3">

                    {t("contact_story")}

                  </label>

                  <textarea
                    rows="6"
                    name="message"
                    className="w-full resize-none border-b border-black bg-transparent py-3 text-base outline-none sm:py-4"
                  />

                </div>

                <button
                  type="submit"
                  className="w-full border border-[#c6a66a] px-8 py-4 text-xs uppercase tracking-[0.28em] sm:w-auto sm:px-10 sm:text-sm sm:tracking-[0.35em] hover:bg-[#c6a66a] hover:text-white transition duration-500"
                >

                  {t("contact_button")}

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