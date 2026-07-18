import { supabase } from "../lib/supabase";
import { mergeGeneratedContent } from "../lib/contentTranslations";

export async function generateJournalContent(article) {
  const imageUrls = article.blocks
    .filter((block) => block.type === "image" && block.image)
    .map((block) => block.image);

  const { data, error } = await supabase.functions.invoke("content-ai", {
    body: {
      contentType: "article",
      source: {
        title: article.title.trim(),
        category: article.category.trim(),
        excerpt: article.excerpt.trim(),
        blocks: article.blocks,
      },
      imageUrls: [article.coverImage, ...imageUrls].filter(Boolean),
    },
  });

  if (error) {
    throw new Error("L'AI non ha potuto generare i contenuti. L'articolo non è stato salvato.");
  }

  return mergeGeneratedContent(article, data);
}
