export type AtlasCategory =
  | "motion"
  | "search"
  | "insert"
  | "edit"
  | "composition"
  | "repeat"
  | "meta"
  | "environment"
  | "config"
  | "power"
  | "display";

export type AtlasDifficulty = "beginner" | "intermediate" | "advanced" | "master";

export type AtlasFrequency = "high" | "mid" | "low";

export interface AtlasArticleI18n {
  title: string;
  summary: string;
  body: string;
}

export interface AtlasArticle {
  id: string;
  order: number;
  category: AtlasCategory;
  drillable: boolean;
  difficulty: AtlasDifficulty;
  frequency: AtlasFrequency;
  related_drills: string[];
  related_articles: string[];
  help_tags: string[];
  i18n: {
    en: AtlasArticleI18n;
    ja: AtlasArticleI18n;
  };
}
