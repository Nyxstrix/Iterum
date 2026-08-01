import type { CourseId } from '../curriculum';
import type { Dict } from '../i18n/strings';

/** Course names live in the UI catalogue, so they translate with the interface. */
export function courseLabels(id: CourseId, t: Dict) {
  return id === 'fundamentals'
    ? { title: t.courses.fundamentalsTitle, subtitle: t.courses.fundamentalsSubtitle }
    : { title: t.courses.programmingTwoTitle, subtitle: t.courses.programmingTwoSubtitle };
}
