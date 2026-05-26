import { useEffect, useRef, useState } from "react";
import type { DrillDef } from "../types/drill";

interface DrillNavBarProps {
  pool: DrillDef[];
  index: number;
  onSelectIndex: (i: number) => void;
  label: React.ReactNode;
  locale: string;
}

export function DrillNavBar({ pool, index, onSelectIndex, label, locale }: DrillNavBarProps) {
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const title = pool[index]?.i18n[locale as "en" | "ja"]?.title ?? pool[index]?.i18n.en.title ?? "";

  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".drill-nav-bar")) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "h") {
      if (index > 0) onSelectIndex(index - 1);
    } else if (e.key === "ArrowRight" || e.key === "l") {
      if (index < pool.length - 1) onSelectIndex(index + 1);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="drill-nav-bar" ref={barRef} onKeyDown={handleKeyDown}>
      <span className="drill-nav-label">{label}</span>
      <div className="drill-nav-controls">
        <button
          type="button"
          className="drill-nav-btn"
          aria-label="Previous drill"
          disabled={index === 0}
          onClick={() => onSelectIndex(index - 1)}
        >
          ◀
        </button>
        <button
          type="button"
          className="drill-nav-current"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="drill-nav-position">
            {index + 1} / {pool.length}
          </span>
          <span className="drill-nav-title">{title}</span>
          <span className="drill-nav-caret">▾</span>
        </button>
        <button
          type="button"
          className="drill-nav-btn"
          aria-label="Next drill"
          disabled={index >= pool.length - 1}
          onClick={() => onSelectIndex(index + 1)}
        >
          ▶
        </button>
      </div>
      {open && (
        // biome-ignore lint/a11y/useSemanticElements: custom styled listbox; <select> cannot match terminal UI
        <div role="listbox" aria-label="Select drill" className="drill-nav-dropdown" tabIndex={-1}>
          {pool.map((drill, i) => {
            const t = drill.i18n[locale as "en" | "ja"]?.title ?? drill.i18n.en.title ?? "";
            return (
              <div
                // biome-ignore lint/a11y/useSemanticElements: role="option" in custom listbox
                role="option"
                key={drill.id}
                aria-selected={i === index}
                tabIndex={0}
                className={`drill-nav-option${i === index ? " active" : ""}`}
                onClick={() => {
                  onSelectIndex(i);
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectIndex(i);
                    setOpen(false);
                  }
                }}
              >
                <span className="drill-nav-option-num">{i + 1}</span>
                <span>{t}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
