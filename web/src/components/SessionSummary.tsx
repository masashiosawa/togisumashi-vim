import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { type ReactNode, useEffect, useMemo } from "react";
import type { Attempt, Level } from "../lib/storage";
import type { DrillDef } from "../types/drill";

interface Props {
  level: Level;
  attempts: Attempt[];
  pool: DrillDef[];
  onReplay: () => void;
  onHome: () => void;
  onFocus: (drillIds: string[]) => void;
}

export function SessionSummary({ level, attempts, pool, onReplay, onHome, onFocus }: Props) {
  const { i18n } = useLingui();
  const locale = (i18n.locale ?? "en") as "en" | "ja";

  const totalElapsed = attempts.reduce((s, a) => s + a.elapsedMs, 0);
  const fasterCount = attempts.filter((a) => a.elapsedMs < a.targetMs).length;

  // 苦手 = elapsed/target > 1.0 のもの上位 3 つ
  const weakDrills = useMemo(() => {
    const ranked = attempts
      .map((a) => ({ attempt: a, ratio: a.elapsedMs / a.targetMs }))
      .filter((x) => x.ratio > 1.0)
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 3);
    return ranked
      .map((r) => pool.find((d) => d.id === r.attempt.drillId))
      .filter((d): d is DrillDef => !!d);
  }, [attempts, pool]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tgt = e.target as HTMLElement | null;
      if (tgt?.closest(".cm-editor")) return;

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onReplay();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onHome();
      } else if ((e.key === "f" || e.key === "F") && weakDrills.length > 0) {
        e.preventDefault();
        onFocus(weakDrills.map((d) => d.id));
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onReplay, onHome, onFocus, weakDrills]);

  const levelLabel: Record<Level, ReactNode> = {
    beginner: <Trans>Beginner</Trans>,
    intermediate: <Trans>Intermediate</Trans>,
    advanced: <Trans>Advanced</Trans>,
  };

  return (
    <div className="session-summary">
      <p className="summary-eyebrow">{levelLabel[level]}</p>
      <h2 className="summary-title">
        <Trans>Session complete</Trans>
      </h2>

      <div className="summary-stats">
        <div className="summary-stat">
          <span className="summary-stat-num">{attempts.length}</span>
          <span className="summary-stat-label">
            <Trans>drills</Trans>
          </span>
        </div>
        <div className="summary-stat">
          <span className="summary-stat-num">{fasterCount}</span>
          <span className="summary-stat-label">
            <Trans>under target</Trans>
          </span>
        </div>
        <div className="summary-stat">
          <span className="summary-stat-num">{(totalElapsed / 1000).toFixed(1)}s</span>
          <span className="summary-stat-label">
            <Trans>total</Trans>
          </span>
        </div>
      </div>

      {weakDrills.length > 0 && (
        <div className="summary-weak">
          <p className="summary-weak-head">
            <Trans>Slower than target — practice these:</Trans>
          </p>
          <ul className="summary-weak-list">
            {weakDrills.map((d) => (
              <li key={d.id}>
                <span className="summary-weak-title">{d.i18n[locale].title}</span>
                <span className="drill-tier">Tier {d.tier}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onFocus(weakDrills.map((d) => d.id))}
          >
            <Trans>Focus practice</Trans>
            <span className="btn-hint">F</span>
          </button>
        </div>
      )}

      <div className="summary-actions">
        <button type="button" onClick={onReplay} className="btn-primary">
          <Trans>Play again</Trans>
          <span className="btn-hint">Space</span>
        </button>
        <button type="button" onClick={onHome} className="btn-secondary">
          <Trans>Menu</Trans>
          <span className="btn-hint">Esc</span>
        </button>
      </div>
    </div>
  );
}
