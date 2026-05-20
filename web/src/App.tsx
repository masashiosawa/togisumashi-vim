import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { LocaleSwitcher } from "./components/LocaleSwitcher";
import { LOCALES, type Locale, detectLocale, setLocale } from "./i18n";
import { DrillPage } from "./pages/DrillPage";
import { HomePage } from "./pages/HomePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${detectLocale()}`} replace />} />
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="drills" element={<DrillPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>();

  if (!locale || !LOCALES.includes(locale as Locale)) {
    return <Navigate to="/" replace />;
  }

  setLocale(locale as Locale);

  return (
    <div className="app">
      <header className="app-header">
        <h1>togisumashi-vim</h1>
        <LocaleSwitcher />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
