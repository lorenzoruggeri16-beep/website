export const CALENDLY_URL = "https://calendly.com/contacto-goldenlightstudio/golden-light-session";
export const CALENDLY_OPEN_EVENT = "gls:open-calendly";

export function openCalendly() {
  window.dispatchEvent(new Event(CALENDLY_OPEN_EVENT));
}