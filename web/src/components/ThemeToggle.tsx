import { useState } from "react";

type Theme = "dark" | "light";

function getTheme(): Theme {
  return (document.documentElement.dataset.theme as Theme) ?? "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getTheme);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn-icon theme-toggle"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? "☀" : "🌙"}
    </button>
  );
}
