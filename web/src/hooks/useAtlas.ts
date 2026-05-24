import { useEffect, useState } from "react";
import type { AtlasArticle } from "../types/atlas";

export function useAtlas() {
  const [articles, setArticles] = useState<AtlasArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/atlas.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<AtlasArticle[]>;
      })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e : new Error(String(e)));
        setLoading(false);
      });
  }, []);

  return { articles, loading, error };
}
