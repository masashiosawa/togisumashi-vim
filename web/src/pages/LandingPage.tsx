import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "../components/ThemeToggle";
import { LOCALES, type Locale, detectLocale, setLocale } from "../i18n";

export function LandingPage() {
  const navigate = useNavigate();
  const [locale, setDisplayLocale] = useState<Locale>(() => detectLocale() as Locale);

  function handleStart() {
    navigate(`/${locale}`);
  }

  function handleLocaleSwitch(next: Locale) {
    setDisplayLocale(next);
    setLocale(next);
  }

  const isJa = locale === "ja";

  return (
    <div className="lp">
      <header className="lp-header">
        <span className="lp-logo">
          togisumashi<span>-vim</span>
        </span>
        <div className="lp-header-controls">
          <LpLocaleSwitcher current={locale} onChange={handleLocaleSwitch} />
          <ThemeToggle />
        </div>
      </header>

      <main className="lp-main">
        <section className="lp-hero">
          <h1 className="lp-hero-headline">{isJa ? "研ぎ澄まし" : "Togisumashi"}</h1>
          <p className="lp-hero-tagline">
            {isJa ? (
              "研ぎ澄ましとは、極限まで技術を磨き上げること。反復が、動作を本能にする。"
            ) : (
              <>
                <em>Togisumashi</em> (研ぎ澄まし) — a Japanese word for &ldquo;sharpening to the
                extreme.&rdquo; Mastery through deliberate repetition.
              </>
            )}
          </p>
          <p className="lp-hero-sub">
            {isJa
              ? "Neovim 速度特訓ドリル。65 問以上。インストール不要。"
              : "Speed drills for Neovim. 65+ exercises. No install needed."}
          </p>
          <button type="button" className="lp-cta btn-primary btn-large" onClick={handleStart}>
            {isJa ? "ドリルを始める" : "Start drilling"}
            <span className="lp-cta-arrow">→</span>
          </button>
        </section>

        <section className="lp-features">
          <div className="lp-feature">
            <span className="lp-feature-icon">⚡</span>
            <h3 className="lp-feature-title">{isJa ? "65 問以上のドリル" : "65+ drills"}</h3>
            <p className="lp-feature-desc">
              {isJa
                ? "Tier 1（hjkl）から Tier 4（マスター）まで段階的に習熟。"
                : "Progress from Tier 1 (hjkl) through Tier 4 master challenges at your own pace."}
            </p>
          </div>
          <div className="lp-feature">
            <span className="lp-feature-icon">📖</span>
            <h3 className="lp-feature-title">{isJa ? "ガイドモード" : "Guided learning"}</h3>
            <p className="lp-feature-desc">
              {isJa
                ? "各レッスン開始前にコンセプトを確認。10 のレッスンで体系的に学ぶ。"
                : "Review each lesson concept before drilling. 10 structured lessons."}
            </p>
          </div>
          <div className="lp-feature">
            <span className="lp-feature-icon">⏱</span>
            <h3 className="lp-feature-title">{isJa ? "目標タイム制" : "Timed challenges"}</h3>
            <p className="lp-feature-desc">
              {isJa
                ? "全ドリルに目標タイムあり。テストモードでシャドウを隠してタイムを競う。"
                : "Every drill has a target time. Test mode hides hints — beat the clock."}
            </p>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <a
          href="https://github.com/masashiosawa/togisumashi-vim"
          target="_blank"
          rel="noopener noreferrer"
          className="lp-footer-link"
        >
          GitHub
        </a>
        <span className="lp-footer-sep">·</span>
        <span className="lp-footer-copy">MIT License</span>
      </footer>
    </div>
  );
}

interface LpLocaleSwitcherProps {
  current: Locale;
  onChange: (locale: Locale) => void;
}

function LpLocaleSwitcher({ current, onChange }: LpLocaleSwitcherProps) {
  return (
    <fieldset className="locale-switcher">
      <legend className="sr-only">Language</legend>
      {LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          className={current === loc ? "active" : ""}
          aria-pressed={current === loc}
          onClick={() => onChange(loc as Locale)}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </fieldset>
  );
}
