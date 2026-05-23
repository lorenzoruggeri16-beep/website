import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Hero() {

  const { scrollY } = useScroll();

  const y = useTransform(
    scrollY,
    [0, 500],
    [0, 150]
  );

  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}
      <motion.img
        src="/images/hero.jpg"
        alt="Luxury Wedding"
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">

        <p className="uppercase tracking-[0.5em] text-xs mb-6">
          Fotografía Editorial de Bodas
        </p>

        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-none">
          Historias
        </h1>

        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light leading-none">
          Eternas
        </h1>

      </div>

    </section>
  );
}