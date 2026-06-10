import FadeIn from "../ui/FadeIn";
import { Link } from "react-router-dom";

export default function CTASection() {

  return (

    <section className="bg-[#11110f] text-white px-6 md:px-12 py-32">

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
              text-5xl
              md:text-7xl
              font-light
              leading-[1.1]
              mb-10
            "
          >
            Let's create something
            <br />
            timeless together.
          </h2>

          <p
            className="
              max-w-2xl
              mx-auto
              text-lg
              leading-relaxed
              opacity-70
              mb-14
            "
          >
            Whether you're celebrating a love story,
            motherhood journey or a meaningful chapter
            of your life, we're here to transform it
            into imagery you'll treasure forever.
          </p>

          <Link
            to="/contact"
            className="
              inline-flex
              items-center
              border
              border-[#c6a66a]
              text-[#c6a66a]
              px-10
              py-5
              uppercase
              tracking-[0.35em]
              text-xs
              hover:bg-[#c6a66a]
              hover:text-black
              transition-all
              duration-500
            "
          >
            Book Your Session
          </Link>

        </FadeIn>

      </div>

    </section>

  );

}