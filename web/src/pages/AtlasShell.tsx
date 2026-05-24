import { Trans, useLingui } from "@lingui/react/macro";
import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
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

const CATEGORY_LABEL: Record<AtlasCategory, { en: string; ja: string }> = {
  motion: { en: "Motion", ja: "モーション" },
  search: { en: "Search", ja: "検索" },
  insert: { en: "Insert", ja: "挿入" },
  edit: { en: "Edit", ja: "編集" },
  composition: { en: "Composition", ja: "コンポジション" },
  repeat: { en: "Repeat", ja: "繰り返し" },
  meta: { en: "Meta", ja: "メタ" },
  environment: { en: "Environment", ja: "環境" },
  config: { en: "Config", ja: "設定" },
  power: { en: "Power", ja: "応用" },
  display: { en: "Display", ja: "表示" },
};

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

export function AtlasShell() {
  const { locale } = useParams<{ locale: string }>();
  const { t } = useLingui();
  const location = useLocation();
  const { articles, loading, error } = useAtlas();
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const lang = locale === "ja" ? "ja" : "en";

  // Close the mobile drawer whenever the route changes (e.g. user picks an article).
  // biome-ignore lint/correctness/useExhaustiveDependencies: the effect intentionally re-fires on pathname change to dismiss the drawer.
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // ESC closes the drawer.
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [drawerOpen]);

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

  // Active article id is the last URL segment for `/:locale/atlas/:id`
  const activeId = location.pathname.match(/\/atlas\/([^/]+)$/)?.[1];

  return (
    <div className={`atlas-shell ${drawerOpen ? "atlas-shell--drawer-open" : ""}`}>
      <button
        type="button"
        className="atlas-drawer-toggle"
        aria-expanded={drawerOpen}
        aria-controls="atlas-sidebar"
        onClick={() => setDrawerOpen((v) => !v)}
      >
        <span aria-hidden="true">
          {drawerOpen ? (
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L12 12M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 3.5h10M2 7h10M2 10.5h10"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </span>
        <span className="atlas-drawer-toggle-label">
          {drawerOpen ? <Trans>Close</Trans> : <Trans>Contents</Trans>}
        </span>
      </button>
      {drawerOpen && (
        <button
          type="button"
          className="atlas-drawer-backdrop"
          aria-label={t`Close navigation`}
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <aside id="atlas-sidebar" className="atlas-sidebar" aria-label="Atlas navigation">
        <div className="atlas-sidebar-head">
          <Link to={`/${locale}/atlas`} className="atlas-sidebar-title">
            <Trans>Atlas</Trans>
          </Link>
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
        <nav className="atlas-sidebar-nav">
          {loading && (
            <p className="atlas-sidebar-status">
              <Trans>Loading…</Trans>
            </p>
          )}
          {error && (
            <p className="atlas-sidebar-status" role="alert">
              <Trans>Failed to load atlas: {error.message}</Trans>
            </p>
          )}
          {!loading && !error && filtered.length === 0 && query && (
            <p className="atlas-sidebar-status">
              <Trans>No articles match "{query}".</Trans>
            </p>
          )}
          {CATEGORY_ORDER.map((category) => {
            const list = grouped.get(category) ?? [];
            if (list.length === 0) return null;
            return (
              <section key={category} className="atlas-sidebar-group">
                <h3>{CATEGORY_LABEL[category][lang]}</h3>
                <ul>
                  {list.map((article) => (
                    <li key={article.id}>
                      <Link
                        to={`/${locale}/atlas/${article.id}`}
                        className={`atlas-sidebar-link ${activeId === article.id ? "active" : ""}`}
                      >
                        {article.i18n[lang].title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </nav>
      </aside>
      <div className="atlas-pane">
        <Outlet context={{ articles, loading, error }} />
      </div>
    </div>
  );
}
