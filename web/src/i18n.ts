import { i18n } from "@lingui/core";
import { messages as enMessages } from "./locales/en/messages";
import { messages as jaMessages } from "./locales/ja/messages";

i18n.load({
  en: enMessages,
  ja: jaMessages,
});

export { i18n };

export type Locale = "en" | "ja";

export const LOCALES: Locale[] = ["en", "ja"];

export function detectLocale(): Locale {
  const saved = localStorage.getItem("locale") as Locale | null;
  if (saved && LOCALES.includes(saved)) return saved;

  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

export function setLocale(locale: Locale) {
  i18n.activate(locale);
  localStorage.setItem("locale", locale);
}
