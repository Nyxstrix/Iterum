import type { Localized } from '../i18n';

/**
 * Three exercise kinds, because the syllabus is not uniformly executable.
 *
 *  - `code`    the learner writes Python; we run it and diff real stdout.
 *  - `predict` the learner traces given code and types the output it produces.
 *              Trains reading comprehension — the skill exams actually test.
 *  - `quiz`    single-answer questions for material that has no runnable form:
 *              UML notation, Big-O classes, design trade-offs.
 */
export type ExerciseKind = 'code' | 'predict' | 'quiz';

interface ExerciseBase {
  id: string;
  prompt: Localized;
  hint?: Localized;
  xp: number;
}

export interface CodeExercise extends ExerciseBase {
  kind: 'code';
  starter: string;
  expectedOutput: string;
  /** Fed to `input()` when the exercise exercises console reading. */
  stdin?: string;
  solution: string;
}

export interface PredictExercise extends ExerciseBase {
  kind: 'predict';
  snippet: string;
  expectedOutput: string;
  explanation: Localized;
}

export interface QuizChoice {
  id: string;
  label: Localized;
}

export interface QuizExercise extends ExerciseBase {
  kind: 'quiz';
  snippet?: string;
  choices: QuizChoice[];
  correct: string;
  explanation: Localized;
}

export type Exercise = CodeExercise | PredictExercise | QuizExercise;

export interface Lesson {
  id: string;
  title: Localized;
  summary: Localized;
  minutes: number;
  /** Mini-markdown: ### headings, paragraphs, - lists, ```fences, `code`, **bold**. */
  concept: Localized;
  keyPoints: Localized[];
  exercises: Exercise[];
}

export interface Module {
  id: string;
  title: Localized;
  summary: Localized;
  lessons: Lesson[];
}

export type CourseId = 'fundamentals' | 'programming-ii';

export interface Course {
  id: CourseId;
  /** Roman numeral shown in the course badge. */
  numeral: string;
  modules: Module[];
}
