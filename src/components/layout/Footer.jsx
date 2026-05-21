export default function Footer() {
  return (
    <footer className="bg-[#111] text-white px-6 md:px-12 py-24">

      <div className="grid md:grid-cols-2 gap-20">

        {/* Left */}
        <div>

          <p className="uppercase tracking-[0.4em] text-xs mb-6">
            Golden Light Studio
          </p>

          <h2 className="text-5xl md:text-7xl font-light leading-none mb-10">

            Let’s create
            <br />
            something timeless.

          </h2>

          <p className="text-lg opacity-70 max-w-md">
            Editorial wedding photography crafted with emotion,
            elegance, and cinematic storytelling.
          </p>

        </div>

        {/* Right */}
        <div className="flex flex-col md:items-end justify-between">

          <div className="flex flex-col gap-4 uppercase tracking-[0.3em] text-xs">

            <a
              href="#"
              className="hover:opacity-60 transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="hover:opacity-60 transition"
            >
              Pinterest
            </a>

            <a
              href="#"
              className="hover:opacity-60 transition"
            >
              Contact
            </a>

          </div>

          <p className="opacity-40 text-sm mt-20 md:mt-0">
            © 2026 Golden Light Studio
          </p>

        </div>

      </div>

    </footer>
  );
}