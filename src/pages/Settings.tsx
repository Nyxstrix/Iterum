import { useState } from 'react';
import { AlertTriangle, Check, Languages, Monitor, Moon, Palette, Sun, Trash2 } from 'lucide-react';
import { Mark } from '../brand/Logo';
import { useI18n } from '../i18n';
import type { Lang } from '../i18n';
import { useTheme } from '../providers/theme';
import type { ThemePreference } from '../providers/theme';
import { useProgress } from '../providers/progress';
import { Button, Card, SectionTitle, Segmented } from '../components/ui';

function Row({
  icon,
  title,
  hint,
  control,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-muted">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-fg">{title}</span>
          <span className="block text-[0.8125rem] leading-snug text-muted">{hint}</span>
        </span>
      </div>
      <div className="shrink-0 sm:pl-4">{control}</div>
    </div>
  );
}

export function Settings() {
  const { t, lang, setLang } = useI18n();
  const { preference, setPreference } = useTheme();
  const { reset } = useProgress();
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div className="max-w-3xl space-y-8">
      <header>
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-fg">
          {t.settings.title}
        </h1>
        <p className="mt-1 text-[0.9375rem] text-muted">{t.settings.subtitle}</p>
      </header>

      <section>
        <SectionTitle>{t.settings.appearance}</SectionTitle>
        <Card padded={false} className="divide-y divide-line">
          <Row
            icon={<Palette className="h-4 w-4" strokeWidth={1.9} />}
            title={t.settings.theme}
            hint={t.settings.themeHint}
            control={
              <Segmented<ThemePreference>
                value={preference}
                onChange={setPreference}
                options={[
                  {
                    value: 'light',
                    label: (
                      <>
                        <Sun className="h-3.5 w-3.5" strokeWidth={2} />
                        <span className="hidden sm:inline">{t.settings.themeLight}</span>
                      </>
                    ),
                  },
                  {
                    value: 'dark',
                    label: (
                      <>
                        <Moon className="h-3.5 w-3.5" strokeWidth={2} />
                        <span className="hidden sm:inline">{t.settings.themeDark}</span>
                      </>
                    ),
                  },
                  {
                    value: 'system',
                    label: (
                      <>
                        <Monitor className="h-3.5 w-3.5" strokeWidth={2} />
                        <span className="hidden sm:inline">{t.settings.themeSystem}</span>
                      </>
                    ),
                  },
                ]}
              />
            }
          />
          <Row
            icon={<Languages className="h-4 w-4" strokeWidth={1.9} />}
            title={t.settings.language}
            hint={t.settings.languageHint}
            control={
              <Segmented<Lang>
                value={lang}
                onChange={setLang}
                options={[
                  { value: 'en', label: t.settings.languageEn },
                  { value: 'pt', label: t.settings.languagePt },
                ]}
              />
            }
          />
        </Card>
      </section>

      <section>
        <SectionTitle>{t.settings.dataTitle}</SectionTitle>
        <Card>
          <p className="text-[0.8125rem] leading-relaxed text-muted">{t.settings.dataHint}</p>

          {!confirming && !done && (
            <Button variant="danger" size="sm" className="mt-4" onClick={() => setConfirming(true)}>
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
              {t.settings.resetProgress}
            </Button>
          )}

          {confirming && (
            <div className="mt-4 rounded-lg border border-danger/25 bg-danger-soft p-4">
              <div className="flex gap-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-danger" strokeWidth={2} />
                <div>
                  <p className="text-sm font-medium text-fg">{t.settings.resetConfirmTitle}</p>
                  <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-muted">
                    {t.settings.resetConfirmBody}
                  </p>
                </div>
              </div>
              <div className="mt-3.5 flex gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    reset();
                    setConfirming(false);
                    setDone(true);
                  }}
                >
                  {t.common.confirm}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setConfirming(false)}>
                  {t.common.cancel}
                </Button>
              </div>
            </div>
          )}

          {done && (
            <p className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-success">
              <Check className="h-4 w-4" strokeWidth={2.2} />
              {t.settings.resetDone}
            </p>
          )}
        </Card>
      </section>

      <section>
        <SectionTitle>{t.settings.aboutTitle}</SectionTitle>
        <Card className="flex items-start gap-4">
          <Mark size={38} />
          <div>
            <p className="text-sm font-semibold tracking-[-0.015em] text-fg">
              Iterum · {t.meta.tagline}
            </p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">
              {t.settings.aboutBody}
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
}
