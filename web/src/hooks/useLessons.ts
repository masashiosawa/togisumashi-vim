import { useEffect, useState } from "react";
import type { Lesson } from "../types/drill";

export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/lessons.json")
      .then((r) => r.json())
      .then((data) => {
        setLessons(data as Lesson[]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[useLessons] Failed to load lessons.json:", err);
        setLoading(false);
      });
  }, []);

  return { lessons, loading };
}
