interface Props {
  elapsedMs: number;
  targetMs: number;
}

export function DrillTimer({ elapsedMs, targetMs }: Props) {
  const pct = Math.min(100, (elapsedMs / targetMs) * 100);

  return (
    <div className="drill-timer">
      <div className="drill-timer-bar" style={{ width: `${pct}%` }} />
      <span className="drill-timer-label">{(elapsedMs / 1000).toFixed(1)}s</span>
    </div>
  );
}
