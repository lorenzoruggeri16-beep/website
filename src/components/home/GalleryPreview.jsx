import FadeIn from "../ui/FadeIn";

const images = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
];

export default function GalleryPreview() {
  return (
    <section className="bg-[#f8f6f2] px-6 md:px-12 pb-32">

      {/* Heading */}
      <FadeIn className="mb-20 text-center">

        <p className="uppercase tracking-[0.4em] text-xs mb-4">
          Portfolio
        </p>

        <h2 className="text-5xl md:text-7xl font-light">
          Recent Stories
        </h2>

      </FadeIn>

      {/* Gallery */}
      <div className="columns-1 md:columns-2 gap-6 space-y-6">

        {images.map((image, index) => (

          <FadeIn
            key={index}
            delay={index * 0.1}
            className="overflow-hidden"
          >

            <img
              src={image}
              alt=""
              className="w-full object-cover hover:scale-[1.03] transition duration-700"
            />

          </FadeIn>

        ))}

      </div>

    </section>
  );
}