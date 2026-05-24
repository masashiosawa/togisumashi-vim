import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ATLAS_DIR = resolve(__dirname, "../atlas");
const ATLAS_OUTPUT = resolve(__dirname, "../web/public/atlas.json");

interface ArticleI18n {
  title: string;
  summary: string;
  body: string;
}

interface ArticleEntry {
  id: string;
  order: number;
  category: string;
  status: string;
  related_drills: string[];
  related_articles: string[];
  help_tags: string[];
  i18n: {
    en: ArticleI18n;
    ja: ArticleI18n;
  };
}

interface ArticleFrontmatter {
  id?: string;
  category?: string;
  status?: string;
  related_drills?: string[];
  related_articles?: string[];
  help_tags?: string[];
}

const REQUIRED_FIELDS = ["id", "category", "status"] as const;

function fileStem(name: string): { stem: string; lang: "en" | "ja" } | null {
  const enMatch = name.match(/^(.+)\.en\.md$/);
  if (enMatch) return { stem: enMatch[1], lang: "en" };
  const jaMatch = name.match(/^(.+)\.ja\.md$/);
  if (jaMatch) return { stem: jaMatch[1], lang: "ja" };
  return null;
}

/**
 * Filenames are `NN-slug.{en,ja}.md`. The `NN-` prefix orders articles for
 * presentation; the article's `id` (semantic slug, e.g. `motion-basic`) comes
 * from the frontmatter and is what cross-references like `related_articles`
 * point to.
 */
function parseStem(stem: string): { order: number; slug: string } {
  const m = stem.match(/^(\d+)-(.+)$/);
  if (m) return { order: Number.parseInt(m[1], 10), slug: m[2] };
  return { order: 999, slug: stem };
}

/** Strip the common inline markdown syntax so summaries render as plain text. */
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/**
 * Drops the trailing `## See also` section. The frontmatter (related_drills,
 * related_articles, help_tags) is the source of truth, and the UI renders
 * those cross-references separately, so the in-body section would just
 * duplicate them.
 */
function stripSeeAlso(body: string): string {
  const idx = body.search(/(^|\n)## See also\b/);
  if (idx === -1) return body;
  return body.slice(0, idx).replace(/\s+$/, "") + "\n";
}

function extractTitleAndSummary(body: string): { title: string; summary: string; rest: string } {
  const stripped = stripSeeAlso(body);
  const lines = stripped.split("\n");
  let title = "";
  let summary = "";
  let i = 0;

  // Skip leading blank lines
  while (i < lines.length && lines[i].trim() === "") i++;

  // First H1 → title
  if (i < lines.length && lines[i].startsWith("# ")) {
    title = stripInlineMarkdown(lines[i].slice(2).trim());
    i++;
  }

  // Skip blank lines after title
  while (i < lines.length && lines[i].trim() === "") i++;

  // Lines up to next blank or heading → summary
  const summaryLines: string[] = [];
  while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("#")) {
    summaryLines.push(lines[i]);
    i++;
  }
  summary = stripInlineMarkdown(summaryLines.join(" ").trim());

  return { title, summary, rest: stripped };
}

function validateFrontmatter(
  data: Record<string, unknown>,
  filePath: string,
): data is Required<Pick<ArticleFrontmatter, "id" | "category" | "status">> &
  ArticleFrontmatter {
  for (const field of REQUIRED_FIELDS) {
    if (data[field] == null) {
      console.warn(`⚠ ${filePath}: missing required field "${field}", skipping article`);
      return false;
    }
  }
  return true;
}

function collect(): Map<string, ArticleEntry> {
  const articles = new Map<string, ArticleEntry>();

  for (const entry of readdirSync(ATLAS_DIR, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    if (entry.name === "README.md") continue;

    const parsed = fileStem(entry.name);
    if (!parsed) continue;
    const { stem, lang } = parsed;
    const { order, slug } = parseStem(stem);

    const fullPath = join(ATLAS_DIR, entry.name);
    const { data, content } = matter(readFileSync(fullPath, "utf8"));
    if (!validateFrontmatter(data as Record<string, unknown>, fullPath)) continue;

    const fm = data as ArticleFrontmatter & {
      id: string;
      category: string;
      status: string;
    };

    if (fm.id !== slug) {
      console.warn(
        `⚠ ${fullPath}: frontmatter id "${fm.id}" does not match filename slug "${slug}". Cross-reference links (related_articles, etc.) target the frontmatter id, so they must agree.`,
      );
    }

    const { title, summary, rest } = extractTitleAndSummary(content);

    let article = articles.get(fm.id);
    if (!article) {
      article = {
        id: fm.id,
        order,
        category: fm.category,
        status: fm.status,
        related_drills: fm.related_drills ?? [],
        related_articles: fm.related_articles ?? [],
        help_tags: fm.help_tags ?? [],
        i18n: {
          en: { title: "", summary: "", body: "" },
          ja: { title: "", summary: "", body: "" },
        },
      };
      articles.set(fm.id, article);
    }

    article.i18n[lang] = { title, summary, body: rest };
  }

  return articles;
}

const articleMap = collect();
const articles: ArticleEntry[] = [...articleMap.values()];

// Validate: every article should have both en and ja
let incomplete = 0;
for (const a of articles) {
  if (!a.i18n.en.title) {
    console.warn(`⚠ ${a.id}: missing English article`);
    incomplete++;
  }
  if (!a.i18n.ja.title) {
    console.warn(`⚠ ${a.id}: missing Japanese article`);
    incomplete++;
  }
}

articles.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));

writeFileSync(ATLAS_OUTPUT, JSON.stringify(articles, null, 2) + "\n");
console.log(`✓ ${articles.length} atlas articles → ${ATLAS_OUTPUT}`);
if (incomplete > 0) {
  console.warn(`⚠ ${incomplete} language gap(s) detected — see warnings above`);
}
