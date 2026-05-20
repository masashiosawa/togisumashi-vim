import { Trans } from "@lingui/react/macro";
import { vim } from "@replit/codemirror-vim";
import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";

export function DrillPage() {
  const [value, setValue] = useState(
    "-- NORMAL --\n\nPress i to enter Insert mode.\nPress Esc to return to Normal mode.\n",
  );

  return (
    <div className="drill">
      <h2>
        <Trans>Tier 1 — Basic motion</Trans>
      </h2>
      <p className="hint">
        <Trans>Use hjkl to move. Press : to enter command mode.</Trans>
      </p>
      <div className="editor-wrapper">
        <CodeMirror
          value={value}
          extensions={[vim()]}
          onChange={setValue}
          theme="dark"
          height="300px"
        />
      </div>
    </div>
  );
}
