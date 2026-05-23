import { Trans } from "@lingui/react/macro";
import { useEffect } from "react";
import type { Lesson } from "../types/drill";

interface Props {
  lesson: Lesson;
  locale: "en" | "ja";
  onDismiss: () => void;
}

export function ConceptGate({ lesson, locale, onDismiss }: Props) {
  const title = locale === "ja" ? lesson.title_ja : lesson.title_en;
  const concept = locale === "ja" ? lesson.concept_ja : lesson.concept_en;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onDismiss();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onDismiss]);

  return (
    <div className="concept-gate">
      <div className="concept-gate-header">
        <span className="concept-gate-eyebrow">
          <Trans>Lesson</Trans>
        </span>
        <h3 className="concept-gate-title">{title}</h3>
      </div>
      {concept && (
        <div className="concept-gate-body">
          <pre className="concept-gate-text">{concept}</pre>
        </div>
      )}
      <div className="concept-gate-actions">
        <button type="button" className="btn-primary" onClick={onDismiss}>
          <Trans>Start drills</Trans>
          <span className="btn-hint">Space</span>
        </button>
      </div>
    </div>
  );
}
