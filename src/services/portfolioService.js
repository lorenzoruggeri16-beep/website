import { supabase } from "../lib/supabase";
import {
  createPortfolioSlug,
  toPortfolioModel,
} from "../lib/portfolio";

export async function fetchActivePortfolio() {
  const { data, error } = await supabase
    .from("portfolio")
    .select("*")
    .eq("deleted", false)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data || []).map(toPortfolioModel);
}

function createPortfolioPayload(form) {
  return {
    title: form.title.trim(),
    slug: createPortfolioSlug(form.title),
    category: form.category,
    location: form.location.trim(),
    description: form.description.trim(),
    cover_image: form.coverImage,
    gallery: form.gallery,
    translations: form.translations || {},
    seo: form.seo || {},
    image_alt_text: form.imageAltText || {},
  };
}

export async function savePortfolio(form) {
  const payload = createPortfolioPayload(form);
  const query = form.id
    ? supabase.from("portfolio").update(payload).eq("id", form.id)
    : supabase.from("portfolio").insert({ ...payload, deleted: false });

  const { data, error } = await query.select().single();

  if (error) throw error;

  return toPortfolioModel(data);
}

export async function archivePortfolio(id) {
  const deletedAt = new Date().toISOString();
  const { error } = await supabase
    .from("portfolio")
    .update({ deleted: true, deleted_at: deletedAt })
    .eq("id", id);

  if (error) throw error;

  return deletedAt;
}
