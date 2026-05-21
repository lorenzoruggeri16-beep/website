export default function Services() {
  return (
    <section className="bg-[#f8f6f2] px-6 md:px-12 py-40">

      <div className="grid md:grid-cols-2 gap-20 items-center">

        {/* Image */}
        <div className="overflow-hidden">

          <img
            src="/images/service.jpg"
            alt=""
            className="w-full h-[700px] object-cover hover:scale-[1.02] transition duration-700"
          />

        </div>

        {/* Content */}
        <div>

          <p className="uppercase tracking-[0.4em] text-xs mb-6">
            Experience
          </p>

          <h2 className="text-5xl md:text-7xl leading-none font-light mb-10">

            Honest
            <br />
            storytelling.

          </h2>

          <p className="text-xl leading-relaxed opacity-70 max-w-lg mb-10">

            Blending documentary emotion with refined editorial aesthetics,
            creating timeless imagery with cinematic depth and intentional
            composition.

          </p>

          <button className="uppercase tracking-[0.3em] text-sm border border-black px-8 py-4 hover:bg-black hover:text-white transition duration-500">

            Explore Portfolio

          </button>

        </div>

      </div>

    </section>
  );
}