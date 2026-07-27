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
    text: "Usamos cookies necesarias para el funcionamiento del sitio y, con tu permiso, cookies de anÃ¡lisis y marketing para mejorar nuestros servicios.",
    accept: "Aceptar todo",
    reject: "Solo necesarias",
    settings: "Personalizar",
    save: "Guardar preferencias",
    necessary: "Necesarias",
    analytics: "AnÃ¡lisis",
    marketing: "Marketing",
    necessaryText: "Permiten las funciones esenciales del sitio y no se pueden desactivar.",
    analyticsText: "Nos ayudan a comprender el uso del sitio de forma agregada.",
    marketingText: "Permiten medir campaÃ±as y personalizar comunicaciones publicitarias.",
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
    <div className="fixed inset-0 z-[200] flex items-end bg-black/25 p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="cookie-consent-title">
      <section className="w-full max-w-2xl border border-black/10 bg-[#f8f6f2] p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] opacity-55">{copy.eyebrow}</p>
            <h2 id="cookie-consent-title" className="text-3xl font-light sm:text-4xl">{copy.title}</h2>
          </div>
          {isDetailed && <button type="button" onClick={() => setIsOpen(false)} aria-label="Close cookie settings" className="p-2"><X size={18} /></button>}
        </div>

        <p className="mt-5 max-w-xl text-sm leading-relaxed opacity-70">{copy.text}</p>

        {isDetailed && (
          <div className="mt-7 space-y-4 border-y border-black/10 py-5">
            <Preference label={copy.necessary} description={copy.necessaryText} checked disabled />
            <Preference label={copy.analytics} description={copy.analyticsText} checked={preferences.analytics} onChange={(checked) => setPreferences((current) => ({ ...current, analytics: checked }))} />
            <Preference label={copy.marketing} description={copy.marketingText} checked={preferences.marketing} onChange={(checked) => setPreferences((current) => ({ ...current, marketing: checked }))} />
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={() => confirm({ ...DEFAULT_CONSENT, analytics: true, marketing: true })} className="bg-black px-5 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-[#c6a66a]">{copy.accept}</button>
          <button type="button" onClick={() => confirm(DEFAULT_CONSENT)} className="border border-black px-5 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-black hover:text-white">{copy.reject}</button>
          {isDetailed ? (
            <button type="button" onClick={() => confirm(preferences)} className="px-3 py-3 text-xs uppercase tracking-[0.2em] underline underline-offset-4">{copy.save}</button>
          ) : (
            <button type="button" onClick={() => setIsDetailed(true)} className="px-3 py-3 text-xs uppercase tracking-[0.2em] underline underline-offset-4">{copy.settings}</button>
          )}
        </div>
      </section>
    </div>
  );
}

function Preference({ label, description, checked, disabled = false, onChange }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-5">
      <span><span className="block text-sm">{label}</span><span className="mt-1 block text-xs leading-relaxed opacity-60">{description}</span></span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange?.(event.target.checked)} className="mt-1 h-4 w-4 accent-black" />
    </label>
  );
}


