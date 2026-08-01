import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Flame,
  LayoutDashboard,
  Menu,
  Moon,
  Settings as SettingsIcon,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import { Logo, Mark } from '../brand/Logo';
import { useI18n } from '../i18n';
import { useTheme } from '../providers/theme';
import { useProgress } from '../providers/progress';
import { IconButton, ProgressBar, Segmented, cn } from './ui';

const NAV = [
  { to: '/', key: 'dashboard', icon: LayoutDashboard, end: true },
  { to: '/curriculum', key: 'curriculum', icon: BookOpen, end: false },
  { to: '/playground', key: 'playground', icon: Terminal, end: false },
] as const;

const NAV_SECONDARY = [
  { to: '/progress', key: 'progress', icon: BarChart3 },
  { to: '/settings', key: 'settings', icon: SettingsIcon },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();
  const { overallPercent } = useProgress();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'bg-accent-soft text-accent'
        : 'text-muted hover:bg-surface-2 hover:text-fg',
    );

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <NavLink to="/" onClick={onNavigate} className="rounded-lg">
          <Logo size={26} />
        </NavLink>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        <div className="space-y-0.5">
          <p className="px-3 pb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-subtle">
            {t.nav.sectionLearn}
          </p>
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass} onClick={onNavigate}>
              <item.icon className="h-[1.05rem] w-[1.05rem] shrink-0" strokeWidth={1.9} />
              {t.nav[item.key]}
            </NavLink>
          ))}
        </div>

        <div className="space-y-0.5">
          <p className="px-3 pb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-subtle">
            {t.nav.sectionYou}
          </p>
          {NAV_SECONDARY.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} onClick={onNavigate}>
              <item.icon className="h-[1.05rem] w-[1.05rem] shrink-0" strokeWidth={1.9} />
              {t.nav[item.key]}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="border-t border-line p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-xs font-medium text-muted">{t.progress.overall}</span>
          <span className="text-xs font-semibold tabular-nums text-fg">{overallPercent}%</span>
        </div>
        <ProgressBar percent={overallPercent} />
      </div>
    </div>
  );
}

export function AppShell() {
  const { t, lang, setLang } = useI18n();
  const { resolved, toggle } = useTheme();
  const { streak } = useProgress();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  // Close the mobile drawer whenever navigation happens.
  useEffect(() => setDrawerOpen(false), [location.pathname]);

  // Scroll to the top on route change — otherwise a deep lesson keeps the
  // previous page's scroll offset.
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);

  return (
    <div className="min-h-screen bg-bg">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] border-r border-line bg-surface lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label={t.nav.closeMenu}
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="animate-fade-up absolute inset-y-0 left-0 w-[268px] border-r border-line bg-surface">
            <SidebarContent onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-[248px]">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur-md sm:px-6">
          <IconButton
            label={t.nav.openMenu}
            className="lg:hidden"
            onClick={() => setDrawerOpen(true)}
          >
            {drawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </IconButton>

          <span className="lg:hidden">
            <Mark size={24} />
          </span>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <span
              className={cn(
                'hidden items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold sm:inline-flex',
                streak > 0
                  ? 'border-warn/25 bg-warn-soft text-warn'
                  : 'border-line bg-surface-2 text-subtle',
              )}
              title={t.progress.streakTitle}
            >
              <Flame className="h-3.5 w-3.5" strokeWidth={2.2} />
              <span className="tabular-nums">{streak}</span>
            </span>

            <Segmented
              size="sm"
              value={lang}
              onChange={setLang}
              options={[
                { value: 'en', label: 'EN' },
                { value: 'pt', label: 'PT' },
              ]}
            />

            <IconButton
              label={resolved === 'dark' ? t.settings.themeLight : t.settings.themeDark}
              onClick={toggle}
            >
              {resolved === 'dark' ? (
                <Sun className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.9} />
              ) : (
                <Moon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.9} />
              )}
            </IconButton>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
