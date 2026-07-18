export const PORTFOLIO_CATEGORIES = [
  "Portrait Sessions",
  "Commercial",
  "Weddings",
  "Events",
];

export const EMPTY_PORTFOLIO_FORM = {
  id: null,
  title: "",
  location: "",
  category: "Portrait Sessions",
  description: "",
  coverImage: "",
  gallery: [],
  translations: {},
};

export function createPortfolioSlug(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function toPortfolioModel(record) {
  return {
    ...record,
    coverImage: record.cover_image || "",
    gallery: record.gallery || [],
    createdAt: record.created_at || null,
    translations: record.translations || {},
    seo: record.seo || {},
    imageAltText: record.image_alt_text || {},
  };
}

export function createPortfolioForm(item = EMPTY_PORTFOLIO_FORM) {
  return {
    id: item.id || null,
    title: item.title || "",
    location: item.location || "",
    category: item.category || "Portrait Sessions",
    description: item.description || "",
    coverImage: item.coverImage || item.cover_image || "",
    gallery: item.gallery || [],
    translations: item.translations || {},
    seo: item.seo || {},
    imageAltText: item.imageAltText || item.image_alt_text || {},
  };
}

export function validatePortfolioForm(form) {
  if (!form.title.trim()) return "Inserisci il titolo della sessione.";
  if (!form.location.trim()) return "Inserisci la località.";
  if (!form.description.trim()) return "Inserisci una descrizione.";
  if (!form.coverImage) return "Carica un'immagine di copertina.";

  return null;
}

export function filterPortfolioItems(items, search, sortBy) {
  const normalizedSearch = search.trim().toLowerCase();

  return [...items]
    .filter((item) => {
      if (!normalizedSearch) return true;

      return [item.title, item.location, item.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch));
    })
    .sort((first, second) => {
      const firstDate = new Date(first.createdAt || 0).getTime();
      const secondDate = new Date(second.createdAt || 0).getTime();

      return sortBy === "oldest"
        ? firstDate - secondDate
        : secondDate - firstDate;
    });
}
