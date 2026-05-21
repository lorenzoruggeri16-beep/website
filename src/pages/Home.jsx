import Navbar from "../components/layout/Navbar";

import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import GalleryPreview from "../components/home/GalleryPreview";
import Services from "../components/home/Services";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main>

      <Navbar />
      <Hero />

      <Intro />

      <GalleryPreview />
      <Services />

      <Footer />

    </main>
  );
}