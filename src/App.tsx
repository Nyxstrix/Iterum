import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { I18nProvider } from './i18n';
import { ProgressProvider } from './providers/progress';
import { ThemeProvider } from './providers/theme';
import { Curriculum } from './pages/Curriculum';
import { Dashboard } from './pages/Dashboard';
import { LessonPage } from './pages/Lesson';
import { Playground } from './pages/Playground';
import { ProgressPage } from './pages/Progress';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ProgressProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppShell />}>
                <Route index element={<Dashboard />} />
                <Route path="curriculum" element={<Curriculum />} />
                <Route path="lesson/:lessonId" element={<LessonPage />} />
                <Route path="playground" element={<Playground />} />
                <Route path="progress" element={<ProgressPage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProgressProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
