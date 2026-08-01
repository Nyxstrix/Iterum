import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Circle, PartyPopper } from 'lucide-react';
import { getLesson, getLessonContext, getLessonPosition } from '../curriculum';
import { useI18n } from '../i18n';
import { useProgress } from '../providers/progress';
import { ensurePython } from '../lib/python';
import { courseLabels } from '../lib/labels';
import { Inline, Markdown } from '../components/Markdown';
import { ExerciseRunner } from '../components/ExerciseRunner';
import { Badge, Card, Segmented, buttonClass, cn } from '../components/ui';

export function LessonPage() {
  const { lessonId = '' } = useParams();
  const { t, pick } = useI18n();
  const { isExerciseDone, completeExercise, completeLesson, isLessonDone } = useProgress();

  const [tab, setTab] = useState<'learn' | 'practice'>('learn');
  const [exerciseIndex, setExerciseIndex] = useState(0);

  const lesson = getLesson(lessonId);

  // Reset the view whenever the route points at a different lesson.
  useEffect(() => {
    setTab('learn');
    setExerciseIndex(0);
  }, [lessonId]);

  // Warm the interpreter while the learner reads, so the first run feels instant.
  useEffect(() => {
    if (lesson?.exercises.some((exercise) => exercise.kind === 'code')) {
      void ensurePython();
    }
  }, [lesson]);

  const allDone = lesson?.exercises.every((exercise) => isExerciseDone(exercise.id)) ?? false;

  useEffect(() => {
    if (lesson && allDone) completeLesson(lesson.id);
  }, [lesson, allDone, completeLesson]);

  if (!lesson) return <Navigate to="/curriculum" replace />;

  const context = getLessonContext(lesson.id);
  const position = getLessonPosition(lesson.id);
  const exercise = lesson.exercises[exerciseIndex];
  const isLast = exerciseIndex === lesson.exercises.length - 1;

  return (
    <div className="space-y-7">
      <Link
        to="/curriculum"
        className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        {t.lesson.backToCurriculum}
      </Link>

      <header>
        {context && (
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.06em] text-subtle">
            {courseLabels(context.course.id, t).title} · {pick(context.module.title)}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-[1.625rem] font-semibold tracking-[-0.03em] text-fg">
            {pick(lesson.title)}
          </h1>
          {isLessonDone(lesson.id) && (
            <Badge tone="success">
              <Check className="h-3 w-3" strokeWidth={2.5} />
              {t.lesson.alreadyDone}
            </Badge>
          )}
        </div>
        <p className="mt-1.5 text-[0.9375rem] text-muted">{pick(lesson.summary)}</p>
      </header>

      <Segmented
        value={tab}
        onChange={setTab}
        options={[
          { value: 'learn', label: t.lesson.tabLearn },
          {
            value: 'practice',
            label: (
              <span className="inline-flex items-center gap-1.5">
                {t.lesson.tabPractice}
                <span className="rounded bg-surface-3 px-1 text-[0.6875rem] tabular-nums text-muted">
                  {lesson.exercises.filter((item) => isExerciseDone(item.id)).length}/
                  {lesson.exercises.length}
                </span>
              </span>
            ),
          },
        ]}
      />

      {tab === 'learn' ? (
        <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
          <Card className="min-w-0">
            <Markdown source={pick(lesson.concept)} />
          </Card>

          <aside className="space-y-4">
            <Card>
              <h2 className="mb-3 text-[0.8125rem] font-semibold uppercase tracking-[0.07em] text-subtle">
                {t.lesson.keyPoints}
              </h2>
              <ul className="space-y-2.5">
                {lesson.keyPoints.map((point, index) => (
                  <li key={index} className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <Inline text={pick(point)} />
                  </li>
                ))}
              </ul>
            </Card>
            <button
              onClick={() => setTab('practice')}
              className={buttonClass('primary', 'md', 'w-full')}
            >
              {t.lesson.tabPractice}
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </button>
          </aside>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Exercise stepper */}
          <div className="flex flex-wrap items-center gap-2">
            {lesson.exercises.map((item, index) => {
              const done = isExerciseDone(item.id);
              const active = index === exerciseIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setExerciseIndex(index)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors',
                    active
                      ? 'border-accent bg-accent-soft text-accent'
                      : done
                        ? 'border-success/30 bg-success-soft text-success'
                        : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg',
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.2} />
                  ) : (
                    <Circle className="h-3.5 w-3.5" strokeWidth={2} />
                  )}
                  {index + 1}
                </button>
              );
            })}
            <span className="ml-auto text-xs text-subtle">
              {t.lesson.exerciseOf(exerciseIndex + 1, lesson.exercises.length)}
            </span>
          </div>

          <Card>
            <ExerciseRunner
              key={exercise.id}
              exercise={exercise}
              solved={isExerciseDone(exercise.id)}
              onSolved={() => completeExercise(exercise.id, exercise.xp)}
            />
          </Card>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setExerciseIndex((index) => Math.max(0, index - 1))}
              disabled={exerciseIndex === 0}
              className={buttonClass('secondary', 'md')}
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              {t.common.previous}
            </button>
            {!isLast && (
              <button
                onClick={() => setExerciseIndex((index) => index + 1)}
                className={buttonClass('secondary', 'md')}
              >
                {t.lesson.nextExercise}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            )}
          </div>

          {allDone && (
            <Card className="animate-pop border-success/30 bg-success-soft">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <PartyPopper className="h-6 w-6 shrink-0 text-success" strokeWidth={1.9} />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold tracking-[-0.015em] text-fg">{t.lesson.lessonDone}</h3>
                  <p className="text-[0.8125rem] text-muted">{t.lesson.lessonDoneBody}</p>
                </div>
                {position?.next && (
                  <Link
                    to={`/lesson/${position.next.id}`}
                    className={buttonClass('primary', 'md', 'shrink-0')}
                  >
                    {t.lesson.nextLesson}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </Link>
                )}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Lesson-to-lesson navigation */}
      <nav className="flex items-stretch justify-between gap-3 border-t border-line pt-6">
        {position?.previous ? (
          <Link
            to={`/lesson/${position.previous.id}`}
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-line-strong"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 text-subtle" strokeWidth={2} />
            <span className="min-w-0">
              <span className="block text-xs text-subtle">{t.common.previous}</span>
              <span className="block truncate text-sm font-medium text-fg">
                {pick(position.previous.title)}
              </span>
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
        {position?.next ? (
          <Link
            to={`/lesson/${position.next.id}`}
            className="group flex min-w-0 flex-1 items-center justify-end gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-right transition-colors hover:border-line-strong"
          >
            <span className="min-w-0">
              <span className="block text-xs text-subtle">{t.common.next}</span>
              <span className="block truncate text-sm font-medium text-fg">
                {pick(position.next.title)}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-subtle" strokeWidth={2} />
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </div>
  );
}
