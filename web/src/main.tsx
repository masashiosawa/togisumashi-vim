import { I18nProvider } from "@lingui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { LOCALES, type Locale, detectLocale, i18n, setLocale } from "./i18n";
import "./index.css";
import "./lib/vimCustomMappings";

// URL に locale が含まれていればそれを初期値に (リロード時のちらつき防止)
const urlSegment = window.location.pathname.split("/").filter(Boolean)[0];
const initialLocale: Locale = LOCALES.includes(urlSegment as Locale)
  ? (urlSegment as Locale)
  : detectLocale();
setLocale(initialLocale);

// テーマ初期化（ちらつき防止のため React レンダリング前に実行）
const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.documentElement.dataset.theme = savedTheme ?? (prefersDark ? "dark" : "light");

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

createRoot(rootEl).render(
  <StrictMode>
    <I18nProvider i18n={i18n}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </StrictMode>,
);
