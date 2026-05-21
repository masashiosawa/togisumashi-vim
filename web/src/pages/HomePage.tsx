import { Trans } from "@lingui/react/macro";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDrills } from "../hooks/useDrills";
import { LEVELS, filterByLevel } from "../lib/session";
import { type Level, loadLastLevel, saveLastLevel } from "../lib/storage";

export function HomePage() {
  const { locale } = useParams<{ locale: string }>();
  const navigate = useNavigate();
  const { drills, loading } = useDrills();

  const [selected, setSelected] = useState<Level>(() => loadLastLevel() ?? "beginner");

  const startDrill = useCallback(
    (level: Level) => {
      saveLastLevel(level);
      navigate(`/${locale}/drills?level=${level}`);
    },
    [locale, navigate],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // テキスト入力中などはスキップ
      const tgt = e.target as HTMLElement | null;
      if (tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA" || tgt.isContentEditable)) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        startDrill(selected);
      } else if (e.key === "ArrowRight" || e.key === "l" || e.key === "j") {
        e.preventDefault();
        const idx = LEVELS.indexOf(selected);
        setSelected(LEVELS[(idx + 1) % LEVELS.length]);
      } else if (e.key === "ArrowLeft" || e.key === "h" || e.key === "k") {
        e.preventDefault();
        const idx = LEVELS.indexOf(selected);
        setSelected(LEVELS[(idx - 1 + LEVELS.length) % LEVELS.length]);
      } else if (e.key === "1") {
        e.preventDefault();
        startDrill("beginner");
      } else if (e.key === "2") {
        e.preventDefault();
        startDrill("intermediate");
      } else if (e.key === "3") {
        e.preventDefault();
        startDrill("advanced");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, startDrill]);

  if (loading) {
    return (
      <p className="drill-loading">
        <Trans>Loading drills…</Trans>
      </p>
    );
  }

  const counts = {
    beginner: filterByLevel(drills, "beginner").length,
    intermediate: filterByLevel(drills, "intermediate").length,
    advanced: filterByLevel(drills, "advanced").length,
  };

  return (
    <div className="home">
      <h2 className="home-title">
        <Trans>Master Vim, drill by drill.</Trans>
      </h2>
      <p className="home-lede">
        <Trans>Pick a level. Press Space.</Trans>
      </p>

      <div className="level-cards" role="radiogroup" aria-label="Difficulty">
        {LEVELS.map((lvl, idx) => (
          <button
            key={lvl}
            type="button"
            // biome-ignore lint/a11y/useSemanticElements: visual card behaves as a radio choice
            role="radio"
            aria-checked={selected === lvl}
            className={`level-card ${selected === lvl ? "selected" : ""}`}
            onClick={() => startDrill(lvl)}
            onMouseEnter={() => setSelected(lvl)}
          >
            <span className="level-card-num">{idx + 1}</span>
            <span className="level-card-title">
              {lvl === "beginner" && <Trans>Beginner</Trans>}
              {lvl === "intermediate" && <Trans>Intermediate</Trans>}
              {lvl === "advanced" && <Trans>Advanced</Trans>}
            </span>
            <span className="level-card-sub">
              {lvl === "beginner" && <Trans>Basic motions</Trans>}
              {lvl === "intermediate" && <Trans>Edit commands</Trans>}
              {lvl === "advanced" && <Trans>Mixed challenge</Trans>}
            </span>
            <span className="level-card-count">
              {counts[lvl]} <Trans>drills</Trans>
            </span>
          </button>
        ))}
      </div>

      <div className="home-cta">
        <button
          type="button"
          className="btn-primary btn-large"
          onClick={() => startDrill(selected)}
        >
          <Trans>Start</Trans>
          <span className="btn-hint">Space</span>
        </button>
        <div className="home-hints">
          <span className="hint-pair">
            <kbd>←</kbd>
            <kbd>→</kbd>
            <Trans>switch</Trans>
          </span>
          <span className="hint-pair">
            <kbd>1</kbd>
            <kbd>2</kbd>
            <kbd>3</kbd>
            <Trans>jump &amp; start</Trans>
          </span>
        </div>
      </div>
    </div>
  );
}
