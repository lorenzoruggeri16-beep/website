import { supabase } from "../lib/supabase";

const BUCKETS = {
  portfolio: "portfolio-images",
  journal: "journal",
};

function extensionFor(file) {
  return file?.name?.includes(".")
    ? file.name.split(".").pop().toLowerCase()
    : "jpg";
}

function publicUrl(bucket, path) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

export function storagePathFromUrl(bucket, url) {
  if (!url || typeof url !== "string") return null;

  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;

  return decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
}

function urlsFromBlocks(blocks = []) {
  return blocks
    .filter((block) => block?.type === "image" && typeof block.image === "string")
    .map((block) => block.image);
}

function assetFromUrl({ bucket, url, kind, record }) {
  return {
    id: `${record.id}:${kind}:${url}`,
    bucket,
    url,
    path: storagePathFromUrl(bucket, url),
    kind,
    recordId: record.id,
    recordType: bucket === BUCKETS.portfolio ? "portfolio" : "journal",
    recordTitle: record.title || "Senza titolo",
    recordSlug: record.slug || "",
  };
}

function recordAssets(record, recordType) {
  const bucket = recordType === "portfolio" ? BUCKETS.portfolio : BUCKETS.journal;
  const assets = [];

  if (record.cover_image) {
    assets.push(assetFromUrl({ bucket, url: record.cover_image, kind: "cover", record }));
  }

  const gallery = recordType === "portfolio"
    ? record.gallery || []
    : urlsFromBlocks(record.blocks);

  gallery.forEach((url, index) => {
    if (url) assets.push(assetFromUrl({ bucket, url, kind: `image-${index}`, record }));
  });

  return assets;
}

async function listFiles(bucket, path = "") {
  const { data, error } = await supabase.storage.from(bucket).list(path, {
    limit: 1000,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });
  if (error) throw error;

  const files = [];
  for (const entry of data || []) {
    const entryPath = path ? `${path}/${entry.name}` : entry.name;
    if (entry.id) {
      files.push({ ...entry, path: entryPath, bucket, url: publicUrl(bucket, entryPath) });
    } else {
      files.push(...await listFiles(bucket, entryPath));
    }
  }
  return files;
}

async function getRecord(asset) {
  const table = asset.recordType === "portfolio" ? "portfolio" : "articles";
  const { data, error } = await supabase
    .from(table)
    .select(asset.recordType === "portfolio" ? "id, title, slug, cover_image, gallery" : "id, title, slug, cover_image, blocks")
    .eq("id", asset.recordId)
    .single();

  if (error) throw error;
  return data;
}

function recordContainsUrl(record, recordType, url) {
  return record.cover_image === url || (
    recordType === "portfolio"
      ? (record.gallery || []).includes(url)
      : urlsFromBlocks(record.blocks).includes(url)
  );
}

function deletePayload(record, recordType, url, replacementCover) {
  if (recordType === "portfolio") {
    return {
      gallery: (record.gallery || []).filter((image) => image !== url),
      ...(record.cover_image === url ? { cover_image: replacementCover } : {}),
    };
  }

  return {
    blocks: (record.blocks || []).map((block) => (
      block?.type === "image" && block.image === url
        ? { ...block, image: "" }
        : block
    )),
    ...(record.cover_image === url ? { cover_image: replacementCover } : {}),
  };
}

function replacementPayload(record, recordType, oldUrl, newUrl) {
  if (recordType === "portfolio") {
    return {
      gallery: (record.gallery || []).map((image) => image === oldUrl ? newUrl : image),
      ...(record.cover_image === oldUrl ? { cover_image: newUrl } : {}),
    };
  }

  return {
    blocks: (record.blocks || []).map((block) => (
      block?.type === "image" && block.image === oldUrl
        ? { ...block, image: newUrl }
        : block
    )),
    ...(record.cover_image === oldUrl ? { cover_image: newUrl } : {}),
  };
}

async function updateRecord(asset, payload) {
  const table = asset.recordType === "portfolio" ? "portfolio" : "articles";
  const { error } = await supabase.from(table).update(payload).eq("id", asset.recordId);
  if (error) throw error;
}

