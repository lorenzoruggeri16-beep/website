import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import useEmblaCarousel
from "embla-carousel-react";

import Navbar
from "../components/layout/Navbar";

import Footer
from "../components/layout/Footer";

import PageTransition
from "../components/ui/PageTransition";

import SEO from "../components/SEO";
import { supabase } from "../lib/supabase";
import Loader from "../components/ui/Loader";
import { useTranslation } from "react-i18next";
import {
  getImageAltText,
  localizeContent,
} from "../lib/localizedContent";

export default function PortfolioDetail() {

  const { slug } =
    useParams();
  const { i18n } = useTranslation();

  const [portfolio,
    setPortfolio] =
    useState(null);

  const [moreSessions,
    setMoreSessions] =
    useState([]);

  const [selectedIndex,
  setSelectedIndex] =
  useState(0);

  const [cursorVisible,
  setCursorVisible] =
  useState(false);

  const [cursorPosition,
  setCursorPosition] =
  useState({
    x: 0,
    y: 0,
  });

  const [lightboxOpen,
  setLightboxOpen] =
  useState(false);

  const [activeImage,
  setActiveImage] =
  useState(0);

  const [wheelAccumulator,
     setWheelAccumulator] = 
     useState(0);

  useEffect(() => {

    const handleEscape =

    (e) => {

      if (
        e.key === "Escape"
      ) {

        setLightboxOpen(
          false
        );

      }

    };

    window.addEventListener(
      "keydown",
      handleEscape
    );
  }, []);

  const [
  emblaRef,
  emblaApi,
] = useEmblaCarousel({

  loop: true,
  align: "center",
  dragFree: true,

});

useEffect(() => {

  if (!emblaApi)
    return;
  const onSelect = () => {

    setSelectedIndex(
      emblaApi.selectedScrollSnap()
    );
  };

  emblaApi.on(
    "select",
    onSelect
  );

  onSelect();

  const autoplay =

    setInterval(() => {

      emblaApi.scrollNext();

    }, 4000);

  return () =>
    clearInterval(
      autoplay
    );

}, [emblaApi]);


  // LOAD PORTFOLIO
  useEffect(() => {

    const fetchPortfolio = async () => {

      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        return;
      }

      const localized = localizeContent(data, i18n.language);

      setPortfolio({
        ...data,
        title: localized.title,
        location: localized.location,
        description: localized.description,
        seo: localized.seo,
        imageAltText: localized.imageAltText,
        coverImage: data.cover_image,
        images: data.gallery || [],
      });

      const { data: relatedData } = await supabase
        .from("portfolio")
        .select("*")
        .eq("deleted", false)
        .neq("slug", slug)
        .limit(3);

      setMoreSessions(
        (relatedData || []).map((item) => {
          const localized = localizeContent(item, i18n.language);

          return ({
          ...item,
          title: localized.title,
          location: localized.location,
          coverImage: item.cover_image,
          images: item.gallery || [],
          });
        })
      );
    };

    fetchPortfolio();

  }, [slug, i18n.language]);

  // LOADING
  if (!portfolio) return <Loader />;

  return (

    <PageTransition>

      <SEO
        title={portfolio.seo?.title || `${portfolio.title} | Golden Light Studio`}
        description={portfolio.seo?.description || portfolio.description}
        image={portfolio.coverImage}
      />

      <main className="bg-[#f6f2eb] overflow-hidden">

        <Navbar />

        {/* HERO */}
        <section className="relative h-screen overflow-hidden">

          <img
            src={
              portfolio.coverImage ||
              portfolio.image
            }
            alt={getImageAltText(portfolio, portfolio.coverImage, i18n.language, portfolio.title)}
            fetchPriority="high"
            className="w-full h-full object-cover scale-[1.02]"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/25" />

          {/* TEXT */}
          <div className="absolute bottom-0 left-0 w-full px-6 lg:px-20 pb-24 z-10">

            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
            >

              <p className="uppercase tracking-[0.45em] text-xs text-white/70 mb-8">

                {portfolio.location}

              </p>

              <h1 className="text-6xl lg:text-[140px] leading-none font-light text-white max-w-6xl">

                {portfolio.title}

              </h1>

            </motion.div>

          </div>

        </section>

        {/* INTRO */}
        <section className="px-6 lg:px-20 pt-6 pb-10">

          <div className="grid lg:grid-cols-12 gap-20">

            {/* LEFT */}
            <div className="lg:col-span-4">

              <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-8">

                Cinematic Session

              </p>

              <div className="w-32 h-px bg-[#c6a66a] mb-10" />

            </div>

            {/* RIGHT */}
            <div className="lg:col-span-8">

              <p className="text-2xl lg:text-4xl font-light leading-relaxed opacity-80 max-w-4xl">

                {portfolio.description}

              </p>

            </div>

          </div>

        </section>

        {/* CINEMATIC GALLERY */}
        <section className="pb-32 overflow-hidden">

        {!lightboxOpen && (

          <>
          {/* LEFT ARROW */}
<button
  onClick={() =>
    emblaApi?.scrollPrev()
  }
  className="

    absolute
    left-2 lg:left-8

    top-[58%]
    -translate-y-1/2

    z-40

    w-14
    h-14

    lg:w-16
    lg:h-16

    rounded-full

    backdrop-blur-md
    bg-white/10

    border
    border-white/20

    text-white

    flex
    items-center
    justify-center

    hover:bg-black
    hover:scale-110

    transition-all
    duration-500

  "
>

  ←

</button>

{/* RIGHT ARROW */}
<button
  onClick={() =>
    emblaApi?.scrollNext()
  }
  className="

    absolute
    right-2 lg:right-8

    top-[58%]
    -translate-y-1/2

    z-40

    w-14
    h-14

    lg:w-16
    lg:h-16

    rounded-full

    backdrop-blur-md
    bg-white/10

    border
    border-white/20

    text-white

    flex
    items-center
    justify-center

    hover:bg-black
    hover:scale-110

    transition-all
    duration-500

  "
>

  →

</button>

</>

        )}


{cursorVisible && (

  <div
   className="
   
   fixed
   z-[999]

   pointer-events-none

   w-16
   h-16

   rounded-full

   backdrop-blur-xl
   bg-white/10

   border
   border-white/20

   text-white

   flex
   items-center
   justify-center

   uppercase
   tracking-[0.1em]
   text-[10px]

   transition-transform
   duration-150

   "

   style={{

    left:
    cursorPosition.x - 32,

    top:
    cursorPosition.y - 32,

   }}
   >

    Drag 

   </div>

  )}
                  
          <div
           ref={emblaRef}

           onMouseEnter={() =>
            setCursorVisible(true)
           }

           onMouseLeave={() =>
            setCursorVisible(false)
           }

           onMouseMove={(e) => {

            setCursorPosition({

            x: e.clientX,
            y: e.clientY,
           });
          }}

          onWheel={(e) => {
            if (!emblaApi) return;

            const threshold = 120;
            const next = wheelAccumulator + e.deltaY;

            if (next > threshold) {
              emblaApi.scrollNext();
              setWheelAccumulator(0);
            } else if (next < -threshold) {
              emblaApi.scrollPrev();
              setWheelAccumulator(0);
            } else {
            setWheelAccumulator(next);
            }
          }}

           className="overflow-hidden px-6 lg:px-20 scrollbar-hide"
           >
            <div className="flex gap-3">

            {portfolio.images?.map(
              (image, index) => (

                <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 60,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:1
                }}
                viewport={{
                  once: true,
                }}
                
                className={`
                  ${
                    index % 2 === 0

                    ? "mt-0"

                    : "mt-24"
                  }

                flex-shrink-0
                 
                 w-[78vw]
                 md:w-[42vw]
                 lg:w-[24vw]
                 
                 snap-center

                 transition-all
                 duration-700

                 ${
                  selectedIndex === index

                  ? "scale-100 opacity-100 z-20 blur-0"

                  : Math.abs(index - selectedIndex) === 1

                  ? "scale-[0.97] opacity-75 blur-[2px]"

                  : "scale-[0.92] opacity-40 blur-[4px]"
                 }
                
                 `}
                >

                <div className="overflow-hidden rounded-none">

                  

                 <img
                  onClick={() => {

                    setActiveImage(index);
                    setLightboxOpen(true);

                  }}

                  src={image}
                  alt=""
                  loading="lazy"
                  className="
  
                  w-full
                  h-[58vh]
                  lg:h-[72vh]

                  object-cover

                  hover:scale-[1.06]
                  hover:rotate-[0.4deg]

                  transition-all
                  duration-[3000ms]
                  ease-out
  
                  "
                  />

                </div>

              </motion.div>

              ))}

            </div>

           </div>

        </section>


        {/* MORE SESSIONS */}
        <section className="px-6 lg:px-20 pb-12">

          <div className="flex items-center justify-between mb-12">

            <div>

              <p className="uppercase tracking-[0.35em] text-xs opacity-40 mb-5">

                Continue Exploring

              </p>

              <h2 className="text-4xl lg:text-5xl font-light">

                More Sessions

              </h2>

            </div>

            <div className="hidden lg:block w-40 h-px bg-[#c6a66a]" />

          </div>

          <div className="overflow-x-auto scrollbar-hide">

  <div className="flex gap-6 min-w-max pb-4">

    {moreSessions.map((item) => (

      <Link
        key={item.id}
        to={`/portfolio/${item.slug || item.id}`}
        className="group flex-shrink-0 w-[240px]"
      >

        <article>

          <div className="overflow-hidden rounded-[2px]">

            <img
              src={
                item.coverImage ||
                item.image ||
                item.images?.[0]
              }
              alt={item.title}
              loading="lazy"
              className="

                w-full
                h-[320px]

                object-cover

                group-hover:scale-[1.03]

                transition-all
                duration-[1800ms]

              "
            />

          </div>

          <div className="pt-5">

            <p className="uppercase tracking-[0.35em] text-[10px] opacity-40 mb-3">

              {item.location}

            </p>

            <h3 className="text-2xl font-light">

              {item.title}

            </h3>

          </div>

        </article>

      </Link>

    ))}

    {/* VIEW ALL */}
    <Link
      to="/portfolio"
      className="

        flex-shrink-0

        w-[240px]
        h-[320px]

        border
        border-black/10

        flex
        items-center
        justify-center

        uppercase
        tracking-[0.35em]
        text-xs

        hover:bg-black
        hover:text-white

        transition-all
        duration-500

      "
    >

      View Full Portfolio

    </Link>

  </div>

