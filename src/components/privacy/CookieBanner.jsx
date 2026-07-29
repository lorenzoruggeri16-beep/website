import { useEffect, useState } from "react";
import { X } from "lucide-react";

import {
  DEFAULT_CONSENT,
  getConsent,
  initializeConsent,
  saveConsent,
} from "../../lib/consent";

const COPY = {
  es: {
    eyebrow: "Tu privacidad",
    title: "Tu experiencia, bajo tu control.",
    text: "Usamos cookies necesarias para el funcionamiento del sitio y, con tu permiso, cookies de an\u00e1lisis y marketing para mejorar nuestros servicios.",
    accept: "Aceptar todo",
    reject: "Solo necesarias",
    settings: "Personalizar",
    save: "Guardar preferencias",
    necessary: "Necesarias",
    analytics: "An\u00e1lisis",
    marketing: "Marketing",
    necessaryText: "Permiten las funciones esenciales del sitio y no se pueden desactivar.",
    analyticsText: "Nos ayudan a comprender el uso del sitio de forma agregada.",
    marketingText: "Permiten medir campa\u00f1as y personalizar comunicaciones publicitarias.",
  },
  it: {
    eyebrow: "La tua privacy",
    title: "La tua esperienza, sotto il tuo controllo.",
    text: "Usiamo cookie necessari al funzionamento del sito e, con il tuo consenso, cookie di analisi e marketing per migliorare i nostri servizi.",
    accept: "Accetta tutto",
    reject: "Solo necessari",
    settings: "Personalizza",
    save: "Salva preferenze",
    necessary: "Necessari",
    analytics: "Analitici",
    marketing: "Marketing",
    necessaryText: "Consentono le funzioni essenziali del sito e non possono essere disattivati.",
    analyticsText: "Ci aiutano a comprendere in forma aggregata come viene usato il sito.",
    marketingText: "Consentono di misurare le campagne e personalizzare le comunicazioni pubblicitarie.",
  },
  en: {
    eyebrow: "Your privacy",
    title: "Your experience, in your control.",
    text: "We use essential cookies to run this website and, with your permission, analytics and marketing cookies to improve our services.",
    accept: "Accept all",
    reject: "Essential only",
    settings: "Customize",
    save: "Save preferences",
    necessary: "Essential",
    analytics: "Analytics",
    marketing: "Marketing",
    necessaryText: "They enable essential website functions and cannot be disabled.",
    analyticsText: "They help us understand website usage in aggregate form.",
    marketingText: "They allow campaign measurement and personalized advertising communications.",
  },
};

export default function CookieBanner() {
  const [preferences, setPreferences] = useState(() => getConsent() || DEFAULT_CONSENT);
  const [isOpen, setIsOpen] = useState(() => !getConsent());
  const [isDetailed, setIsDetailed] = useState(false);
  const language = window.localStorage.getItem("language") || "es";
  const copy = COPY[language] || COPY.es;

  useEffect(() => {
    initializeConsent();

    const openSettings = () => {
      setPreferences(getConsent() || DEFAULT_CONSENT);
      setIsDetailed(true);
      setIsOpen(true);
    };

    window.addEventListener("gls:open-consent-settings", openSettings);
    return () => window.removeEventListener("gls:open-consent-settings", openSettings);
  }, []);

  const confirm = (next) => {
    setPreferences(saveConsent(next));
    setIsOpen(false);
    setIsDetailed(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end bg-black/25 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <section className="relative w-full max-w-2xl border border-black/10 bg-[#f8f6f2] p-5 shadow-2xl sm:p-8">
        <div className="flex items-start gap-4">
          <div className="max-w-[18rem] sm:max-w-xl">
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] opacity-55 sm:mb-3">{copy.eyebrow}</p>
            <h2 id="cookie-consent-title" className="text-[2rem] font-light leading-[0.98] sm:text-4xl sm:leading-normal">
              {copy.title}
            </h2>
          </div>
        </div>

        {isDetailed && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close cookie settings"
            className="absolute right-5 top-5 rounded-full p-1 text-black/60 transition hover:bg-black/5 hover:text-black sm:right-6 sm:top-6"
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          </button>
        )}

        <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-70 sm:mt-5">{copy.text}</p>

        {isDetailed && (
          <div className="mt-5 space-y-2 border-y border-black/10 py-4 sm:mt-7 sm:space-y-4 sm:py-5">
            <Preference label={copy.necessary} description={copy.necessaryText} checked disabled />
            <Preference label={copy.analytics} description={copy.analyticsText} checked={preferences.analytics} onChange={(checked) => setPreferences((current) => ({ ...current, analytics: checked }))} />
            <Preference label={copy.marketing} description={copy.marketingText} checked={preferences.marketing} onChange={(checked) => setPreferences((current) => ({ ...current, marketing: checked }))} />
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
          <button type="button" onClick={() => confirm({ ...DEFAULT_CONSENT, analytics: true, marketing: true })} className="w-full bg-black px-5 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#c6a66a] sm:w-auto">
            {copy.accept}
          </button>
          <button type="button" onClick={() => confirm(DEFAULT_CONSENT)} className="w-full border border-black px-5 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-black hover:text-white sm:w-auto">
            {copy.reject}
          </button>
          {isDetailed ? (
            <button type="button" onClick={() => confirm(preferences)} className="mt-1 self-start px-0 py-2 text-xs uppercase tracking-[0.16em] underline underline-offset-4 sm:mt-0 sm:px-3 sm:py-3 sm:tracking-[0.2em]">
              {copy.save}
            </button>
          ) : (
            <button type="button" onClick={() => setIsDetailed(true)} className="mt-1 self-start px-0 py-2 text-xs uppercase tracking-[0.16em] underline underline-offset-4 sm:mt-0 sm:px-3 sm:py-3 sm:tracking-[0.2em]">
              {copy.settings}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function Preference({ label, description, checked, disabled = false, onChange }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 py-1">
      <span className="min-w-0">
        <span className="block text-sm leading-tight">{label}</span>
        <span className="mt-1 block text-xs leading-relaxed opacity-60">{description}</span>
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-black" />
    </label>
  );
}
