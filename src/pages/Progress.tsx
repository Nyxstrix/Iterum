import {
  Award,
  Boxes,
  CheckCircle2,
  Flame,
  GraduationCap,
  Lock,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { allLessons, allModules, courses, totalExerciseCount } from '../curriculum';
import { useI18n } from '../i18n';
import { useProgress } from '../providers/progress';
import { courseLabels } from '../lib/labels';
import { Card, ProgressBar, ProgressRing, SectionTitle, Stat, cn } from '../components/ui';

export function ProgressPage() {
  const { t, pick } = useI18n();
  const progress = useProgress();
  const { isLessonDone, moduleProgress, courseProgress } = progress;

  const lessonsDone = allLessons.filter((lesson) => isLessonDone(lesson.id)).length;
  const exercisesDone = progress.completedExercises.size;

  const achievements: Array<{
    id: string;
    icon: LucideIcon;
    name: string;
    body: string;
    earned: boolean;
  }> = [
    {
      id: 'first',
      icon: Sparkles,
      name: t.achievements.firstStepsName,
      body: t.achievements.firstStepsBody,
      earned: exercisesDone >= 1,
    },
    {
      id: 'ten',
      icon: Zap,
      name: t.achievements.tenDownName,
      body: t.achievements.tenDownBody,
      earned: exercisesDone >= 10,
    },
    {
      id: 'fifty',
      icon: Trophy,
      name: t.achievements.fiftyDownName,
      body: t.achievements.fiftyDownBody,
      earned: exercisesDone >= 50,
    },
    {
      id: 'module',
      icon: Award,
      name: t.achievements.moduleMasterName,
      body: t.achievements.moduleMasterBody,
      earned: allModules.some((module) => moduleProgress(module.id).percent === 100),
    },
    {
      id: 'streak',
      icon: Flame,
      name: t.achievements.streakName,
      body: t.achievements.streakBody,
      earned: progress.activeDayCount >= 5,
    },
    {
      id: 'course-one',
      icon: GraduationCap,
      name: t.achievements.courseOneName,
      body: t.achievements.courseOneBody,
      earned: courseProgress('fundamentals').percent === 100,
    },
    {
      id: 'structures',
      icon: Boxes,
      name: t.achievements.structuresName,
      body: t.achievements.structuresBody,
      earned: moduleProgress('p2-structures').percent === 100,
    },
  ];

  return (
    <div className="space-y-9">
      <header>
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-fg">
          {t.progress.title}
        </h1>
        <p className="mt-1 text-[0.9375rem] text-muted">{t.progress.subtitle}</p>
      </header>

      <section className="grid gap-3 lg:grid-cols-[280px_1fr]">
        <Card className="flex items-center gap-5">
          <ProgressRing percent={progress.overallPercent} size={84} stroke={7}>
            <span className="text-sm font-semibold">{progress.overallPercent}%</span>
          </ProgressRing>
          <div>
            <p className="text-[0.8125rem] font-medium text-muted">{t.progress.overall}</p>
            <p className="mt-0.5 text-sm text-fg">
              {t.common.countOf(lessonsDone, allLessons.length)} {t.common.lessons.toLowerCase()}
            </p>
            <p className="text-sm text-fg">
              {t.common.countOf(exercisesDone, totalExerciseCount)} {t.common.exercises.toLowerCase()}
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat
            label={t.progress.streakTitle}
            value={t.progress.days(progress.streak)}
            tone="warn"
            icon={<Flame className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />}
          />
          <Stat
            label={t.progress.streakBest}
            value={t.progress.days(progress.longestStreak)}
            tone="accent"
            icon={<Award className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />}
          />
          <Stat
            label={t.dashboard.statXp}
            value={progress.xp}
            tone="success"
            icon={<Zap className="h-[1.05rem] w-[1.05rem]" strokeWidth={2} />}
          />
        </div>
      </section>

      {/* Mastery -------------------------------------------------------- */}
      <section>
        <SectionTitle>{t.progress.byModule}</SectionTitle>
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id}>
              <h3 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-fg">
                <span className="grid h-6 w-6 place-items-center rounded-md border border-accent-line bg-accent-soft font-mono text-[0.6875rem] text-accent">
                  {course.numeral}
                </span>
                {courseLabels(course.id, t).title}
              </h3>
              <Card padded={false} className="divide-y divide-line">
                {course.modules.map((module) => {
                  const stats = moduleProgress(module.id);
                  return (
                    <div key={module.id} className="flex items-center gap-4 px-4 py-3">
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-fg">
                          {pick(module.title)}
                        </span>
                        <span className="text-xs text-subtle">
                          {t.curriculum.moduleProgress(stats.done, stats.total)}
                        </span>
                      </span>
                      <span className="w-24 shrink-0 sm:w-40">
                        <ProgressBar percent={stats.percent} tone={stats.percent === 100 ? 'success' : 'accent'} />
                      </span>
                      <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums text-fg">
                        {stats.percent}%
                      </span>
                    </div>
                  );
                })}
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements --------------------------------------------------- */}
      <section>
        <SectionTitle>{t.progress.achievements}</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={cn('flex items-start gap-3.5', !achievement.earned && 'opacity-60')}
            >
              <span
                className={cn(
                  'grid h-10 w-10 shrink-0 place-items-center rounded-lg border',
                  achievement.earned
                    ? 'border-accent-line bg-accent-soft text-accent'
                    : 'border-line bg-surface-2 text-subtle',
                )}
              >
                {achievement.earned ? (
                  <achievement.icon className="h-5 w-5" strokeWidth={1.9} />
                ) : (
                  <Lock className="h-4 w-4" strokeWidth={1.9} />
                )}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 text-sm font-medium text-fg">
                  {achievement.name}
                  {achievement.earned && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" strokeWidth={2.2} />
                  )}
                </span>
                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted">
                  {achievement.earned ? achievement.body : t.progress.achievementLocked}
                </span>
              </span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
