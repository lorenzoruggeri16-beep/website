import AppRouter from "./router/AppRouter";
import CookieBanner from "./components/privacy/CookieBanner";

export default function App() {
  return (
    <>
      <AppRouter />
      <CookieBanner />
    </>
  );
}
