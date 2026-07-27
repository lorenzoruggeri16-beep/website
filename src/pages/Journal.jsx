import Navbar from "../components/layout/Navbar";

import Footer from "../components/layout/Footer";

import JournalHero from "../components/journal/JournalHero";

import FeaturedStory from "../components/journal/FeaturedStory";

import StoriesGrid from "../components/journal/StoriesGrid";
import SEO from "../components/SEO";

export default function Journal() {

  return (

    <>
      <SEO
        title="Journal | Golden Light Studio"
        description="Stories, inspiration and editorial photography from Golden Light Studio in Tenerife."
        url="/journal"
      />
      <main className="bg-[#f6f2eb] min-h-screen overflow-hidden">

      <Navbar />

      <JournalHero />

      <FeaturedStory />

      <StoriesGrid />

      <Footer />
      </main>
    </>

  );

}
