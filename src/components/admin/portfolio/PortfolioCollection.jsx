import { Pencil, SlidersHorizontal, Trash2 } from "lucide-react";

export default function PortfolioCollection({
  items,
  onArchive,
  onEdit,
  onSearchChange,
  onSortToggle,
  search,
  sortBy,
}) {
  return (
    <section className="lg:col-span-8 w-full">
      <div className="mb-10">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c6a66a] to-transparent opacity-70 mb-10" />
        <div className="flex items-center justify-between gap-6">
          <input
            type="search"
            placeholder="Cerca nel portfolio..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            className="flex-1 border-b border-[#c6a66a] bg-transparent py-4 outline-none"
          />
          <button
            type="button"
            onClick={onSortToggle}
            aria-label={sortBy === "latest" ? "Mostra prima i più vecchi" : "Mostra prima i più recenti"}
            className="w-14 h-14 border border-[#c6a66a]/30 flex items-center justify-center hover:bg-black hover:text-white transition rounded-sm"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="py-12 text-center opacity-50">Nessuna sessione trovata.</p>
      ) : (
        <div className="flex gap-8 overflow-x-auto pb-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="bg-white min-w-[420px] overflow-hidden border border-black/5 rounded-sm"
            >
              <img
                src={item.coverImage || item.image}
                alt={item.title}
                className="w-full h-[240px] object-cover"
              />
              <div className="p-8">
                <p className="uppercase tracking-[0.3em] text-xs opacity-40 mb-4">
                  {item.location}
                </p>
                <h3 className="text-3xl font-light mb-3">{item.title}</h3>
                <p className="text-xs uppercase tracking-[0.2em] opacity-40 mb-6">
                  {item.category}
                </p>
                <p className="opacity-60 leading-relaxed mb-8">{item.description}</p>

                {item.gallery.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-8">
                    {item.gallery.slice(0, 4).map((image) => (
                      <img
                        key={image}
                        src={image}
                        alt=""
                        className="w-full h-20 object-cover rounded-sm"
                      />
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition"
                    aria-label={`Modifica ${item.title}`}
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onArchive(item)}
                    className="w-10 h-10 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    aria-label={`Sposta ${item.title} nel cestino`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
