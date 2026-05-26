import { Trans } from "@lingui/react/macro";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ConceptGate } from "../components/ConceptGate";
import { DrillNavBar } from "../components/DrillNavBar";
import { DrillRunner } from "../components/DrillRunner";
import { LessonList } from "../components/LessonList";
import { SessionSummary } from "../components/SessionSummary";
import { useDrills } from "../hooks/useDrills";
import { useLessons } from "../hooks/useLessons";
import {
  COUNTS,
  LEVELS,
  buildLessonsPool,
  buildPoolFromIds,
  buildRandomPool,
} from "../lib/session";
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
  const [searchParams, setSearchParams] = useSearchParams();
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
  const [conceptGateVisible, setConceptGateVisible] = useState(false);
  const prevLessonIdRef = useRef<string | undefined>(undefined);

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
      if (lm === "lessons") return buildLessonsPool(drills, lvl);
      return buildRandomPool(drills, lvl, cnt);
    },
    [drills, level, lessonMode, count],
  );

  const resetDrill = useCallback((newPool: DrillDef[]) => {
    prevLessonIdRef.current = undefined;
    setConceptGateVisible(false);
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

  const handleSelectIndex = useCallback((i: number) => {
    setIndex(i);
  }, []);

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

  const currentDrill = pool[index];
  const currentLesson = lessons.find((l) => l.id === currentDrill?.lesson);

  // Show concept gate when entering a new lesson in lessons mode
  useEffect(() => {
    if (lessonMode !== "lessons" || !currentDrill?.lesson) {
      prevLessonIdRef.current = currentDrill?.lesson;
      return;
    }
    if (currentDrill.lesson !== prevLessonIdRef.current) {
      setConceptGateVisible(true);
    }
    prevLessonIdRef.current = currentDrill.lesson;
  }, [currentDrill, lessonMode]);

  const handleDismissConceptGate = useCallback(() => {
    setConceptGateVisible(false);
  }, []);

  const handleSelectLesson = useCallback(
    (lessonId: string) => {
      const ids = drills.filter((d) => d.lesson === lessonId).map((d) => d.id);
      setFocusIds(ids);
    },
    [drills],
  );

  // Deep-link from Atlas: ?lesson=<id> launches that lesson as a focus session.
  // Consume the param once drills are loaded, then clear it so reloads don't
  // keep re-applying the focus over user changes.
  useEffect(() => {
    if (drills.length === 0) return;
    const lessonId = searchParams.get("lesson");
    if (!lessonId) return;
    const ids = drills.filter((d) => d.lesson === lessonId).map((d) => d.id);
    if (ids.length > 0) setFocusIds(ids);
    searchParams.delete("lesson");
    setSearchParams(searchParams, { replace: true });
  }, [drills, searchParams, setSearchParams]);

  return (
    <div className="home">
      <div className="home-left">
        <section className="hero">
          <div className="hero-kanji">{locale === "ja" ? "研ぎ澄まし" : "Togisumashi"}</div>
        </section>

        <section className="settings-panel">
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
                  {lvl === "master" && <Trans>Master</Trans>}
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
              <Trans>Order</Trans>
            </span>
            <div className="settings-btns">
              <button
                type="button"
                className={`settings-btn ${lessonMode === "lessons" ? "active" : ""}`}
                onClick={() => handleLessonModeChange("lessons")}
              >
                <Trans>Lessons</Trans>
              </button>
              <button
                type="button"
                className={`settings-btn ${lessonMode === "random" ? "active" : ""}`}
                onClick={() => handleLessonModeChange("random")}
              >
                <Trans>Random</Trans>
              </button>
            </div>
          </div>

          <div
            className={`settings-group ${lessonMode === "lessons" ? "settings-group--disabled" : ""}`}
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
                  disabled={lessonMode === "lessons"}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </section>

        {lessonMode === "lessons" && (
          <LessonList
            lessons={lessons}
            drills={drills}
            level={level}
            currentLessonId={currentLesson?.id}
            onSelectLesson={handleSelectLesson}
          />
        )}
      </div>

      <div className="home-right">
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
              ) : conceptGateVisible && currentLesson ? (
                <ConceptGate
                  lesson={currentLesson}
                  locale={locale as "en" | "ja"}
                  onDismiss={handleDismissConceptGate}
                />
              ) : (
                <>
                  <DrillNavBar
                    pool={pool}
                    index={index}
                    onSelectIndex={handleSelectIndex}
                    locale={locale ?? "en"}
                    label={
                      focusIds.length > 0 ? (
                        <Trans>Focus</Trans>
                      ) : (
                        <>
                          {level === "beginner" && <Trans>Beginner</Trans>}
                          {level === "intermediate" && <Trans>Intermediate</Trans>}
                          {level === "advanced" && <Trans>Advanced</Trans>}
                          {level === "master" && <Trans>Master</Trans>}
                        </>
                      )
                    }
                  />
                  <DrillRunner
                    key={`${currentDrill.id}-${index}`}
                    drill={currentDrill}
                    autoStart={index > 0}
                    onComplete={handleComplete}
                    onNext={handleNext}
                    isLast={index + 1 >= pool.length}
                    showTimer={mode === "test"}
                    hintsEnabled={mode === "practice"}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
