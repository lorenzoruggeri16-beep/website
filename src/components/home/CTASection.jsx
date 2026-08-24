import FadeIn from "../ui/FadeIn";
import { useTranslation } from "react-i18next";
import { openCalendly } from "../../lib/calendly";

export default function CTASection() {

  const { t } =
    useTranslation();

  return (

    <section className="bg-[#11110f] px-6 py-20 text-white sm:px-8 sm:py-24 md:px-12 md:py-32">

      <div className="max-w-5xl mx-auto text-center">

        <FadeIn>

          <p
            className="
              uppercase
              tracking-[0.5em]
              text-[11px]
              opacity-60
              mb-8
            "
          >
            Golden Light Studio
          </p>

          <h2
            className="
              text-4xl
              sm:text-5xl
              md:text-7xl
              font-light
              leading-[1.1]
              mb-8 sm:mb-10
            "
          >
            {t("cta_title_1")}
            <br />
            {t("cta_title_2")}
          </h2>

          <p
            className="
              max-w-2xl
              mx-auto
              text-base
              sm:text-lg
              leading-relaxed
              opacity-70
              mb-10 sm:mb-14
            "
          >
            {t("cta_text")}
          </p>

          <button
            type="button"
            onClick={openCalendly}
            className="
              inline-flex
              items-center
              border
              border-[#c6a66a]
              text-[#c6a66a]
              px-8
              py-4
              sm:px-10
              sm:py-5
              uppercase
              tracking-[0.35em]
              text-xs
              hover:bg-[#c6a66a]
              hover:text-black
              transition-all
              duration-500
            "
          >
            {t("cta_button")}
          </button>

        </FadeIn>

      </div>

    </section>

  );

}
