import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";

import PortfolioHero from "../components/portfolio/PortfolioHero";

import PortfolioEditorialGrid from "../components/portfolio/PortfolioEditorialGrid";

import PortfolioStrip from "../components/portfolio/PortfolioStrip";

export default function Portfolio() {

  return (

    <PageTransition>

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