import { EditorSelection, Prec, StateEffect } from "@codemirror/state";
import { type EditorView, keymap } from "@codemirror/view";
import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { vim } from "@replit/codemirror-vim";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { useCallback, useEffect, useRef, useState } from "react";
import { instantiateDrill } from "../lib/instantiateDrill";
import type { Attempt } from "../lib/storage";
import type { DrillDef, DrillInstance } from "../types/drill";
import { DrillResult } from "./DrillResult";
import { DrillTimer } from "./DrillTimer";
import { ShadowOverlay } from "./ShadowOverlay";

type Phase = "idle" | "running" | "success";

// Marks cursor-init dispatches so handleUpdate can ignore them and avoid
// false-positive goal detection when startOffset === goalOffset.
const cursorInitEffect = StateEffect.define<null>();

// Block arrow-key navigation so users practice hjkl movement.
const noArrowKeys = Prec.highest(
  keymap.of([
    { key: "ArrowLeft", run: () => true },
    { key: "ArrowRight", run: () => true },
    { key: "ArrowUp", run: () => true },
    { key: "ArrowDown", run: () => true },
  ]),
);

interface Props {
  drill: DrillDef;
  autoStart?: boolean;
  onComplete?: (a: Attempt) => void;
  onNext?: () => void;
  isLast?: boolean;
  showTimer?: boolean;
  hintsEnabled?: boolean;
  showGoal?: boolean;
}

export function DrillRunner({
  drill,
  autoStart,
  onComplete,
  onNext,
  isLast,
  showTimer = true,
  hintsEnabled = true,
  showGoal = true,
}: Props) {
  const { i18n } = useLingui();
  const locale = (i18n.locale ?? "en") as "en" | "ja";

  const [phase, setPhase] = useState<Phase>("idle");
  const [instance, setInstance] = useState<DrillInstance>(() => instantiateDrill(drill));
  const [startTime, setStartTime] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [showShadow, setShowShadow] = useState(false);

  const phaseRef = useRef<Phase>("idle");
  const successCalledRef = useRef(false);
  const cmRef = useRef<ReactCodeMirrorRef>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  phaseRef.current = phase;

  const applyStartState = useCallback(
    (view: EditorView) => {
      view.dispatch({
        selection: EditorSelection.cursor(instance.startOffset),
        effects: [cursorInitEffect.of(null)],
      });
    },
    [instance.startOffset],
  );

  const handleSuccess = useCallback(() => {
    if (successCalledRef.current) return;
    successCalledRef.current = true;
    const elapsed = Date.now() - startTime;
    setElapsedMs(elapsed);
    setPhase("success");
    if (timerRef.current) clearInterval(timerRef.current);
    onComplete?.({
      drillId: drill.id,
      success: true,
      elapsedMs: elapsed,
      targetMs: drill.target_time_ms,
      timestamp: Date.now(),
    });
  }, [startTime, drill.id, drill.target_time_ms, onComplete]);

  const startDrill = useCallback(() => {
    const next = instantiateDrill(drill);
    successCalledRef.current = false;
    setInstance(next);
    setPhase("running");
    setStartTime(Date.now());
    setElapsedMs(0);
    setShowShadow(false);
  }, [drill]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: mount only
  useEffect(() => {
    if (autoStart) startDrill();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tgt = e.target as HTMLElement | null;
      if (tgt?.closest(".cm-editor")) return;

      if (phase === "idle") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          startDrill();
        }
      } else if (phase === "success") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onNext?.();
        } else if (e.key === "r" || e.key === "R") {
          e.preventDefault();
          startDrill();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, startDrill, onNext]);

  useEffect(() => {
    if (phase === "running") {
      const raf = requestAnimationFrame(() => {
        const view = cmRef.current?.view;
        if (!view) return;
        view.dispatch({
          selection: EditorSelection.cursor(instance.startOffset),
          effects: [cursorInitEffect.of(null)],
        });
        view.focus();
      });
      return () => cancelAnimationFrame(raf);
    }
    requestAnimationFrame(() => cmRef.current?.view?.contentDOM.blur());
  }, [phase, instance]);

  useEffect(() => {
    if (phase !== "running") return;
    timerRef.current = setInterval(() => setElapsedMs(Date.now() - startTime), 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, startTime]);

  const handleUpdate = useCallback(
    (vu: Parameters<NonNullable<React.ComponentProps<typeof CodeMirror>["onUpdate"]>>[0]) => {
      if (phaseRef.current !== "running") return;
      if (!vu.selectionSet && !vu.docChanged) return;

      // Ignore our own cursor-init dispatches to prevent false-positive goal
      // detection when startOffset === goalOffset (e.g. marks drills).
      if (vu.transactions.some((tr) => tr.effects.some((e) => e.is(cursorInitEffect)))) return;

      if (instance.def.type === "motion") {
        const pos = vu.state.selection.main.head;
        if (pos === instance.goalOffset) handleSuccess();
      } else {
        if (!vu.docChanged) return;
        const text = vu.state.doc.toString().trimEnd();
        const goal = (instance.goalText ?? "").trimEnd();
        if (text === goal) handleSuccess();
      }
    },
    [instance, handleSuccess],
  );

  const handleEditorCreate = useCallback(
    (view: EditorView) => applyStartState(view),
    [applyStartState],
  );

  const drillI18n = instance.def.i18n[locale];
  const running = phase === "running";
  const done = phase === "success";

  return (
    <div className="drill-runner">
      <div className="drill-header">
        <h3 className="drill-title">{drillI18n.title}</h3>
        <span className="drill-tier">Tier {instance.def.tier}</span>
      </div>

      <p className="drill-description">{drillI18n.description}</p>

      {showGoal && instance.def.type === "edit" && instance.goalText && (
        <div className="drill-goal-text">
          <span className="drill-goal-label">
            <Trans>Goal:</Trans>
          </span>
          <code>{instance.goalText}</code>
        </div>
      )}

      {running && showTimer && (
        <DrillTimer elapsedMs={elapsedMs} targetMs={instance.def.target_time_ms} />
      )}

      {running && showShadow && hintsEnabled && <ShadowOverlay keys={instance.def.solution_keys} />}

      <div className={`editor-wrapper ${!running ? "inactive" : "running"}`}>
        <CodeMirror
          key={`${instance.def.id}-${instance.text}`}
          ref={cmRef}
          value={instance.text}
          extensions={[vim(), noArrowKeys]}
          onUpdate={handleUpdate}
          onCreateEditor={handleEditorCreate}
          theme="dark"
          height="200px"
        />
      </div>

      <div className="drill-actions">
        {phase === "idle" && (
          <button type="button" onClick={startDrill} className="btn-primary">
            <Trans>Start</Trans>
            <span className="btn-hint">Space</span>
          </button>
        )}
        {running && hintsEnabled && (
          <button type="button" onClick={() => setShowShadow((s) => !s)} className="btn-secondary">
            {showShadow ? <Trans>Hide hint</Trans> : <Trans>Show hint</Trans>}
          </button>
        )}
      </div>

      {done && (
        <DrillResult
          elapsedMs={elapsedMs}
          targetMs={instance.def.target_time_ms}
          onRetry={startDrill}
          onNext={() => onNext?.()}
          isLast={isLast ?? false}
        />
      )}
    </div>
  );
}
