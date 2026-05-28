import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";

import JournalHero from "../components/journal/JournalHero";

import FeaturedStory from "../components/journal/FeaturedStory";

import StoriesGrid from "../components/journal/StoriesGrid";

export default function Journal() {

  return (

    <main className="bg-[#f6f2eb] min-h-screen overflow-hidden">

      <Navbar />

      <JournalHero />

      <FeaturedStory />

      <StoriesGrid />

      <Footer />

    </main>

  );

}