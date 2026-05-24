import { Trans } from "@lingui/react/macro";
import { useMemo } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
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

type AtlasOutletContext = {
  articles: AtlasArticle[];
  loading: boolean;
  error: Error | null;
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

export function AtlasIndexPage() {
  const { locale } = useParams<{ locale: string }>();
  const { articles, loading, error } = useOutletContext<AtlasOutletContext>();

  const lang = locale === "ja" ? "ja" : "en";
  const grouped = useMemo(() => groupByCategory(articles), [articles]);

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

      {CATEGORY_ORDER.map((category) => {
        const list = grouped.get(category) ?? [];
        if (list.length === 0) return null;
        return (
          <section key={category} className="atlas-category">
            <h2>{CATEGORY_LABEL[category][lang]}</h2>
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
