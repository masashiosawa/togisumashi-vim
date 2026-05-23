import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DrillRunner } from "../components/DrillRunner";
import { useDrills } from "../hooks/useDrills";
import { instantiateDrill } from "../lib/instantiateDrill";
import { loadAttempts, recordAttempt } from "../lib/storage";
import type { Attempt } from "../lib/storage";
import type { DrillDef } from "../types/drill";

type ChallengePhase = "info" | "running" | "done";

interface ChallengeResult {
  elapsedMs: number;
  targetMs: number;
  withinTarget: boolean;
}

function getChallengeStatus(challengeId: string): {
  cleared: boolean;
  honed: boolean;
  bestMs: number | null;
} {
  const attempts = loadAttempts().filter((a) => a.drillId === challengeId && a.success);
  if (attempts.length === 0) return { cleared: false, honed: false, bestMs: null };
  const bestMs = Math.min(...attempts.map((a) => a.elapsedMs));
  return {
    cleared: true,
    honed: attempts.some((a) => a.elapsedMs <= a.targetMs),
    bestMs,
  };
}

function formatTime(ms: number): string {
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  const m = Math.floor(ms / 60000);
  const s = Math.round((ms % 60000) / 1000);
  return `${m}m ${s}s`;
}

export function HonePage() {
  const { locale } = useParams<{ locale: string }>();
  const { i18n } = useLingui();
  const lang = (i18n.locale ?? "en") as "en" | "ja";
  const { drills, loading } = useDrills();

  useEffect(() => {
    document.body.classList.add("hone-active");
    return () => document.body.classList.remove("hone-active");
  }, []);

  const challenges = useMemo(() => drills.filter((d) => d.tier === 4), [drills]);

  const [selected, setSelected] = useState<DrillDef | null>(null);
  const [phase, setPhase] = useState<ChallengePhase>("info");
  const [result, setResult] = useState<ChallengeResult | null>(null);
  const [attemptKey, setAttemptKey] = useState(0);
  const [statusMap, setStatusMap] = useState<
    Record<string, { cleared: boolean; honed: boolean; bestMs: number | null }>
  >({});

  const refreshStatus = useCallback(() => {
    const map: Record<string, { cleared: boolean; honed: boolean; bestMs: number | null }> = {};
    for (const c of challenges) map[c.id] = getChallengeStatus(c.id);
    setStatusMap(map);
  }, [challenges]);

  useEffect(() => {
    if (challenges.length > 0) refreshStatus();
  }, [challenges.length, refreshStatus]);

  const clearedCount = challenges.filter((c) => statusMap[c.id]?.cleared).length;
  const honedCount = challenges.filter((c) => statusMap[c.id]?.honed).length;
  const allCleared = challenges.length > 0 && clearedCount === challenges.length;
  const allHoned = challenges.length > 0 && honedCount === challenges.length;

  const handleSelect = useCallback((c: DrillDef) => {
    setSelected(c);
    setPhase("info");
    setResult(null);
  }, []);

  const handleStart = useCallback(() => {
    setPhase("running");
    setAttemptKey((k) => k + 1);
  }, []);

  const handleComplete = useCallback(
    (a: Attempt) => {
      recordAttempt(a);
      setResult({
        elapsedMs: a.elapsedMs,
        targetMs: a.targetMs,
        withinTarget: a.elapsedMs <= a.targetMs,
      });
      setPhase("done");
      refreshStatus();
    },
    [refreshStatus],
  );

  const handleRetry = useCallback(() => {
    setResult(null);
    setPhase("running");
    setAttemptKey((k) => k + 1);
  }, []);

  const handleNext = useCallback(() => {
    if (!selected || challenges.length === 0) return;
    const idx = challenges.indexOf(selected);
    const next = challenges[(idx + 1) % challenges.length];
    setSelected(next);
    setPhase("info");
    setResult(null);
  }, [selected, challenges]);

  useEffect(() => {
    if (phase !== "info") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (selected) handleStart();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, selected, handleStart]);

  const drillI18n = selected?.i18n[lang];

  return (
    <div className="hone-page">
      {/* ── Left panel ── */}
      <div className="hone-left">
        <Link to={`/${locale}`} className="hone-back">
          ← <Trans>Back to Practice</Trans>
        </Link>

        <div className="hone-hero">
          <div className="hone-hero-title">{lang === "ja" ? "研ぎ澄ます" : "Hone."}</div>
          <p className="hone-hero-sub">
            {lang === "ja"
              ? "これを楽にこなせるとき、あなたは Vim を研ぎ澄ました。"
              : "When these feel easy, you have honed your Vim."}
          </p>
        </div>

        <div className="hone-challenge-list">
          <span className="hone-section-label">
            <Trans>Challenges</Trans>
          </span>
          {loading ? (
            <p className="hone-loading">
              <Trans>Loading…</Trans>
            </p>
          ) : (
            challenges.map((c, i) => {
              const st = statusMap[c.id];
              const isActive = selected?.id === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`hone-challenge-item ${isActive ? "active" : ""} ${st?.honed ? "honed" : st?.cleared ? "cleared" : ""}`}
                  onClick={() => handleSelect(c)}
                >
                  <span className="hone-challenge-num">#{String(i + 1).padStart(2, "0")}</span>
                  <span className="hone-challenge-name">{c.i18n[lang].title}</span>
                  <span className="hone-challenge-status">
                    {st?.honed ? "⚡" : st?.cleared ? "✓" : "○"}
                    {st?.bestMs != null && (
                      <span className="hone-challenge-time">{formatTime(st.bestMs)}</span>
                    )}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="hone-achievement">
          <span className="hone-section-label">
            <Trans>Achievement</Trans>
          </span>
          <div className={`hone-achievement-row ${allCleared ? "achieved" : ""}`}>
            <span className="hone-achievement-icon">{allCleared ? "✓" : "○"}</span>
            <span className="hone-achievement-name">
              <Trans>Cleared</Trans>
            </span>
            <span className="hone-achievement-count">
              {clearedCount} / {challenges.length}
            </span>
          </div>
          <div className={`hone-achievement-row ${allHoned ? "honed" : ""}`}>
            <span className="hone-achievement-icon">{allHoned ? "⚡" : "○"}</span>
            <span className="hone-achievement-name">
              <Trans>Honed</Trans>
            </span>
            <span className="hone-achievement-count">
              {honedCount} / {challenges.length}
            </span>
          </div>
        </div>
      </div>

      {/* ── Right panel (terminal) ── */}
      <div className="hone-right">
        <div className="terminal-window terminal-dark">
          <div className="terminal-titlebar">
            <span className="terminal-dot terminal-dot--red" />
            <span className="terminal-dot terminal-dot--yellow" />
            <span className="terminal-dot terminal-dot--green" />
            <span className="terminal-title">togisumashi-vim — hone</span>
          </div>
          <div className="terminal-body">
            {allHoned && (
              <div className="hone-mastery-banner">
                ⚡ {lang === "ja" ? "あなたは Vim を研ぎ澄ました。" : "You have honed your Vim."}
              </div>
            )}

            {!selected && (
              <div className="hone-empty">
                <p>
                  {lang === "ja"
                    ? "チャレンジを選択してください。"
                    : "Select a challenge to begin."}
                </p>
              </div>
            )}

            {selected &&
              phase === "info" &&
              (() => {
                const previewInstance = instantiateDrill(selected);
                return (
                  <div className="hone-info">
                    <div className="hone-info-header">
                      <span className="hone-info-num">
                        #{String(challenges.indexOf(selected) + 1).padStart(2, "0")}
                      </span>
                      <h2 className="hone-info-title">{drillI18n?.title}</h2>
                      <span className="hone-info-target">
                        <Trans>Target:</Trans> {formatTime(selected.target_time_ms)}
                      </span>
                    </div>
                    <p className="hone-info-desc">{drillI18n?.description}</p>
                    {drillI18n?.steps && (
                      <ol className="hone-steps">
                        {drillI18n.steps.map((step, i) => (
                          // biome-ignore lint/suspicious/noArrayIndexKey: stable ordered list
                          <li key={i} className="hone-step">
                            {step}
                          </li>
                        ))}
                      </ol>
                    )}
                    {selected.type === "edit" && previewInstance.goalText && (
                      <div className="hone-info-goal">
                        <span className="hone-info-goal-label">
                          <Trans>Goal:</Trans>
                        </span>
                        <code className="hone-info-goal-text">{previewInstance.goalText}</code>
                      </div>
                    )}
                    <div className="hone-info-actions">
                      <button type="button" className="btn-primary" onClick={handleStart}>
                        <Trans>Start Challenge</Trans>
                        <span className="btn-hint">Space</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

            {selected && phase === "running" && (
              <DrillRunner
                key={`${selected.id}-${attemptKey}`}
                drill={selected}
                autoStart={true}
                onComplete={handleComplete}
                onNext={handleNext}
                isLast={challenges.indexOf(selected) + 1 >= challenges.length}
                showTimer={true}
                hintsEnabled={false}
                showGoal={true}
              />
            )}

            {selected && phase === "done" && result && (
              <div className="hone-result">
                <div className={`hone-result-badge ${result.withinTarget ? "honed" : "cleared"}`}>
                  {result.withinTarget ? "⚡" : "✓"}
                </div>
                <div className="hone-result-time">
                  {formatTime(result.elapsedMs)}
                  <span className="hone-result-target">
                    {" "}
                    / {formatTime(result.targetMs)} <Trans>target</Trans>
                  </span>
                </div>
                <p className="hone-result-msg">
                  {result.withinTarget
                    ? lang === "ja"
                      ? "研ぎ澄まし達成！"
                      : "Within target — Honed!"
                    : lang === "ja"
                      ? "クリア！タイムを縮めよう。"
                      : "Cleared! Keep sharpening."}
                </p>
                <div className="hone-result-actions">
                  <button type="button" className="btn-secondary" onClick={handleRetry}>
                    <Trans>Retry</Trans>
                  </button>
                  {challenges.indexOf(selected) + 1 < challenges.length && (
                    <button type="button" className="btn-primary" onClick={handleNext}>
                      <Trans>Next Challenge</Trans>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
