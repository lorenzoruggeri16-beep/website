import {
  Trash2,
  RotateCcw,
} from "lucide-react";

export default function BinSection({
  binItems,
  setBinItems,
}) {

  // RESTORE
  const restoreItem =
    (item) => {

      // PORTFOLIO
      if (
        item.type ===
        "portfolio"
      ) {

        const currentPortfolio =

          JSON.parse(
            localStorage.getItem(
              "portfolio"
            )
          ) || [];

        localStorage.setItem(

          "portfolio",

          JSON.stringify([

            ...currentPortfolio,

            item,

          ])

        );

      }

      // ARTICLES
      if (
        item.type ===
        "article"
      ) {

        const currentArticles =

          JSON.parse(
            localStorage.getItem(
              "articles"
            )
          ) || [];

        localStorage.setItem(

          "articles",

          JSON.stringify([

            ...currentArticles,

            item,

          ])

        );

      }

      // REMOVE FROM BIN
      setBinItems(

        binItems.filter(
          (b) =>
            b.id !== item.id
        )

      );

      // REFRESH
      window.location.reload();

    };

  // DELETE FOREVER
  const deleteForever =
    (id) => {

      const updatedBin =

        binItems.filter(
          (item) =>
            item.id !== id
        );

      setBinItems(
        updatedBin
      );

      localStorage.setItem(
        "bin",
        JSON.stringify(
          updatedBin
        )
      );

    };

  return (

    <div className="max-w-[1600px] mx-auto">

      {/* HEADER */}
      <div className="mb-20">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

          Recovery Management

        </p>

        <h2 className="text-6xl font-light mb-6">

          Bin

        </h2>

        <p className="opacity-50 text-lg max-w-2xl leading-relaxed">

          Restore deleted
          sessions and editorial
          stories.

        </p>

      </div>

      {/* EMPTY */}
      {binItems.length === 0 && (

        <div className="border border-dashed border-black/10 p-20 text-center">

          <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">

            Bin Empty

          </p>

          <p className="opacity-50">

            Deleted items will
            appear here.

          </p>

        </div>

      )}

      {/* ITEMS */}
      <div className="flex gap-8 overflow-x-auto pb-6">

        {binItems.map(
          (item) => (

            <div
              key={item.id}
              className="bg-white min-w-[420px] overflow-hidden border border-black/5 rounded-sm"
            >

              {/* IMAGE */}
              <img
                src={
                  item.coverImage ||
                  item.image
                }
                alt={item.title}
                className="w-full h-[240px] object-cover"
              />

              <div className="p-8">

                {/* TYPE */}
                <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">

                  {item.type}

                </p>

                {/* TITLE */}
                <h3 className="text-3xl font-light mb-6">

                  {item.title}

                </h3>

                {/* DESCRIPTION */}
                <p className="opacity-60 leading-relaxed mb-8">

                  {item.description}

                </p>

                {/* ACTIONS */}
                <div className="flex gap-3">

                  {/* RESTORE */}
                  <button
                    onClick={() =>
                      restoreItem(
                        item
                      )
                    }
                    className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition duration-500"
                  >

                    <RotateCcw
                      size={15}
                    />

                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() =>
                      deleteForever(
                        item.id
                      )
                    }
                    className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition duration-500"
                  >

                    <Trash2
                      size={15}
                    />

                  </button>

                </div>

              </div>

            </div>

          )

        )}

      </div>

    </div>

  );

}