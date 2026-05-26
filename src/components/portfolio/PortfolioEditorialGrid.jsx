import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

export default function PortfolioEditorialGrid() {

  const [portfolioItems,
    setPortfolioItems] =
    useState([]);

  useEffect(() => {

    const savedPortfolio =
      localStorage.getItem(
        "portfolio"
      );

    if (savedPortfolio) {

      setPortfolioItems(
        JSON.parse(
          savedPortfolio
        )
      );

    }

  }, []);

  return (

    <section className="px-6 lg:px-20 py-20">

      <div className="space-y-52">

        {portfolioItems.map(
          (item, index) => (

            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.2,
              }}
            >

              <Link
                to={`/portfolio/${item.slug || item.id}`}
                className="group block"
              >

                <div className={`

                  grid lg:grid-cols-12
                  gap-10 lg:gap-20
                  items-end

                  ${
                    index % 2 === 0
                      ? ""
                      : "lg:grid-flow-dense"
                  }

                `}>

                  {/* IMAGE */}
                  <div className={`

                    relative overflow-hidden

                    ${
                      index % 2 === 0

                        ? "lg:col-span-8"

                        : "lg:col-span-8 lg:col-start-5"

                    }

                  `}>

                    <div className="overflow-hidden">

                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[90vh] object-cover group-hover:scale-[1.02] transition duration-[3000ms]"
                      />

                    </div>

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-700" />

                  </div>

                  {/* TEXT */}
                  <div className={`

                    relative z-10

                    ${
                      index % 2 === 0

                        ? "lg:col-span-3 lg:-ml-20"

                        : "lg:col-span-3 lg:col-start-2 lg:-mr-20"

                    }

                  `}>

                    <div className="bg-[#f6f2eb] p-8 lg:p-12">

                      <p className="uppercase tracking-[0.4em] text-[10px] opacity-40 mb-8">

                        {item.location}

                      </p>

                      <h2 className="text-4xl lg:text-6xl font-light leading-[1.05] mb-10">

                        {item.title}

                      </h2>

                      <div className="w-20 h-px bg-[#c6a66a] mb-10" />

                      <button className="uppercase tracking-[0.35em] text-[11px] hover:opacity-50 transition duration-500">

                        Explore Session

                      </button>

                    </div>

                  </div>

                </div>

              </Link>

            </motion.div>

          )

        )}

      </div>

    </section>

  );
}