import { fundamentals } from './fundamentals';
import { oopModules } from './oop';
import { algorithmModules } from './algorithms';
import type { Course, CourseId, Exercise, Lesson, Module } from './types';

export type { Course, CourseId, Exercise, Lesson, Module } from './types';
export type { CodeExercise, PredictExercise, QuizExercise, QuizChoice } from './types';

const programmingTwo: Course = {
  id: 'programming-ii',
  numeral: 'II',
  modules: [...oopModules, ...algorithmModules],
};

export const courses: Course[] = [fundamentals, programmingTwo];

/** Every lesson, in curriculum order — the sequence the app treats as canonical. */
export const allLessons: Lesson[] = courses.flatMap((course) =>
  course.modules.flatMap((module) => module.lessons),
);

export const allExercises: Exercise[] = allLessons.flatMap((lesson) => lesson.exercises);

export const totalLessonCount = allLessons.length;
export const totalExerciseCount = allExercises.length;

const lessonIndex = new Map(allLessons.map((lesson) => [lesson.id, lesson]));

export function getLesson(id: string): Lesson | undefined {
  return lessonIndex.get(id);
}

/** Where a lesson sits in the global order, for previous/next navigation. */
export function getLessonPosition(id: string) {
  const index = allLessons.findIndex((lesson) => lesson.id === id);
  if (index === -1) return null;
  return {
    index,
    previous: index > 0 ? allLessons[index - 1] : null,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : null,
  };
}

const moduleOfLesson = new Map<string, { module: Module; course: Course }>();
for (const course of courses) {
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      moduleOfLesson.set(lesson.id, { module, course });
    }
  }
}

export function getLessonContext(lessonId: string) {
  return moduleOfLesson.get(lessonId) ?? null;
}

export const allModules: Module[] = courses.flatMap((course) => course.modules);

export function getCourse(id: CourseId): Course | undefined {
  return courses.find((course) => course.id === id);
}
