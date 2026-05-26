export default function BinSection({
  binItems,
  setBinItems,
}) {

  const restoreItem = (
    itemId
  ) => {

    const filtered =

      binItems.filter(
        (item) =>
          item.id !== itemId
      );

    setBinItems(filtered);

  };

  const deleteForever = (
    itemId
  ) => {

    const filtered =

      binItems.filter(
        (item) =>
          item.id !== itemId
      );

    setBinItems(filtered);

  };

  const daysRemaining = (
    deletedAt
  ) => {

    const twentyDays = 20;

    const passed = Math.floor(

      (
        Date.now() -
        deletedAt
      ) /

      (
        1000 *
        60 *
        60 *
        24
      )

    );

    return twentyDays - passed;

  };

  return (

    <div className="max-w-6xl">

      {/* HEADER */}
      <div className="mb-20">

        <p className="uppercase tracking-[0.3em] text-xs opacity-50 mb-6">

          Trash Management

        </p>

        <h2 className="text-6xl font-light mb-6">

          Bin

        </h2>

        <p className="opacity-50 text-lg max-w-2xl leading-relaxed">

          Deleted items stay here
          for 20 days before
          being permanently removed.

        </p>

      </div>

      {/* EMPTY */}
      {binItems.length === 0 && (

        <div className="bg-white border border-black/5 p-16 text-center">

          <p className="text-2xl font-light mb-4">

            Bin is empty

          </p>

          <p className="opacity-40">

            Deleted articles and
            portfolio sessions will
            appear here.

          </p>

        </div>

      )}

      {/* ITEMS */}
      <div className="space-y-8">

        {binItems.map((item) => (

          <div
            key={item.id}
            className="bg-white border border-black/5 overflow-hidden hover:shadow-xl transition duration-500"
          >

            <div className="grid lg:grid-cols-[240px_1fr]">

              {/* IMAGE */}
              {item.image && (

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover min-h-[240px]"
                />

              )}

              {/* CONTENT */}
              <div className="p-10">

                <div className="flex items-start justify-between gap-10 mb-10">

                  <div>

                    <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">

                      {item.type}

                    </p>

                    <h3 className="text-3xl font-light mb-4">

                      {item.title}

                    </h3>

                    <p className="opacity-60 leading-relaxed max-w-2xl">

                      {item.excerpt ||
                        item.description}

                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm opacity-40 mb-2">

                      Auto delete in

                    </p>

                    <p className="text-2xl font-light">

                      {daysRemaining(
                        item.deletedAt
                      )} days

                    </p>

                  </div>

                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      restoreItem(
                        item.id
                      )
                    }
                    className="border border-black px-6 py-4 uppercase tracking-[0.25em] text-[11px] hover:bg-black hover:text-white transition duration-500"
                  >

                    Restore

                  </button>

                  <button
                    onClick={() =>
                      deleteForever(
                        item.id
                      )
                    }
                    className="border border-red-200 text-red-500 px-6 py-4 uppercase tracking-[0.25em] text-[11px] hover:bg-red-500 hover:text-white transition duration-500"
                  >

                    Delete Forever

                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}