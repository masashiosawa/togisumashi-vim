import { useEffect, useRef, useState } from "react";
import { getHighlighter } from "../lib/shiki";

interface Props {
  code: string;
  lang: string;
  className?: string;
}

export function CodeBlock({ code, lang, className }: Props) {
  const [html, setHtml] = useState<string | null>(null);
  const abortRef = useRef(false);

  useEffect(() => {
    abortRef.current = false;
    getHighlighter()
      .then((hl) => {
        if (abortRef.current) return;
        let highlighted: string;
        try {
          highlighted = hl.codeToHtml(code, {
            lang,
            theme: "github-dark-dimmed",
          });
        } catch {
          highlighted = hl.codeToHtml(code, {
            lang: "text",
            theme: "github-dark-dimmed",
          });
        }
        setHtml(highlighted);
      })
      .catch(() => {
        // highlighter failed, keep fallback
      });
    return () => {
      abortRef.current = true;
    };
  }, [code, lang]);

  if (!html) {
    return (
      <pre className={`code-block-fallback ${className ?? ""}`}>
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div
      className={`code-block ${className ?? ""}`}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki-generated HTML is safe
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
