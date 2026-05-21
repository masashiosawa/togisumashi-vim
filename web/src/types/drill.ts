export type TierLevel = 1 | 2 | 3 | 4;
export type DrillType = "motion" | "edit";

export type TemplateKind =
  | { kind: "random_text_line"; chars: number }
  | { kind: "fixed"; lines: string[] };

export type DrillGoal =
  | { type: "col_end" }
  | { type: "col_start" }
  | { type: "first_nonblank" }
  | { type: "col_N"; n: number }
  | { type: "last_line_start" }
  | { type: "text_equals"; content: string }
  | { type: "offset"; offset: number };

export interface DrillI18n {
  title: string;
  description: string;
  concept?: string;
}

export interface DrillDef {
  id: string;
  tier: TierLevel;
  type: DrillType;
  lesson?: string;
  target_time_ms: number;
  template: TemplateKind[];
  start_col?: number | "end";
  start_row?: "last" | number;
  goal: DrillGoal;
  solution_keys: string[];
  i18n: {
    en: DrillI18n;
    ja: DrillI18n;
  };
}

export interface DrillInstance {
  def: DrillDef;
  text: string;
  startOffset: number;
  goalOffset: number;
  goalText?: string;
}

export interface Lesson {
  id: string;
  tier: TierLevel;
  order: number;
  title_en: string;
  title_ja: string;
  concept_en?: string;
  concept_ja?: string;
}
