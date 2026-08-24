import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { CALENDLY_OPEN_EVENT, CALENDLY_URL } from "../../lib/calendly";

const SCRIPT_ID = "calendly-widget-script";
const STYLES_ID = "calendly-widget-styles";
const ASSETS_PRECONNECT_ID = "calendly-assets-preconnect";
const APP_PRECONNECT_ID = "calendly-app-preconnect";
const SCRIPT_URL = "https://assets.calendly.com/assets/external/widget.js";
const STYLES_URL = "https://assets.calendly.com/assets/external/widget.css";

function addPreconnect(id, href) {
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "preconnect";
  link.href = href;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}
function loadCalendlyWidget() {
  if (window.Calendly) return Promise.resolve();

  const existingScript = document.getElementById(SCRIPT_ID);

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", resolve, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_URL;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function loadCalendlyStyles() {
  if (document.getElementById(STYLES_ID)) return;

  const styles = document.createElement("link");
  styles.id = STYLES_ID;
  styles.rel = "stylesheet";
  styles.href = STYLES_URL;
  document.head.appendChild(styles);
}

export default function CalendlyEmbed() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const widgetRef = useRef(null);

  useEffect(() => {
    addPreconnect(ASSETS_PRECONNECT_ID, "https://assets.calendly.com");
    addPreconnect(APP_PRECONNECT_ID, "https://calendly.com");

    const warmUp = () => {
      loadCalendlyStyles();
      loadCalendlyWidget().catch(() => {});
    };
    const warmUpId = window.setTimeout(warmUp, 1200);

    return () => window.clearTimeout(warmUpId);
  }, []);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleCalendlyMessage = (event) => {
      if (event.origin !== "https://calendly.com") return;
      if (event.data?.event !== "calendly.event_scheduled") return;

      window.location.href = "/booking-confirmed";
    };

    window.addEventListener(CALENDLY_OPEN_EVENT, handleOpen);
    window.addEventListener("message", handleCalendlyMessage);

    return () => {
      window.removeEventListener(CALENDLY_OPEN_EVENT, handleOpen);
      window.removeEventListener("message", handleCalendlyMessage);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    let cancelled = false;
    const parentElement = widgetRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const initialiseWidget = async () => {
      setHasError(false);
      loadCalendlyStyles();

      try {
        await loadCalendlyWidget();

        if (cancelled || !parentElement || !window.Calendly) return;

        parentElement.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement,
        });
      } catch {
        if (!cancelled) setHasError(true);
      }
    };

    initialiseWidget();

    return () => {
      cancelled = true;
      document.body.style.overflow = previousOverflow;

      if (parentElement) parentElement.innerHTML = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex overflow-y-auto bg-[#0B0B0B]/90 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:overflow-hidden sm:p-6" role="dialog" aria-modal="true" aria-labelledby="calendly-dialog-title">
      <div className="flex min-h-[100svh] w-full flex-col bg-[#F7F7F5] shadow-2xl sm:h-[min(900px,calc(100svh-3rem))] sm:min-h-0 sm:max-w-5xl">
        <header className="flex items-center justify-between bg-[#0B0B0B] px-5 py-4 text-[#F7F7F5] sm:px-7 sm:py-5">
          <p id="calendly-dialog-title" className="text-[10px] uppercase tracking-[0.28em] sm:text-xs sm:tracking-[0.35em]">
            Book a Session
          </p>
          <button type="button" onClick={() => setIsOpen(false)} className="inline-flex items-center gap-2 p-1 text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-[#C8A55A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7F7F5] sm:text-xs" aria-label="Close booking calendar">
            Close <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-[760px] flex-1 overflow-y-auto bg-[#F7F7F5]">
          {hasError ? (
            <div className="flex min-h-full items-center justify-center px-6 py-16 text-center text-[#0B0B0B]">
              <p className="max-w-md text-lg leading-relaxed">
                The booking calendar could not be loaded. Please try again in a moment.
              </p>
            </div>
          ) : (
            <div ref={widgetRef} className="h-full min-h-[760px] w-full [&>iframe]:h-full [&>iframe]:min-h-[760px] [&>iframe]:w-full" style={{ minWidth: "320px", minHeight: "760px", height: "100%" }} />
          )}
        </div>
      </div>
    </div>
  );
}