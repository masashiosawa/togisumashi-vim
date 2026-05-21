import { Trans } from "@lingui/react/macro";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DrillRunner } from "../components/DrillRunner";
import { SessionSummary } from "../components/SessionSummary";
import { useDrills } from "../hooks/useDrills";
import { useLessons } from "../hooks/useLessons";
import { COUNTS, LEVELS, buildGuidedPool, buildPoolFromIds, buildSkipPool } from "../lib/session";
import {
  type Attempt,
  type Count,
  type LessonMode,
  type Level,
  type Mode,
  loadLastCount,
  loadLastLessonMode,
  loadLastLevel,
  loadLastMode,
  recordAttempt,
  saveLastCount,
  saveLastLessonMode,
  saveLastLevel,
  saveLastMode,
} from "../lib/storage";
import type { DrillDef } from "../types/drill";

export function HomePage() {
  const { locale } = useParams<{ locale: string }>();
  const { drills, loading } = useDrills();
  const { lessons } = useLessons();

  const [level, setLevel] = useState<Level>(() => loadLastLevel() ?? "beginner");
  const [mode, setMode] = useState<Mode>(loadLastMode);
  const [lessonMode, setLessonMode] = useState<LessonMode>(loadLastLessonMode);
  const [count, setCount] = useState<Count>(loadLastCount);

  const [pool, setPool] = useState<DrillDef[]>([]);
  const [index, setIndex] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [finished, setFinished] = useState(false);
  const [focusIds, setFocusIds] = useState<string[]>([]);

  const settingsSectionRef = useRef<HTMLDivElement>(null);

  // focusIds is always passed explicitly — never read from state implicitly
  const makePool = useCallback(
    (opts: {
      level?: Level;
      lessonMode?: LessonMode;
      count?: Count;
      focusIds?: string[];
    }) => {
      const lvl = opts.level ?? level;
      const lm = opts.lessonMode ?? lessonMode;
      const cnt = opts.count ?? count;
      const fids = opts.focusIds ?? [];
      if (fids.length > 0) return buildPoolFromIds(drills, fids);
      if (lm === "guided") return buildGuidedPool(drills, lvl);
      return buildSkipPool(drills, lvl, cnt);
    },
    [drills, level, lessonMode, count],
  );

  const resetDrill = useCallback((newPool: DrillDef[]) => {
    setPool(newPool);
    setIndex(0);
    setAttempts([]);
    setFinished(false);
  }, []);

  // Rebuild pool when settings, drills, or focusIds change
  useEffect(() => {
    resetDrill(makePool({ focusIds }));
  }, [makePool, resetDrill, focusIds]);

  const handleLevelChange = useCallback((lvl: Level) => {
    saveLastLevel(lvl);
    setLevel(lvl);
  }, []);

  const handleModeChange = useCallback((m: Mode) => {
    saveLastMode(m);
    setMode(m);
  }, []);

  const handleLessonModeChange = useCallback((lm: LessonMode) => {
    saveLastLessonMode(lm);
    setLessonMode(lm);
  }, []);

  const handleCountChange = useCallback((c: Count) => {
    saveLastCount(c);
    setCount(c);
  }, []);

  const handleComplete = useCallback((a: Attempt) => {
    recordAttempt(a);
    setAttempts((arr) => [...arr, a]);
  }, []);

  const handleNext = useCallback(() => {
    if (index + 1 >= pool.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
  }, [index, pool.length]);

  const handleReplay = useCallback(() => {
    resetDrill(makePool({ focusIds }));
  }, [makePool, resetDrill, focusIds]);

  const handleFocus = useCallback((ids: string[]) => {
    if (ids.length === 0) return;
    setFocusIds(ids); // triggers useEffect to rebuild pool
  }, []);

  const handleBackToSettings = useCallback(() => {
    setFocusIds([]);
    resetDrill(makePool({ focusIds: [] }));
  }, [makePool, resetDrill]);

  const handleDrillStart = useCallback(() => {
    requestAnimationFrame(() => {
      settingsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const currentDrill = pool[index];
  const currentLesson = lessons.find((l) => l.id === currentDrill?.lesson);
  const concept =
    lessonMode === "guided" && currentLesson
      ? locale === "ja"
        ? currentLesson.concept_ja
        : currentLesson.concept_en
      : undefined;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-kanji">{locale === "ja" ? "研ぎ澄ます" : "Sharpen."}</div>
        <p className="hero-sub">
          <Trans>Sharpen your Vim. One drill at a time.</Trans>
        </p>
      </section>

      <section ref={settingsSectionRef} className="settings-panel">
        <div className="settings-group">
          <span className="settings-label">
            <Trans>Level</Trans>
          </span>
          <div className="settings-btns">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`settings-btn ${level === lvl ? "active" : ""}`}
                onClick={() => handleLevelChange(lvl)}
              >
                {lvl === "beginner" && <Trans>Beginner</Trans>}
                {lvl === "intermediate" && <Trans>Intermediate</Trans>}
                {lvl === "advanced" && <Trans>Advanced</Trans>}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-group">
          <span className="settings-label">
            <Trans>Mode</Trans>
          </span>
          <div className="settings-btns">
            <button
              type="button"
              className={`settings-btn ${mode === "practice" ? "active" : ""}`}
              onClick={() => handleModeChange("practice")}
            >
              <Trans>Practice</Trans>
            </button>
            <button
              type="button"
              className={`settings-btn ${mode === "test" ? "active" : ""}`}
              onClick={() => handleModeChange("test")}
            >
              <Trans>Test</Trans>
            </button>
          </div>
        </div>

        <div className="settings-group">
          <span className="settings-label">
            <Trans>Lesson</Trans>
          </span>
          <div className="settings-btns">
            <button
              type="button"
              className={`settings-btn ${lessonMode === "guided" ? "active" : ""}`}
              onClick={() => handleLessonModeChange("guided")}
            >
              <Trans>Guided</Trans>
            </button>
            <button
              type="button"
              className={`settings-btn ${lessonMode === "skip" ? "active" : ""}`}
              onClick={() => handleLessonModeChange("skip")}
            >
              <Trans>Skip</Trans>
            </button>
          </div>
        </div>

        <div
          className={`settings-group ${lessonMode === "guided" ? "settings-group--disabled" : ""}`}
        >
          <span className="settings-label">
            <Trans>Count</Trans>
          </span>
          <div className="settings-btns">
            {COUNTS.map((n) => (
              <button
                key={n}
                type="button"
                className={`settings-btn ${count === n ? "active" : ""}`}
                onClick={() => handleCountChange(n)}
                disabled={lessonMode === "guided"}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="drill-section">
        <div className="terminal-window terminal-dark">
          <div className="terminal-titlebar">
            <span className="terminal-dot terminal-dot--red" />
            <span className="terminal-dot terminal-dot--yellow" />
            <span className="terminal-dot terminal-dot--green" />
            <span className="terminal-title">togisumashi-vim</span>
          </div>
          <div className="terminal-body">
            {loading ? (
              <p className="drill-loading">
                <Trans>Loading drills…</Trans>
              </p>
            ) : finished ? (
              <SessionSummary
                level={level}
                attempts={attempts}
                pool={pool}
                onReplay={handleReplay}
                onHome={handleBackToSettings}
                onFocus={handleFocus}
              />
            ) : pool.length === 0 ? (
              <p className="drill-empty">
                <Trans>No drills available for this selection.</Trans>
              </p>
            ) : (
              <>
                <div className="terminal-session-bar">
                  <span className="session-progress-label">
                    {focusIds.length > 0 ? (
                      <Trans>Focus</Trans>
                    ) : (
                      <>
                        {level === "beginner" && <Trans>Beginner</Trans>}
                        {level === "intermediate" && <Trans>Intermediate</Trans>}
                        {level === "advanced" && <Trans>Advanced</Trans>}
                      </>
                    )}
                  </span>
                  <span className="session-progress-count" aria-live="polite">
                    {index + 1} / {pool.length}
                  </span>
                </div>
                <DrillRunner
                  key={`${currentDrill.id}-${index}`}
                  drill={currentDrill}
                  autoStart={index > 0}
                  onComplete={handleComplete}
                  onNext={handleNext}
                  onStart={handleDrillStart}
                  isLast={index + 1 >= pool.length}
                  showTimer={mode === "test"}
                  hintsEnabled={mode === "practice"}
                  concept={concept}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
