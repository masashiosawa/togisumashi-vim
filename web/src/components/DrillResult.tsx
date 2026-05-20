import { Trans } from "@lingui/react/macro";

interface Props {
  elapsedMs: number;
  targetMs: number;
  onRetry: () => void;
}

const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
const retryHint = isMac ? "⌘↵" : "Ctrl+↵";

export function DrillResult({ elapsedMs, targetMs, onRetry }: Props) {
  const elapsed = (elapsedMs / 1000).toFixed(2);
  const target = (targetMs / 1000).toFixed(1);
  const faster = elapsedMs < targetMs;

  return (
    <div className="drill-result success">
      <p className="result-icon">✓</p>
      <p className="result-time">
        {elapsed}s{" "}
        {faster && (
          <span className="result-badge">
            <Trans>Goal: {target}s</Trans>
          </span>
        )}
      </p>
      <button type="button" onClick={onRetry} className="btn-primary">
        <Trans>Try again</Trans>
        <span className="btn-hint">{retryHint}</span>
      </button>
    </div>
  );
}
