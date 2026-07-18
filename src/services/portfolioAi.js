import { supabase } from "../lib/supabase";
import { mergeGeneratedContent } from "../lib/contentTranslations";

export function getPortfolioAiStatus() {
  return {
    enabled: true,
    message: "AI: traduzioni, SEO e alt text alla pubblicazione",
  };
}

export async function generatePortfolioContent(form) {
  const { data, error } = await supabase.functions.invoke("content-ai", {
    body: {
      contentType: "portfolio",
      source: {
        title: form.title.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        category: form.category,
      },
      imageUrls: [form.coverImage, ...form.gallery].filter(Boolean),
    },
  });

  if (error) {
    const details = await error.context?.json().catch(() => null);

    console.error("FUNCTION ERROR:", details);

    throw new Error(
      details?.details ||
      details?.error ||
      JSON.stringify(details) ||
      "AI_GENERATION_FAILED"
    );
  }

  return mergeGeneratedContent(form, data);
}