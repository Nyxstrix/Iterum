import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CheckCircle2, Flame, Terminal, Trophy, Zap } from 'lucide-react';
import { allLessons, courses, getLessonContext, totalExerciseCount } from '../curriculum';
import { useI18n } from '../i18n';
import { useProgress } from '../providers/progress';
import { courseLabels } from '../lib/labels';
import { Badge, Card, ProgressBar, ProgressRing, SectionTitle, Stat, buttonClass } from '../components/ui';

function greetingKey(hour: number) {
  if (hour < 12) return 'greetingMorning' as const;
  if (hour < 19) return 'greetingAfternoon' as const;
  return 'greetingEvening' as const;
}

export function Dashboard() {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const { isLessonDone, nextLesson, courseProgress } = progress;

  const next = nextLesson();
  const context = next ? getLessonContext(next.id) : null;
  const lessonsDone = allLessons.filter((lesson) => isLessonDone(lesson.id)).length;

  const upcoming = allLessons.filter((lesson) => !isLessonDone(lesson.id)).slice(1, 4);

  return (
    <div className="space-y-9">
      <header>
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-fg">
          {t.dashboard[greetingKey(new Date().getHours())]}
        </h1>
        <p className="mt-1 text-[0.9375rem] text-muted">{t.dashboard.subtitle}</p>
      </header>

      {/* Continue ------------------------------------------------------- */}
      <section>
        <SectionTitle>{t.dashboard.continueTitle}</SectionTitle>
        {next ? (
          <Card className="relative overflow-hidden">
            <div className="grid-noise pointer-events-none absolute inset-0 opacity-[0.55]" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <ProgressRing percent={progress.overallPercent} size={62}>
                {progress.overallPercent}%
              </ProgressRing>
              <div className="min-w-0 flex-1">
                {context && (
                  <p className="mb-1 truncate text-xs font-medium uppercase tracking-[0.06em] text-subtle">
                    {courseLabels(context.course.id, t).title} · {pick(context.module.title)}
                  </p>
                )}
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-fg">
                  {pick(next.title)}
                </h3>
                <p className="mt-0.5 line-clamp-2 text-sm text-muted">{pick(next.summary)}</p>
              </div>
              <Link to={`/lesson/${next.id}`} className={buttonClass('primary', 'lg', 'shrink-0')}>
                {lessonsDone === 0 ? t.common.start : t.common.continue}
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </div>
          </Card>
        ) : (
          <Card>
            <p className="text-sm text-muted">{t.dashboard.nextUpEmpty}</p>
          </Card>
        )}
      </section>

      {/* Stats ---------------------------------------------------------- */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat
          label={t.dashboard.statStreak}
          value={progress.streak}
          tone="warn"
          icon={<Flame className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />}
        />
        <Stat
          label={t.dashboard.statXp}
          value={progress.xp}
          tone="accent"
          icon={<Zap className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />}
        />
        <Stat
          label={t.dashboard.statLessons}
          value={`${lessonsDone}/${allLessons.length}`}
          tone="success"
          icon={<CheckCircle2 className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />}
        />
        <Stat
          label={t.dashboard.statExercises}
          value={`${progress.completedExercises.size}/${totalExerciseCount}`}
          tone="info"
          icon={<Trophy className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />}
        />
      </section>

      {/* Courses -------------------------------------------------------- */}
      <section>
        <SectionTitle
          action={
            <Link
              to="/curriculum"
              className="text-[0.8125rem] font-medium text-accent hover:underline"
            >
              {t.dashboard.browseAll}
            </Link>
          }
        >
          {t.dashboard.coursesTitle}
        </SectionTitle>
        <div className="grid gap-3 md:grid-cols-2">
          {courses.map((course) => {
            const labels = courseLabels(course.id, t);
            const stats = courseProgress(course.id);
            return (
              <Link
                key={course.id}
                to="/curriculum"
                className="group rounded-xl border border-line bg-surface p-5 shadow-xs transition-colors hover:border-line-strong"
              >
                <div className="mb-3 flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent-line bg-accent-soft font-mono text-[0.8125rem] font-semibold text-accent">
                    {course.numeral}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold tracking-[-0.015em] text-fg">
                      {labels.title}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">
                      {labels.subtitle}
                    </span>
                  </span>
                </div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-muted">
                    {t.curriculum.moduleProgress(stats.done, stats.total)}
                  </span>
                  <span className="font-semibold tabular-nums text-fg">{stats.percent}%</span>
                </div>
                <ProgressBar percent={stats.percent} />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Up next + playground ------------------------------------------- */}
      <section className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionTitle>{t.dashboard.nextUpTitle}</SectionTitle>
          <div className="space-y-2">
            {upcoming.length === 0 && (
              <Card>
                <p className="text-sm text-muted">{t.dashboard.nextUpEmpty}</p>
              </Card>
            )}
            {upcoming.map((lesson) => {
              const lessonContext = getLessonContext(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 shadow-xs transition-colors hover:border-line-strong"
                >
                  <BookOpen className="h-4 w-4 shrink-0 text-subtle" strokeWidth={1.9} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-fg">
                      {pick(lesson.title)}
                    </span>
                    {lessonContext && (
                      <span className="block truncate text-xs text-subtle">
                        {pick(lessonContext.module.title)}
                      </span>
                    )}
                  </span>
                  <Badge>{t.common.minutesShort(lesson.minutes)}</Badge>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <SectionTitle>{t.nav.playground}</SectionTitle>
          <Link
            to="/playground"
            className="flex h-[calc(100%-2rem)] flex-col justify-between rounded-xl border border-line bg-surface p-5 shadow-xs transition-colors hover:border-line-strong"
          >
            <Terminal className="h-5 w-5 text-accent" strokeWidth={1.9} />
            <span>
              <span className="mt-4 block text-sm font-medium text-fg">
                {t.dashboard.jumpToPlayground}
              </span>
              <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">
                {t.dashboard.playgroundBlurb}
              </span>
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
