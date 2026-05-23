import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { LocaleSwitcher } from "./components/LocaleSwitcher";
import { ThemeToggle } from "./components/ThemeToggle";
import { LOCALES, type Locale, detectLocale, i18n, setLocale } from "./i18n";
import { HonePage } from "./pages/HonePage";
import { HomePage } from "./pages/HomePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${detectLocale()}`} replace />} />
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="hone" element={<HonePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>();

  useEffect(() => {
    if (locale && LOCALES.includes(locale as Locale) && i18n.locale !== locale) {
      setLocale(locale as Locale);
    }
  }, [locale]);

  if (!locale || !LOCALES.includes(locale as Locale)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <a href={`/${locale}`} className="app-logo">
          togisumashi<span>-vim</span>
        </a>
        <div className="app-header-controls">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
