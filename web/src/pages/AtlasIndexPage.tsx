import { Trans, useLingui } from "@lingui/react/macro";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAtlas } from "../hooks/useAtlas";
import type { AtlasArticle, AtlasCategory } from "../types/atlas";

const CATEGORY_ORDER: AtlasCategory[] = [
  "motion",
  "search",
  "insert",
  "edit",
  "composition",
  "repeat",
  "meta",
  "environment",
  "config",
  "power",
  "display",
];

function groupByCategory(articles: AtlasArticle[]): Map<AtlasCategory, AtlasArticle[]> {
  const map = new Map<AtlasCategory, AtlasArticle[]>();
  for (const cat of CATEGORY_ORDER) map.set(cat, []);
  for (const a of articles) {
    const list = map.get(a.category) ?? [];
    list.push(a);
    map.set(a.category, list);
  }
  return map;
}

export function AtlasIndexPage() {
  const { locale } = useParams<{ locale: string }>();
  const { t } = useLingui();
  const { articles, loading, error } = useAtlas();
  const [query, setQuery] = useState("");

  const lang = locale === "ja" ? "ja" : "en";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) => {
      const i18n = a.i18n[lang];
      return (
        a.id.toLowerCase().includes(q) ||
        i18n.title.toLowerCase().includes(q) ||
        i18n.summary.toLowerCase().includes(q) ||
        a.help_tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [articles, lang, query]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  if (loading) {
    return (
      <p>
        <Trans>Loading…</Trans>
      </p>
    );
  }

  if (error) {
    return (
      <p role="alert">
        <Trans>Failed to load atlas: {error.message}</Trans>
      </p>
    );
  }

  return (
    <article className="atlas-index">
      <h1>
        <Trans>Atlas — Reading reference</Trans>
      </h1>
      <p className="atlas-summary">
        <Trans>
          51 articles covering the Vim/Neovim surface: motions, edits, registers, sessions, plugins.
          Each article includes a "Choosing between" section comparing similar commands.
        </Trans>
      </p>

      <div className="atlas-search">
        <input
          type="search"
          className="atlas-search-input"
          placeholder={t`Search by title, summary, or :h tag…`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <span className="atlas-search-count">
            <Trans>{filtered.length} match(es)</Trans>
          </span>
        )}
      </div>

      {filtered.length === 0 && query && (
        <p className="atlas-summary">
          <Trans>No articles match "{query}".</Trans>
        </p>
      )}

      {CATEGORY_ORDER.map((category) => {
        const list = grouped.get(category) ?? [];
        if (list.length === 0) return null;
        return (
          <section key={category} className="atlas-category">
            <h2>{category}</h2>
            <ul>
              {list.map((article) => (
                <li key={article.id}>
                  <Link to={`/${locale}/atlas/${article.id}`} className="atlas-card">
                    <span className="atlas-card-title">{article.i18n[lang].title}</span>
                    {article.i18n[lang].summary && (
                      <span className="atlas-card-summary">{article.i18n[lang].summary}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </article>
  );
}
