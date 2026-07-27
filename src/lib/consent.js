const CONSENT_STORAGE_KEY = "gls-consent-v1";
const GTM_ID = "GTM-MKDZBGJ7";

export const DEFAULT_CONSENT = {
  necessary: true,
  analytics: false,
  marketing: false,
};

function safePreferences(value) {
  if (!value || typeof value !== "object") return null;
  if (typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean") return null;

  return {
    necessary: true,
    analytics: value.analytics,
    marketing: value.marketing,
  };
}

export function getConsent() {
  try {
    return safePreferences(JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)));
  } catch {
    return null;
  }
}

function consentMode(preferences) {
  const marketing = preferences.marketing ? "granted" : "denied";

  return {
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
    analytics_storage: preferences.analytics ? "granted" : "denied",
  };
}

function pushConsent(command, preferences) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["consent", command, consentMode(preferences)]);
}

function removeNonEssentialCookies() {
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !/^(?:_ga|_gid|_gat|_gcl)/.test(name)) return;

    ["", `;domain=${window.location.hostname}`, `;domain=.${window.location.hostname}`].forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    });
  });
}

function loadGtm() {
  if (document.querySelector(`script[data-gtm-id="${GTM_ID}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.dataset.gtmId = GTM_ID;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

export function initializeConsent() {
  const stored = getConsent();
  pushConsent("default", stored || DEFAULT_CONSENT);

  if (stored && (stored.analytics || stored.marketing)) {
    pushConsent("update", stored);
    loadGtm();
  }

  return stored;
}

export function saveConsent(preferences) {
  const next = safePreferences(preferences) || DEFAULT_CONSENT;
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
  pushConsent("update", next);

  if (next.analytics || next.marketing) {
    loadGtm();
  } else {
    removeNonEssentialCookies();
  }

  return next;
}

export function openConsentSettings() {
  window.dispatchEvent(new Event("gls:open-consent-settings"));
}
