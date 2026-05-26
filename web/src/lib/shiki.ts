import { type Highlighter, createHighlighter } from "shiki";

let _highlighter: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!_highlighter) {
    _highlighter = createHighlighter({
      themes: ["github-dark-dimmed"],
      langs: ["vim", "css", "html", "javascript", "typescript", "markdown"],
    });
  }
  return _highlighter;
}
