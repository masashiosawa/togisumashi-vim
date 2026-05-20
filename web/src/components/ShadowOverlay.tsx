import { Trans } from "@lingui/react/macro";

interface Props {
  keys: string[];
}

export function ShadowOverlay({ keys }: Props) {
  return (
    <div className="shadow-overlay">
      <span className="shadow-label">
        <Trans>Hint:</Trans>
      </span>
      {keys.map((k, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static hint keys with no reordering
        <kbd key={i} className="shadow-key">
          {k}
        </kbd>
      ))}
    </div>
  );
}
