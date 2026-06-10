import Navbar from "../components/layout/Navbar";

import Hero from "../components/home/Hero";
import Intro from "../components/home/Intro";
import GalleryPreview from "../components/home/GalleryPreview";
import Experience from "../components/home/Experience";
import CTASection from "../components/home/CTASection";

import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";

import SEO from "../components/SEO";

export default function Home() {

  return (

    <PageTransition>

      <SEO
        title="Luxury Photographer Tenerife | Golden Light Studio"
        description="Golden Light Studio is a luxury photographer in Tenerife creating timeless imagery for couples, weddings, motherhood and families through a refined fine art and cinematic approach."
      />

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