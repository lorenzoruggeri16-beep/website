import FadeIn from "../ui/FadeIn";

export default function Intro() {
  return (
    <section className="max-w-5xl mx-auto px-8 py-32 md:py-40 text-center bg-[#f8f6f2] text-black">

      <FadeIn>

        <p className="uppercase tracking-[0.4em] text-xs mb-8">
          New Zealand & Worldwide
        </p>

      </FadeIn>

      <FadeIn delay={0.2}>

        <h2 className="text-4xl md:text-6xl leading-tight font-light">

          Romantic imagery with an editorial
          and cinematic aesthetic.

        </h2>

      </FadeIn>

    </section>
  );
}