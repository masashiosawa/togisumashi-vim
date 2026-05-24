import { Trans } from "@lingui/react/macro";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import { useAtlas } from "../hooks/useAtlas";
import { useLessons } from "../hooks/useLessons";

export function AtlasArticlePage() {
  const { locale, id } = useParams<{ locale: string; id: string }>();
  const { articles, loading, error } = useAtlas();
  const { lessons } = useLessons();

  const article = useMemo(() => articles.find((a) => a.id === id), [articles, id]);
  const lang = locale === "ja" ? "ja" : "en";

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

  if (!article) {
    return (
      <article className="atlas-article">
        <p>
          <Trans>Article not found: {id}</Trans>
        </p>
        <p>
          <Link to={`/${locale}/atlas`}>
            <Trans>Back to atlas</Trans>
          </Link>
        </p>
      </article>
    );
  }

  const body = article.i18n[lang].body;
  const relatedArticles = article.related_articles
    .map((rid) => articles.find((a) => a.id === rid))
    .filter((a): a is NonNullable<typeof a> => a != null);
  const relatedDrills = article.related_drills
    .map((lid) => lessons.find((l) => l.id === lid))
    .filter((l): l is NonNullable<typeof l> => l != null);

  return (
    <article className="atlas-article">
      <nav className="atlas-breadcrumb">
        <Link to={`/${locale}/atlas`}>
          <Trans>← Atlas</Trans>
        </Link>
      </nav>
      <div className="atlas-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
      {relatedDrills.length > 0 && (
        <section className="atlas-related">
          <h3>
            <Trans>Practice with drills</Trans>
          </h3>
          <ul>
            {relatedDrills.map((l) => (
              <li key={l.id}>
                <Link to={`/${locale}?lesson=${l.id}`} className="atlas-card atlas-drill-card">
                  <span className="atlas-card-title">
                    {lang === "ja" ? l.title_ja : l.title_en}
                  </span>
                  <span className="atlas-card-summary">
                    <Trans>Launch this lesson as a focus session →</Trans>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {relatedArticles.length > 0 && (
        <section className="atlas-related">
          <h3>
            <Trans>Related articles</Trans>
          </h3>
          <ul>
            {relatedArticles.map((r) => (
              <li key={r.id}>
                <Link to={`/${locale}/atlas/${r.id}`} className="atlas-card">
                  <span className="atlas-card-title">{r.i18n[lang].title}</span>
                  {r.i18n[lang].summary && (
                    <span className="atlas-card-summary">{r.i18n[lang].summary}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {article.help_tags.length > 0 && (
        <footer>
          <p>
            <strong>
              <Trans>Help tags:</Trans>
            </strong>{" "}
            {article.help_tags.join(", ")}
          </p>
        </footer>
      )}
    </article>
  );
}
