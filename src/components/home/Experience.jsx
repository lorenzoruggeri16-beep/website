import FadeIn from "../ui/FadeIn";
import { useTranslation } from "react-i18next";

export default function Experience() {

  const { t } =
    useTranslation();

  const values = [
    {
      number: "01",
      title: t("connection_title"),
      description:
        t("connection_text"),
    },
    {
      number: "02",
      title: t("detail_title"),
      description:
        t("detail_text"),
    },
    {
      number: "03",
      title: t("storytelling_title"),
      description:
        t("storytelling_text"),
    },
  ];

  return (

    <section className="bg-[#f8f6f2] py-24 md:py-28 px-6 md:px-12">

      <div className="max-w-6xl mx-auto">

        <FadeIn>

          <p
            className="
              uppercase
              tracking-[0.5em]
              text-[11px]
              opacity-50
              text-center
              mb-6
            "
          >
            {t("experience_subtitle")}
          </p>

          <h2
            className="
              text-5xl
              md:text-7xl
              font-light
              text-center
              leading-[1.1]
              mb-10
            "
          >
            {t("experience_title_1")}
            <br />
            {t("experience_title_2")}
          </h2>

          <p
            className="
              max-w-3xl
              mx-auto
              text-center
              text-lg
              leading-relaxed
              opacity-70
              mb-24
            "
          >
            {t("experience_text")}
          </p>

        </FadeIn>

        <div className="space-y-16">

          {values.map((item, index) => (

            <FadeIn
              key={item.number}
              delay={index * 0.15}
            >

              <div
                className="
                  border-t
                  border-black/10
                  pt-12
                  grid
                  md:grid-cols-[120px_1fr_2fr]
                  gap-8
                  items-start
                "
              >

                <div
                  className="
                    text-[#c6a66a]
                    text-4xl
                    md:text-5xl
                    font-light
                  "
                >
                  {item.number}
                </div>

                <h3
                  className="
                    text-3xl
                    md:text-5xl
                    font-light
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-lg
                    leading-relaxed
                    opacity-70
                    max-w-xl
                  "
                >
                  {item.description}
                </p>

              </div>

            </FadeIn>

          ))}

        </div>

      </div>

    </section>

  );

}