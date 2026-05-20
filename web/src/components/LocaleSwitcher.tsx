import { useLingui } from "@lingui/react";
import { useNavigate, useParams } from "react-router-dom";
import { LOCALES, type Locale, setLocale } from "../i18n";

export function LocaleSwitcher() {
  const { i18n } = useLingui();
  const { locale } = useParams<{ locale: string }>();
  const navigate = useNavigate();

  function switchLocale(next: Locale) {
    setLocale(next);
    const path = window.location.pathname.replace(`/${locale}`, `/${next}`);
    navigate(path);
  }

  return (
    <fieldset className="locale-switcher">
      <legend className="sr-only">Language</legend>
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
          aria-pressed={i18n.locale === loc}
          className={i18n.locale === loc ? "active" : ""}
        >
          {loc === "en" ? "EN" : "JA"}
        </button>
      ))}
    </fieldset>
  );
}
