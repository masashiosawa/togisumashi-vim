import { useEffect, useState } from "react";
import type { DrillDef } from "../types/drill";

export function useDrills() {
  const [drills, setDrills] = useState<DrillDef[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/drills.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<DrillDef[]>;
      })
      .then((data) => {
        setDrills(data);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e : new Error(String(e)));
        setLoading(false);
      });
  }, []);

  return { drills, loading, error };
}
