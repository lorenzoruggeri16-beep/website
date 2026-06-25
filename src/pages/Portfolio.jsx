import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";

import PortfolioHero from "../components/portfolio/PortfolioHero";

import PortfolioEditorialGrid from "../components/portfolio/PortfolioEditorialGrid";

import PortfolioStrip from "../components/portfolio/PortfolioStrip";

import SEO from "../components/SEO";

export default function Portfolio() {

  return (

    <PageTransition>

      <SEO
        title="Luxury Photography Portfolio Tenerife | Golden Light Studio"
        description="Discover a curated collection of luxury photography sessions in Tenerife. Couples, weddings, motherhood and timeless storytelling through a fine art and cinematic approach."
        url="/portfolio"
      />

      <main className="bg-[#f6f2eb] overflow-hidden">

        <Navbar />

        <PortfolioHero />

        <PortfolioEditorialGrid />

        <PortfolioStrip />

        <Footer />

      </main>

    </PageTransition>

  );

}