</div>

            

        </section>

        {/* CINEMATIC STRIP */}
        <section className="pb-12 overflow-hidden relative">
          
          <div className="border-y border-[#c6a66a]/30 py-6 whitespace-nowrap">

            <div className="flex gap-12 text-[36px] lg:text-[72px] font-light opacity-[0.08] uppercase tracking-[0.08em] animate-marquee">

              <span>

                Golden Light Studio

              </span>

              <span>

                Cinematic Memories

              </span>

              <span>

                Tenerife Photography

              </span>

              <span>

                Editorial Sessions

              </span>

            </div>

          </div>

        </section>

        {lightboxOpen && (

          <div
          className="
          
          fixed
          inset-0

          z-[9999]

          bg-black/90
          backdrop-blur-xl

          flex
          items-center
          justify-center
          
          "

          onClick={() =>
            setLightboxOpen(false)
          }
          >

            {/* IMAGE*/}
            <img
            src={
              portfolio.images[
                activeImage
              ]
            }
            alt=""
            className="
            
            max-w-[90vw]
            max-h-[90vw]

            object-contain

            "
            onClick={(e) =>
              e.stopPropagation()
            }
            />

            {/* COUNTER */}
            <div
            className="
            
            absolute
            top-28
            left-10

            text-white/70

            uppercase
            tracking-[0.45em]

            text-xm

            z-50
            
            "
            >

              {String(
                activeImage + 1
              ).padStart(2, "0")}

              /

              {String(
                portfolio.images.length
              ).padStart(2, "0")}

            </div>

            {/* CLOSE */}

            <button
             onClick={() =>
              setLightboxOpen(false)
             }
             className="
             
             absolute
             top-8
             right-8

             text-white
             text-3xl

             opacity-70
             hover:opacity-100

             transition

             "

             >

              ✕

             </button>

             {/* PREV*/}
             <button
              onClick={(e) => {
                
                e.stopPropagation();

                setActiveImage(
                  (prev) =>

                    prev === 0

                    ? portfolio.images.length - 1
                    : prev - 1
                );
              }}
              className="
              
              absolute
              left-8
              top-1/2

              -translate-y-1/2

              text-white
              text-5xl

              opacity-60
              hover:opacity-100

              transition

              "
              >

                 ←

              </button>

              {/* NEXT */}
            <button
              onClick={(e) => {

                e.stopPropagation();

                setActiveImage(
                  (prev) =>

                    prev ===
                    portfolio.images.length - 1

                    ? 0

                    : prev + 1
                );

              }}
              className="
              
              absolute
              right-8
              top-1/2

              -translate-y-1/2

              text-white
              text-5xl

              opacity-60 
              hover:opacity-100 

              transition

              "
            >

               →

               </button>

          </div>

        )}

        <Footer />

      </main>

    </PageTransition>

  );
}