import { useEffect } from "react";
import { Link, Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { LocaleSwitcher } from "./components/LocaleSwitcher";
import { ThemeToggle } from "./components/ThemeToggle";
import { LOCALES, type Locale, i18n, setLocale } from "./i18n";
import { AtlasArticlePage } from "./pages/AtlasArticlePage";
import { AtlasIndexPage } from "./pages/AtlasIndexPage";
import { AtlasShell } from "./pages/AtlasShell";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomePage />} />
        <Route path="atlas" element={<AtlasShell />}>
          <Route index element={<AtlasIndexPage />} />
          <Route path=":id" element={<AtlasArticlePage />} />
        </Route>
      </Route>
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}

function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>();
  const location = useLocation();
  const isAtlas = /\/atlas(\/|$)/.test(location.pathname);

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
        <nav className="app-nav">
          <Link to={`/${locale}/atlas`} className="app-nav-link">
            Atlas
          </Link>
        </nav>
        <div className="app-header-controls">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </header>
      <main className={`app-main ${isAtlas ? "app-main--atlas" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
}
