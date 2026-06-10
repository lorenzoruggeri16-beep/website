import FadeIn from "../ui/FadeIn";
import { useTranslation } from "react-i18next";

export default function Intro() {

  const { t } =
    useTranslation();

  return (

    <section className="bg-[#f8f6f2] text-black">

      <div className="max-w-6xl mx-auto px-8 py-24 md:py-28">

        <FadeIn>

          <p
            className="
              uppercase
              tracking-[0.5em]
              text-[11px]
              text-center
              mb-10
              opacity-60
            "
          >
            Tenerife · Canary Islands · Worldwide
          </p>

        </FadeIn>

        <FadeIn delay={0.2}>

          <h2
            className="
              text-4xl
              md:text-6xl
              lg:text-7xl
              font-light
              leading-[1.15]
              text-center
              max-w-5xl
              mx-auto
            "
          >
            {t("intro_title_1")}
            <br />
            {t("intro_title_2")}
            <br />
            {t("intro_title_3")}
          </h2>

        </FadeIn>

        <FadeIn delay={0.4}>

          <p
            className="
              max-w-3xl
              mx-auto
              text-center
              mt-12
              text-lg
              leading-relaxed
              opacity-70
            "
          >
            {t("intro_text")}
          </p>

        </FadeIn>

      </div>

    </section>

  );

}