import { supabase } from "../lib/supabase";

const PORTFOLIO_BUCKET = "portfolio-images";

function createFileName(file) {
  const extension = file.name.includes(".")
    ? file.name.split(".").pop()
    : "jpg";

  return `${crypto.randomUUID()}.${extension.toLowerCase()}`;
}

export async function uploadPortfolioImage(file) {
  if (!file) return null;

  const fileName = createFileName(file);
  const { error } = await supabase.storage
    .from(PORTFOLIO_BUCKET)
    .upload(fileName, file, { upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from(PORTFOLIO_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function uploadPortfolioGallery(files, onProgress) {
  const uploads = [];

  for (let index = 0; index < files.length; index += 1) {
    uploads.push(await uploadPortfolioImage(files[index]));
    onProgress?.(Math.round(((index + 1) / files.length) * 100));
  }

  return uploads;
}
