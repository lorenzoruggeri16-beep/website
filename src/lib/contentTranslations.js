export const CONTENT_LOCALES = ["es", "it", "en"];
export const DEFAULT_CONTENT_LOCALE = "es";

export function buildContentTranslations(record, fields) {
  const source = Object.fromEntries(
    fields.map((field) => [field, record?.[field] || ""])
  );

  return {
    [DEFAULT_CONTENT_LOCALE]: source,
    ...(record?.translations || {}),
  };
}

export function getTranslatedFields(translations, locale, fallback = {}) {
  return {
    ...fallback,
    ...(translations?.[DEFAULT_CONTENT_LOCALE] || {}),
    ...(translations?.[locale] || {}),
  };
}

export function getLocalizedMetadata(metadata, locale) {
  return {
    ...(metadata?.[DEFAULT_CONTENT_LOCALE] || {}),
    ...(metadata?.[locale] || {}),
  };
}

export function mergeGeneratedContent(form, generated) {
  return {
    ...form,
    translations: generated.translations || form.translations || {},
    seo: generated.seo || form.seo || {},
    imageAltText: generated.imageAltText || form.imageAltText || {},
  };
}
