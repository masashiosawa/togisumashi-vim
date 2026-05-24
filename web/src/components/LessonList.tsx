import { useLingui } from "@lingui/react";
import { Trans } from "@lingui/react/macro";
import type { Level } from "../lib/storage";
import type { DrillDef, Lesson } from "../types/drill";

interface Props {
  lessons: Lesson[];
  drills: DrillDef[];
  level: Level;
  currentLessonId?: string;
  onSelectLesson: (lessonId: string) => void;
}

function tierForLevel(level: Level): number {
  if (level === "beginner") return 1;
  if (level === "intermediate") return 2;
  if (level === "advanced") return 3;
  return 4;
}

export function LessonList({ lessons, drills, level, currentLessonId, onSelectLesson }: Props) {
  const { i18n } = useLingui();
  const locale = (i18n.locale ?? "en") as "en" | "ja";

  const tier = tierForLevel(level);
  const visible = lessons
    .filter((l) => l.tier === tier)
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));

  if (visible.length === 0) return null;

  return (
    <div className="lesson-list-panel">
      <span className="lesson-list-label">
        <Trans>Lessons</Trans>
      </span>
      <ul className="lesson-list">
        {visible.map((lesson) => {
          const drillCount = drills.filter((d) => d.lesson === lesson.id).length;
          const isActive = lesson.id === currentLessonId;
          const title = locale === "ja" ? lesson.title_ja : lesson.title_en;
          return (
            <li key={lesson.id}>
              <button
                type="button"
                className={`lesson-item ${isActive ? "active" : ""}`}
                onClick={() => onSelectLesson(lesson.id)}
              >
                <span className="lesson-item-num">{lesson.order}</span>
                <span className="lesson-item-title">{title}</span>
                <span className="lesson-item-count">{drillCount}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