export async function fetchMediaLibrary() {
  const [portfolioResponse, journalResponse, portfolioFiles, journalFiles] = await Promise.all([
   supabase
      .from("portfolio")
      .select("id, title, slug, cover_image, gallery, deleted, created_at"),

   supabase
      .from("articles")
      .select("id, title, slug, cover_image, blocks, deleted, created_at"),
    listFiles(BUCKETS.portfolio),
    listFiles(BUCKETS.journal),
  ]);

  if (portfolioResponse.error) throw portfolioResponse.error;
  if (journalResponse.error) throw journalResponse.error;

  const allPortfolio = portfolioResponse.data || [];
  const allJournal = journalResponse.data || [];
  const portfolio = allPortfolio.filter((record) => !record.deleted);
  const journal = allJournal.filter((record) => !record.deleted);
  const referencedAssets = [
    ...allPortfolio.flatMap((record) => recordAssets(record, "portfolio")),
    ...allJournal.flatMap((record) => recordAssets(record, "journal")),
  ];
  const referencePaths = new Set(referencedAssets.map((asset) => `${asset.bucket}:${asset.path}`).filter(Boolean));
  const files = [...portfolioFiles, ...journalFiles];
  const fileByPath = new Map(files.map((file) => [`${file.bucket}:${file.path}`, file]));

  const projects = {
    portfolio: portfolio.map((record) => ({
      ...record,
      type: "portfolio",
      assets: recordAssets(record, "portfolio").map((asset) => ({ ...asset, file: fileByPath.get(`${asset.bucket}:${asset.path}`) || null })),
    })),
    journal: journal.map((record) => ({
      ...record,
      type: "journal",
      assets: recordAssets(record, "journal").map((asset) => ({ ...asset, file: fileByPath.get(`${asset.bucket}:${asset.path}`) || null })),
    })),
  };

  const storageBytes = files.reduce((total, file) => total + Number(file.metadata?.size || 0), 0);
  const orphans = files.filter((file) => !referencePaths.has(`${file.bucket}:${file.path}`));

  return {
    projects,
    files,
    orphans,
    stats: {
      projects: portfolio.length,
      images: files.length,
      bytes: storageBytes,
      orphans: orphans.length,
    },
  };
}

export function getCoverReplacementOptions(asset, record) {
  if (asset.recordType === "portfolio") {
    return (record.gallery || []).filter((url) => url && url !== asset.url);
  }
  return urlsFromBlocks(record.blocks).filter((url) => url && url !== asset.url);
}

export async function prepareMediaDeletion(asset) {
  const record = await getRecord(asset);
  if (!recordContainsUrl(record, asset.recordType, asset.url)) {
    throw new Error("L'immagine non appartiene piÃ¹ a questo contenuto.");
  }

  const isCover = record.cover_image === asset.url;
  const imageCount = new Set([
    record.cover_image,
    ...(asset.recordType === "portfolio" ? record.gallery || [] : urlsFromBlocks(record.blocks)),
  ].filter(Boolean)).size;

  return { record, isCover, imageCount, replacementOptions: getCoverReplacementOptions(asset, record) };
}

export async function deleteReferencedMedia(asset, replacementCover) {
  const preparation = await prepareMediaDeletion(asset);
  if (preparation.isCover && !replacementCover) {
    const error = new Error("Scegli una nuova copertina prima di eliminare questa immagine.");
    error.code = "COVER_REPLACEMENT_REQUIRED";
    error.preparation = preparation;
    throw error;
  }
  if (preparation.imageCount <= 1) {
    const error = new Error("Non puoi eliminare l'ultima immagine del contenuto.");
    error.code = "LAST_IMAGE_BLOCKED";
    throw error;
  }
  if (!asset.path) throw new Error("Impossibile individuare il file nello Storage.");

  const payload = deletePayload(preparation.record, asset.recordType, asset.url, replacementCover);
  const { error: storageError } = await supabase.storage.from(asset.bucket).remove([asset.path]);
  if (storageError) throw storageError;

  try {
    await updateRecord(asset, payload);
  } catch (databaseError) {
    const error = new Error("File eliminato dallo Storage, ma il database non Ã¨ stato aggiornato.");
    error.code = "DATABASE_REPAIR_REQUIRED";
    error.repair = { asset, payload };
    error.cause = databaseError;
    throw error;
  }
}

export async function retryMediaDatabaseRepair(repair) {
  await updateRecord(repair.asset, repair.payload);
}

export async function replaceReferencedMedia(asset, file) {
  const record = await getRecord(asset);
  if (!recordContainsUrl(record, asset.recordType, asset.url)) {
    throw new Error("L'immagine non appartiene piÃ¹ a questo contenuto.");
  }
  if (!asset.path) throw new Error("Impossibile individuare il file nello Storage.");

  const newPath = `${crypto.randomUUID()}.${extensionFor(file)}`;
  const { error: uploadError } = await supabase.storage.from(asset.bucket).upload(newPath, file, { upsert: false });
  if (uploadError) throw uploadError;

  const newUrl = publicUrl(asset.bucket, newPath);
  try {
    await updateRecord(asset, replacementPayload(record, asset.recordType, asset.url, newUrl));
  } catch (databaseError) {
    await supabase.storage.from(asset.bucket).remove([newPath]);
    throw databaseError;
  }

  const { error: removeError } = await supabase.storage.from(asset.bucket).remove([asset.path]);
  if (removeError) {
    const error = new Error("La nuova immagine Ã¨ attiva, ma il vecchio file non Ã¨ stato eliminato.");
    error.code = "OLD_FILE_CLEANUP_REQUIRED";
    error.oldFile = { bucket: asset.bucket, path: asset.path };
    throw error;
  }
}

export async function deleteOrphanedMedia(files) {
  const grouped = files.reduce((groups, file) => {
    groups[file.bucket] = [...(groups[file.bucket] || []), file.path];
    return groups;
  }, {});

  await Promise.all(Object.entries(grouped).map(async ([bucket, paths]) => {
    const { error } = await supabase.storage.from(bucket).remove(paths);
    if (error) throw error;
  }));
}

