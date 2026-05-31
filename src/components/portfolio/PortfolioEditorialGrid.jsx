import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import { supabase } from "../../lib/supabase";

export default function PortfolioEditorialGrid() {

  const [portfolioItems,
    setPortfolioItems] =
    useState([]);

  const [activeCategory,
  setActiveCategory] =
  useState(
    "Portrait Sessions"
  );

  useEffect(() => {

    const fetchPortfolio =
     async () => {

      const {
        data,
        error,
      } = await supabase
      
          .from("portfolio")

          .select("*")

          .eq("deleted", false)
          
          .order("created_at",{
            ascending: false,
          }
                
        );

        console.log("portfolio data:", data);
        console.log("portfolio error:",error);

        if (error) {
          console.log(error);
          return;
        }
        
        setPortfolioItems(

          data.map((item) => ({

            ...item,

            coverImage:
              item.cover_image,
            
              images:
                item.gallery || [],

          }))

        );
     };

     fetchPortfolio();
    
    }, []);
    
  const groupedPortfolio = {

  
    Weddings:
     portfolioItems.filter(
      (item) =>
        item.category ===
       "Weddings"
     ),

    Events:
     portfolioItems.filter(
      (item) =>
        item.category ===
       "Events"
     ),

    "Portrait Sessions":
      portfolioItems.filter(
        (item) =>
          item.category ===
        "Portrait Sessions"
      )
   };

   console.log(portfolioItems);
 
  return (

    <section className="px-0 py-0 bg-[#f6f2eb]">

      <div className="px-6 lg:px-20 pb-32">

        {/* CATEGORY NAV */}
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-16 mb-24 border-b border-black/10 py-10">
           {[
            "Portrait Sessions",
            "Weddings",
            "Events",
           ].map((category) => (

            <button
             key={category}
             onClick={() =>
              setActiveCategory(
                category
              )
             }
             className={`
              
              relative

              text-sm lg:text-base 
          

              uppercase
              tracking-[0.35em]

              pb-4

              transition-all
              duration-500
              
              ${
                activeCategory ===
                category

                ? "opacity-100"

                : "opacity-30 hover:opacity-60"

                }
              `}
              >
                 {category}

            <div
             className={`
              absolute
              left-0 
              -bottom-[2px]
              
              h-[1px]
              bg-[#c6a66a]
              
              transition-all
              duration-700
              
              ${
                activeCategory ===
                category

                ? "w-full opacity-100"

                : "w-0 opacity-0"
              }
              `}
              />

            </button>

            ))}

             </div>

           </div>

                {/* GRID*/}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                  {groupedPortfolio[
                    activeCategory
                  ]?.map((item) => (
                      
                      <motion.div
                      whileHover={{
                        y: -10,
                      }}
                       key={item.id}
                       initial={{
                        opacity: 0,
                        y:40,
                       }}
                       whileInView={{
                        opacity: 1,
                        y: 0,
                       }}
                       viewport={{
                        once: true,
                       }}
                       transition={{
                        duration: 1,
                       }}
                      >

                      <Link
                       to={`/portfolio/${item.slug || item.id}`}
                       className="group block"
                       >

                        {/* IMAGE*/}
                        <div className="relative overflow-hidden bg-black">

                          <img
                           src={
                            item.coverImage ||
                            item.image
                           }
                           alt={item.title}
                           className="w-full h-[420px] object-cover group-hover:scale-[1.04] transition duration-[2500ms]"
                           />

                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition duration-700" />

                        </div>

                        {/* CONTENT */}
                        <div className="pt-8 transition-all duration-700 group-hover:translate-y-[-6px]">

                          <p className="uppercase tracking-[0.35em] text-[10px] opacity-40 mb-4">

                            {item.location}

                          </p>

                          <h3 className="text-3xl font-light leading-tight mb-6">

                            {item.title}

                          </h3>

                          <div className="w-16 h-px bg-[#c6a66a] mb-6" />

                          <button className="uppercase tracking-[0.35em] text-[11px] hover:tracking-[0.45em] transition-all duration-500">
                            
                            View Story 

                          </button>

                        </div>

                       </Link>

                      </motion.div>

                    ))}
               
                </div>

              </div>  

            </section>

            );

          }     