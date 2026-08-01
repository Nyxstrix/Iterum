import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { allLessons, courses, getLessonContext } from '../curriculum';

const STORAGE_KEY = 'iterum.progress.v1';

type StoredProgress = {
  completedExercises: string[];
  completedLessons: string[];
  xp: number;
  /** Local YYYY-MM-DD strings on which at least one exercise was solved. */
  activeDays: string[];
};

const EMPTY: StoredProgress = {
  completedExercises: [],
  completedLessons: [],
  xp: 0,
  activeDays: [],
};

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function read(): StoredProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<StoredProgress>;
    return {
      completedExercises: parsed.completedExercises ?? [],
      completedLessons: parsed.completedLessons ?? [],
      xp: parsed.xp ?? 0,
      activeDays: parsed.activeDays ?? [],
    };
  } catch {
    return EMPTY;
  }
}

/** Consecutive days ending today or yesterday. Yesterday still counts so a
 *  streak is not lost simply because today's session has not started yet. */
function computeStreak(activeDays: string[]): number {
  if (activeDays.length === 0) return 0;
  const days = new Set(activeDays);
  const cursor = new Date();
  if (!days.has(todayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(todayKey(cursor))) return 0;
  }
  let streak = 0;
  while (days.has(todayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function computeLongestStreak(activeDays: string[]): number {
  if (activeDays.length === 0) return 0;
  const sorted = [...new Set(activeDays)].sort();
  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i += 1) {
    const previous = new Date(`${sorted[i - 1]}T00:00:00`);
    previous.setDate(previous.getDate() + 1);
    if (todayKey(previous) === sorted[i]) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }
  return best;
}

type ProgressContextValue = {
  xp: number;
  streak: number;
  longestStreak: number;
  /** Distinct days with at least one solved exercise. */
  activeDayCount: number;
  completedExercises: Set<string>;
  completedLessons: Set<string>;
  isExerciseDone: (id: string) => boolean;
  isLessonDone: (id: string) => boolean;
  completeExercise: (id: string, xp: number) => void;
  completeLesson: (id: string) => void;
  moduleProgress: (moduleId: string) => { done: number; total: number; percent: number };
  courseProgress: (courseId: string) => { done: number; total: number; percent: number };
  overallPercent: number;
  /** First lesson that still has unfinished exercises, in curriculum order. */
  nextLesson: () => (typeof allLessons)[number] | null;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredProgress>(read);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* quota or private mode — progress simply will not persist */
    }
  }, [state]);

  const completedExercises = useMemo(() => new Set(state.completedExercises), [state.completedExercises]);
  const completedLessons = useMemo(() => new Set(state.completedLessons), [state.completedLessons]);

  const completeExercise = useCallback((id: string, xp: number) => {
    setState((prev) => {
      if (prev.completedExercises.includes(id)) return prev;
      const today = todayKey();
      return {
        completedExercises: [...prev.completedExercises, id],
        completedLessons: prev.completedLessons,
        xp: prev.xp + xp,
        activeDays: prev.activeDays.includes(today) ? prev.activeDays : [...prev.activeDays, today],
      };
    });
  }, []);

  const completeLesson = useCallback((id: string) => {
    setState((prev) =>
      prev.completedLessons.includes(id)
        ? prev
        : { ...prev, completedLessons: [...prev.completedLessons, id] },
    );
  }, []);

  const reset = useCallback(() => setState(EMPTY), []);

  const value = useMemo<ProgressContextValue>(() => {
    const isExerciseDone = (id: string) => completedExercises.has(id);
    const isLessonDone = (id: string) =>
      completedLessons.has(id) ||
      (allLessons
        .find((lesson) => lesson.id === id)
        ?.exercises.every((exercise) => completedExercises.has(exercise.id)) ??
        false);

    const moduleProgress = (moduleId: string) => {
      const lessons = allLessons.filter((lesson) => getLessonContext(lesson.id)?.module.id === moduleId);
      const done = lessons.filter((lesson) => isLessonDone(lesson.id)).length;
      const total = lessons.length;
      return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
    };

    const courseProgress = (courseId: string) => {
      const course = courses.find((item) => item.id === courseId);
      const lessons = course?.modules.flatMap((module) => module.lessons) ?? [];
      const done = lessons.filter((lesson) => isLessonDone(lesson.id)).length;
      const total = lessons.length;
      return { done, total, percent: total === 0 ? 0 : Math.round((done / total) * 100) };
    };

    const doneLessons = allLessons.filter((lesson) => isLessonDone(lesson.id)).length;

    return {
      xp: state.xp,
      streak: computeStreak(state.activeDays),
      longestStreak: computeLongestStreak(state.activeDays),
      activeDayCount: new Set(state.activeDays).size,
      completedExercises,
      completedLessons,
      isExerciseDone,
      isLessonDone,
      completeExercise,
      completeLesson,
      moduleProgress,
      courseProgress,
      overallPercent: Math.round((doneLessons / allLessons.length) * 100),
      nextLesson: () => allLessons.find((lesson) => !isLessonDone(lesson.id)) ?? null,
      reset,
    };
  }, [state, completedExercises, completedLessons, completeExercise, completeLesson, reset]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used inside <ProgressProvider>');
  return context;
}
