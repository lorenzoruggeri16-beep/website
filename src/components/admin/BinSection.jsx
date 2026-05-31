import {
  Trash2,
  RotateCcw,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function BinSection({
  binItems,
  setBinItems,
}) {

const articleItems =

binItems.filter(
  (item) =>
    item.type ===
  "article"
);

const portfolioItems =

binItems.filter(
  (item) =>
    item.type ===
  "portfolio"
);

  // RESTORE
  const restoreItem =
    async (item) => {
    
      if (
        item.type ===
        "article"
      ) {

        const { error } =
          await supabase

            .from("articles")

            .update({

              deleted: false,

              deleted_at: null,

            })

            .eq(
              "id",
              item.id
            );

        if (error) {

          console.log(error);

          return;

        }

      }
      // PORTFOLIO
      if (
        item.type ===
        "portfolio"
      ) {

        const { error } =
         await supabase
         .from("portfolio")
         .update({
          deleted: false,
          deleted_at: null,
         })
         .eq("id", item.id);

         if(error) {
          console.log(error);
          return;
         }
         
      }
      
      // REMOVE FROM BIN
      setBinItems(

        binItems.filter(
          (b) =>
            b.id !== item.id
        )

      );

      
    };

  // DELETE FOREVER
  const deleteForever =
    async (item) => {

      if (
        item.type ===
        "article"
      ) {

        const { error } =
         await supabase

         .from("articles")
         .delete()
         .eq("id", item.id);

        if (error) {

          console.log(error);
        
          return;

        }
      }

      if (
        item.type ===
        "portfolio"
      ) {
        const { error } =
         await supabase
          .from("portfolio")
          .delete()
          .eq("id", item.id);

          if(error) {
            console.log(error);
            return;
          }
      }
    
      setBinItems(

        binItems.filter(
          (b) =>
            b.id !== item.id
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

        <div className="flex gap-10 mt-8">
          <div>

            <p className="text-xs uppercase tracking-[0.3em] opacity-40">

              Articles 

            </p>

            <p className="text-3xl font-light">

              {articleItems.length}
              
            </p>

          </div>

          <div>

            <p className="text-xs uppercase tracking-[0.3em] opacity-40">

              Portfolio 

            </p>

            <p className="text-3xl font-light">

              {portfolioItems.length}

            </p>

          </div>

        </div>

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

      {/* ARTICLES */}
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
                      deleteForever(item)
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