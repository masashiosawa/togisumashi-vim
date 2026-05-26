import { type Highlighter, createHighlighter } from "shiki";

let _highlighter: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!_highlighter) {
    _highlighter = createHighlighter({
      themes: ["github-dark-dimmed"],
      langs: ["vim", "css", "html", "javascript", "typescript", "markdown"],
    });
  }
  // biome-ignore lint/style/noNonNullAssertion: assigned in the branch above
  return _highlighter!;
}
