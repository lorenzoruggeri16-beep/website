import Navbar from "../components/layout/Navbar";

import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import GalleryPreview from "../components/home/GalleryPreview";
import Services from "../components/home/Services";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/ui/PageTransition";

export default function Home() {
  return (
    <PageTransition>

    <main>

      <Navbar />

      <Hero />

      <Intro />

      <GalleryPreview />
      
      <Services />

      <Footer />

    </main>

     </PageTransition>
  );
}