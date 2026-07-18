import {
  CONTENT_LOCALES,
  DEFAULT_CONTENT_LOCALE,
  getLocalizedMetadata,
} from "./contentTranslations";

/**
 * CMS copy lives on each record. Existing records without translations still
 * render their original text, while new records select the active locale.
 */
export function localizeContent(record, language) {
  const locale = CONTENT_LOCALES.includes(language)
    ? language
    : DEFAULT_CONTENT_LOCALE;
  const translations = record?.translations || {};
  const fallback = translations[DEFAULT_CONTENT_LOCALE]
    || translations.en
    || translations.it
    || {};

  return {
    ...record,
    ...fallback,
    ...(translations[locale] || {}),
    seo: getLocalizedMetadata(record?.seo, locale),
    imageAltText: record?.image_alt_text || {},
  };
}

export function getImageAltText(record, imageUrl, language, fallback = "") {
  const locale = CONTENT_LOCALES.includes(language)
    ? language
    : DEFAULT_CONTENT_LOCALE;
  const values = record?.imageAltText?.[imageUrl]
    || record?.image_alt_text?.[imageUrl]
    || {};

  return values[locale] || values[DEFAULT_CONTENT_LOCALE] || fallback;
}

export const contentLanguages = CONTENT_LOCALES;