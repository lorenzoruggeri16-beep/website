import AppRouter from "./router/AppRouter";
import CookieBanner from "./components/privacy/CookieBanner";
import CalendlyEmbed from "./components/calendly/CalendlyEmbed";

export default function App() {
  return (
    <>
      <AppRouter />
      <CalendlyEmbed />
      <CookieBanner />
    </>
  );
}
