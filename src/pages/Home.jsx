import Navbar from "../components/layout/Navbar";

import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import GalleryPreview from "../components/home/GalleryPreview";
import Experience from "../components/home/Experience";
import CTASection from "../components/home/CTASection";
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
      
      <Experience />

      <CTASection />

      <Footer />

    </main>

     </PageTransition>
  );
}