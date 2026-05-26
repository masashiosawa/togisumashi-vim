import { Trans } from "@lingui/react/macro";
import { useMemo } from "react";
import { instantiateDrill } from "../lib/instantiateDrill";
import type { DrillDef } from "../types/drill";
import { CodeBlock } from "./CodeBlock";

interface Props {
  drill?: DrillDef;
  locale: "en" | "ja";
}

export function GoalPreview({ drill, locale }: Props) {
  const instance = useMemo(() => (drill ? instantiateDrill(drill) : null), [drill]);

  if (!drill || !instance) {
    return (
      <div className="goal-preview goal-preview--empty">
        <span className="goal-preview-placeholder">
          <Trans>Select a level to begin</Trans>
        </span>
      </div>
    );
  }

  const i18n = drill.i18n[locale];

  return (
    <div className="goal-preview">
      <span className="goal-preview-label">
        <Trans>Goal Preview</Trans>
      </span>
      <h4 className="goal-preview-title">{i18n.title}</h4>
      {drill.type === "edit" && instance.goalText ? (
        <CodeBlock
          code={instance.goalText}
          lang={drill.lang ?? "text"}
          className="goal-preview-code"
        />
      ) : (
        <div className="goal-preview-keys">
          {drill.solution_keys.map((key, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list from drill definition
            <kbd key={i} className="solution-key">
              {key}
            </kbd>
          ))}
        </div>
      )}
    </div>
  );
}
