import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";

import PageTransition from "../components/ui/PageTransition";

import JournalHero from "../components/journal/JournalHero";

import FeaturedArticle from "../components/journal/FeaturedArticle";

import EditorialGrid from "../components/journal/EditorialGrid";

import JournalStrip from "../components/journal/JournalStrip";

export default function Journal() {

  return (

    <PageTransition>

      <main className="bg-[#f6f2eb] overflow-hidden">

        <Navbar />

        <JournalHero />

        <FeaturedArticle />

        <EditorialGrid />

        <JournalStrip />

        <Footer />

      </main>

    </PageTransition>

  );
}