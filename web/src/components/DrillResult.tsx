import { Trans } from "@lingui/react/macro";

interface Props {
  elapsedMs: number;
  targetMs: number;
  onRetry: () => void;
  onNext: () => void;
  isLast: boolean;
}

export function DrillResult({ elapsedMs, targetMs, onRetry, onNext, isLast }: Props) {
  const elapsed = (elapsedMs / 1000).toFixed(2);
  const target = (targetMs / 1000).toFixed(1);
  const faster = elapsedMs < targetMs;

  return (
    <div className="drill-result success">
      <div className="result-head">
        <p className="result-icon">✓</p>
        <p className="result-time">
          {elapsed}s
          <span className="result-badge">
            {faster ? <Trans>under {target}s ✦</Trans> : <Trans>target {target}s</Trans>}
          </span>
        </p>
      </div>
      <div className="result-actions">
        <button type="button" onClick={onNext} className="btn-primary">
          {isLast ? <Trans>See results</Trans> : <Trans>Next drill</Trans>}
          <span className="btn-hint">Space</span>
        </button>
        <button type="button" onClick={onRetry} className="btn-secondary">
          <Trans>Retry</Trans>
          <span className="btn-hint">R</span>
        </button>
      </div>
    </div>
  );
}
