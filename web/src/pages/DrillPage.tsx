import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import { useState } from "react";
import { DrillRunner } from "../components/DrillRunner";
import { useDrills } from "../hooks/useDrills";
import type { DrillDef, TierLevel } from "../types/drill";

const TIERS: TierLevel[] = [1, 2];

export function DrillPage() {
  const { i18n } = useLingui();
  const locale = (i18n.locale ?? "en") as "en" | "ja";
  const { drills, loading, error } = useDrills();
  const [tier, setTier] = useState<TierLevel>(1);
  const [selected, setSelected] = useState<DrillDef | null>(null);

  if (loading)
    return (
      <p className="drill-loading">
        <Trans>Loading drills…</Trans>
      </p>
    );
  if (error)
    return (
      <p className="drill-error">
        <Trans>Failed to load drills.</Trans>
      </p>
    );

  const filtered = drills.filter((d) => d.tier === tier);

  if (selected) {
    return (
      <div className="drill-page">
        <button type="button" className="btn-back" onClick={() => setSelected(null)}>
          ← <Trans>Back</Trans>
        </button>
        <DrillRunner key={selected.id} drill={selected} />
      </div>
    );
  }

  return (
    <div className="drill-page">
      <div className="tier-tabs">
        {TIERS.map((t) => (
          <button
            key={t}
            type="button"
            className={`tier-tab ${tier === t ? "active" : ""}`}
            onClick={() => setTier(t)}
          >
            Tier {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="drill-empty">
          <Trans>No drills for this tier yet.</Trans>
        </p>
      ) : (
        <ul className="drill-list">
          {filtered.map((d) => (
            <li key={d.id}>
              <button type="button" className="drill-list-item" onClick={() => setSelected(d)}>
                <span className="drill-list-title">{d.i18n[locale].title}</span>
                <span className="drill-list-time">{d.target_time_ms / 1000}s</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
