import { Trans } from "@lingui/react/macro";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DrillRunner } from "../components/DrillRunner";
import { SessionSummary } from "../components/SessionSummary";
import { useDrills } from "../hooks/useDrills";
import { LEVELS, buildPool, buildPoolFromIds } from "../lib/session";
import { type Attempt, type Level, recordAttempt } from "../lib/storage";

const LEVEL_LABEL: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function DrillPage() {
  const { locale } = useParams<{ locale: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { drills, loading, error } = useDrills();

  const rawLevel = searchParams.get("level") as Level | null;
  const level: Level = LEVELS.includes(rawLevel as Level) ? (rawLevel as Level) : "beginner";
  const focusIds = useMemo(() => {
    const raw = searchParams.get("focus");
    return raw ? raw.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const initialPool = useMemo(() => {
    if (focusIds.length > 0) return buildPoolFromIds(drills, focusIds);
    return buildPool(drills, level);
  }, [drills, level, focusIds]);

  const [pool, setPool] = useState<typeof initialPool>(initialPool);
  const [index, setIndex] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [finished, setFinished] = useState(false);

  // drills / level / focus が変わったらリセット
  useEffect(() => {
    setPool(initialPool);
    setIndex(0);
    setAttempts([]);
    setFinished(false);
  }, [initialPool]);

  const goHome = useCallback(() => navigate(`/${locale}`), [locale, navigate]);

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
    if (focusIds.length > 0) {
      setPool(buildPoolFromIds(drills, focusIds));
    } else {
      setPool(buildPool(drills, level));
    }
    setIndex(0);
    setAttempts([]);
    setFinished(false);
  }, [drills, level, focusIds]);

  const handleFocus = useCallback(
    (ids: string[]) => {
      if (ids.length === 0) return;
      navigate(`/${locale}/drills?focus=${ids.join(",")}`);
    },
    [locale, navigate],
  );

  // Esc でホームへ (走行中以外)
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tgt = e.target as HTMLElement | null;
      if (tgt?.closest(".cm-editor")) return;
      if (e.key === "Escape") {
        e.preventDefault();
        goHome();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [goHome]);

  if (loading) {
    return (
      <p className="drill-loading">
        <Trans>Loading drills…</Trans>
      </p>
    );
  }
  if (error) {
    return (
      <p className="drill-error">
        <Trans>Failed to load drills.</Trans>
      </p>
    );
  }
  if (pool.length === 0) {
    return (
      <div className="drill-page">
        <button type="button" className="btn-back" onClick={goHome}>
          ← <Trans>Menu</Trans>
        </button>
        <p className="drill-empty">
          <Trans>No drills available for this selection.</Trans>
        </p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="drill-page">
        <SessionSummary
          level={level}
          attempts={attempts}
          pool={pool}
          onReplay={handleReplay}
          onHome={goHome}
          onFocus={handleFocus}
        />
      </div>
    );
  }

  const current = pool[index];
  const isFocusMode = focusIds.length > 0;

  return (
    <div className="drill-page">
      <div className="session-bar">
        <button type="button" className="btn-back" onClick={goHome}>
          ← <Trans>Menu</Trans>
          <span className="btn-hint">Esc</span>
        </button>
        <div className="session-progress" aria-live="polite">
          <span className="session-progress-label">
            {isFocusMode ? <Trans>Focus</Trans> : LEVEL_LABEL[level]}
          </span>
          <span className="session-progress-count">
            {index + 1} / {pool.length}
          </span>
        </div>
      </div>
      <DrillRunner
        key={`${current.id}-${index}`}
        drill={current}
        autoStart={index > 0}
        onComplete={handleComplete}
        onNext={handleNext}
        isLast={index + 1 >= pool.length}
      />
    </div>
  );
}
