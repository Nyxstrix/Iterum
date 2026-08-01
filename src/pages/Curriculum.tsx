import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, Search, X } from 'lucide-react';
import { courses } from '../curriculum';
import type { Lesson } from '../curriculum';
import { useI18n } from '../i18n';
import { useProgress } from '../providers/progress';
import { courseLabels } from '../lib/labels';
import { Badge, Button, ProgressBar, Segmented, cn } from '../components/ui';

type Filter = 'all' | 'todo' | 'done';

export function Curriculum() {
  const { t, pick, lang } = useI18n();
  const { isLessonDone, courseProgress, moduleProgress } = useProgress();
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (lesson: Lesson) => {
      if (filter === 'todo' && isLessonDone(lesson.id)) return false;
      if (filter === 'done' && !isLessonDone(lesson.id)) return false;
      if (needle === '') return true;
      return (
        lesson.title[lang].toLowerCase().includes(needle) ||
        lesson.summary[lang].toLowerCase().includes(needle)
      );
    };
  }, [filter, query, lang, isLessonDone]);

  const visibleCount = courses
    .flatMap((course) => course.modules.flatMap((module) => module.lessons))
    .filter(matches).length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-fg">
          {t.curriculum.title}
        </h1>
        <p className="mt-1 text-[0.9375rem] text-muted">{t.curriculum.subtitle}</p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
            strokeWidth={1.9}
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.curriculum.searchPlaceholder}
            className="h-10 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-sm text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent"
          />
        </div>
        <Segmented
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: t.curriculum.filterAll },
            { value: 'todo', label: t.curriculum.filterTodo },
            { value: 'done', label: t.curriculum.filterDone },
          ]}
        />
      </div>

      {visibleCount === 0 && (
        <div className="rounded-xl border border-dashed border-line-strong px-6 py-12 text-center">
          <p className="text-sm text-muted">{t.curriculum.noResults}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3"
            onClick={() => {
              setQuery('');
              setFilter('all');
            }}
          >
            <X className="h-3.5 w-3.5" />
            {t.curriculum.clearSearch}
          </Button>
        </div>
      )}

      {courses.map((course) => {
        const labels = courseLabels(course.id, t);
        const stats = courseProgress(course.id);
        const visibleModules = course.modules.filter((module) => module.lessons.some(matches));
        if (visibleModules.length === 0) return null;

        return (
          <section key={course.id} className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent-line bg-accent-soft font-mono text-sm font-semibold text-accent">
                {course.numeral}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold tracking-[-0.02em] text-fg">{labels.title}</h2>
                <p className="text-[0.8125rem] text-muted">{labels.subtitle}</p>
              </div>
              <div className="w-full sm:w-44">
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-muted">{t.curriculum.moduleProgress(stats.done, stats.total)}</span>
                  <span className="font-semibold tabular-nums text-fg">{stats.percent}%</span>
                </div>
                <ProgressBar percent={stats.percent} />
              </div>
            </div>

            <div className="space-y-5">
              {visibleModules.map((module) => {
                const lessons = module.lessons.filter(matches);
                const moduleStats = moduleProgress(module.id);
                const complete = moduleStats.done === moduleStats.total;

                return (
                  <div key={module.id}>
                    <div className="mb-2 flex items-baseline gap-2.5">
                      <h3 className="text-sm font-semibold tracking-[-0.01em] text-fg">
                        {pick(module.title)}
                      </h3>
                      <Badge tone={complete ? 'success' : 'muted'}>
                        {t.curriculum.moduleProgress(moduleStats.done, moduleStats.total)}
                      </Badge>
                    </div>
                    <p className="mb-3 text-[0.8125rem] text-muted">{pick(module.summary)}</p>

                    <ul className="overflow-hidden rounded-xl border border-line bg-surface shadow-xs">
                      {lessons.map((lesson, index) => {
                        const done = isLessonDone(lesson.id);
                        return (
                          <li key={lesson.id} className={cn(index > 0 && 'border-t border-line')}>
                            <Link
                              to={`/lesson/${lesson.id}`}
                              className="flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-surface-2"
                            >
                              {done ? (
                                <CheckCircle2
                                  className="h-[1.15rem] w-[1.15rem] shrink-0 text-success"
                                  strokeWidth={2}
                                />
                              ) : (
                                <Circle
                                  className="h-[1.15rem] w-[1.15rem] shrink-0 text-subtle"
                                  strokeWidth={1.8}
                                />
                              )}
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium text-fg">
                                  {pick(lesson.title)}
                                </span>
                                <span className="mt-0.5 block truncate text-[0.8125rem] text-muted">
                                  {pick(lesson.summary)}
                                </span>
                              </span>
                              <span className="hidden shrink-0 items-center gap-2 sm:flex">
                                <Badge>
                                  {lesson.exercises.length} {t.common.exercises.toLowerCase()}
                                </Badge>
                                <Badge>{t.common.minutesShort(lesson.minutes)}</Badge>
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
