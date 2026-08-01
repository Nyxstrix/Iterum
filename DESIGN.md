# Iterum — design system & product specification

> **Iterum** — Latin, *"again"*. Iteration, loops, deliberate practice, and the
> spiral curriculum that revisits Python at increasing depth across two courses.

---

## 1. Branding

### 1.1 The name

`Iterum` was chosen over descriptive alternatives for three reasons:

| Criterion | Rationale |
|---|---|
| **Semantics** | *Iteration* is simultaneously a Python construct (`for`, `while`, `__iter__`), a learning method (spaced repetition), and the shape of the syllabus — Programming II re-treads Python at a deeper level. The name is the pedagogy. |
| **Bilingual neutrality** | Latin belongs to neither English nor Portuguese, so it reads identically to both users, with no awkward translation and no locale-specific connotations. |
| **Availability of meaning** | Unlike "PyX" names, it does not lock the product to Python, and it carries no existing consumer-tech baggage. |

Deliberately avoided: anything containing `Py`, `Code`, `Learn`, `Lingo`, or a
snake — the entire category is saturated and reads as student-project.

### 1.2 The mark

An open arc that spirals inward and terminates in an arrowhead: **iteration
converging on mastery**. Drawn on a 32-unit grid so it stays legible at 16 px
favicon size. The inner arc is set at 50% opacity to imply a second, tighter
pass — the spiral, not just a circle.

- Rounded-square container, 8.5/32 corner radius (26.6%), matching the app's
  `--radius-xl` proportion.
- Gradient `#8B6BFF → #5A31EF` on the container; strokes are pure white so the
  mark survives on any background.
- `Mark`, `Wordmark`, and `Logo` (lockup) are separate exports — the sidebar uses
  the lockup, the mobile header uses the bare mark, Settings uses the mark at 38 px.

### 1.3 Typography

| Role | Family | Why |
|---|---|---|
| Interface | **Inter Tight** (300–800) | Neo-grotesque with tight default tracking. The condensed cut buys ~6% horizontal space in Portuguese, which runs longer than English — important when both locales share one layout. |
| Code | **JetBrains Mono** | Designed for code; ligatures explicitly disabled (`font-variant-ligatures: none`) so beginners see `!=` and `->` as the characters they actually type. |

Headings use `letter-spacing: -0.022em` and weight 600 — never 700. The optical
weight comes from size and colour contrast, not from bold. Numerals in stats and
progress readouts use `tabular-nums` so values do not jitter as they change.

### 1.4 Colour

One accent, two neutral surfaces, four semantic statuses. Every token is defined
twice and swapped by a `.dark` class on `<html>`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#fbfbfd` | `#08080b` | Page |
| `--surface` | `#ffffff` | `#101015` | Cards, sidebar |
| `--surface-2` | `#f4f4f7` | `#17171e` | Inset fills, hover |
| `--line` | `#e6e6ec` | `#24242e` | Hairlines |
| `--fg` / `--fg-muted` / `--fg-subtle` | 3-step ramp | 3-step ramp | Text hierarchy |
| `--accent` | `#6d4aff` | `#9b85ff` | Single brand action colour |
| `--success` / `--danger` / `--warn` / `--info` | — | — | Exercise verdicts, streaks |

The accent **lightens** in dark mode (`#6d4aff → #9b85ff`) rather than staying
fixed: a saturated violet that reads as confident on white becomes a vibrating,
low-contrast smear on near-black. Each status colour has a matching `-soft`
background token so verdict panels never need opacity hacks.

Design decisions worth naming:

- **Near-black, not black.** `#08080b` in dark mode; pure `#000` makes elevation
  impossible to express and is harsher under long study sessions.
- **The code editor keeps its own surface** (`--code-bg`) in both themes, dark in
  each. Editors are dark by convention, and switching the editor to white in
  light mode would break the muscle memory students carry from VS Code.

### 1.5 Component style

Restrained and flat: 1px hairline borders, `--shadow-xs` on resting cards,
radii from a 5-step scale (6/9/12/16/22 px). No gradients in the UI except the
logo mark. Motion is limited to two keyframes — `fade-up` for entering panels
and `pop` for success states — both under 350 ms.

---

## 2. Layout & component hierarchy

### 2.1 Application shell

```
<ThemeProvider>            theme preference + resolved theme, persisted
 └ <I18nProvider>          language + typed string catalogue
    └ <ProgressProvider>   XP, streak, completion, persisted
       └ <HashRouter>
          └ <AppShell>     sidebar + topbar + <Outlet/>
```

`AppShell` (`src/components/AppShell.tsx`) is the only chrome:

- **Sidebar**, 248 px, fixed, `lg:` and up. Logo lockup → *Learn* group
  (Dashboard, Curriculum, Playground) → *You* group (Progress, Settings) →
  footer with a live overall-completion bar. Below `lg` it becomes an overlay
  drawer that auto-closes on navigation.
- **Topbar**, 64 px, sticky, translucent with `backdrop-blur`. Holds the streak
  chip, the **EN/PT** segmented switch, and the **theme toggle** — the two
  controls the brief called out are permanently one click away on every screen,
  not buried in Settings.
- **Main**, `max-w-6xl`, responsive padding.

Two shell-level behaviours: route changes close the drawer and reset scroll to
the top.

### 2.2 Pages

| Route | Page | Structure |
|---|---|---|
| `/` | **Dashboard** | Time-aware greeting → *Continue where you left off* hero (progress ring + next lesson + CTA) → 4 stat tiles (streak, XP, lessons, exercises) → 2 course cards with progress → *Up next* list + Playground card. |
| `/curriculum` | **Curriculum** | Search field + All/To-do/Done filter → per course: numeral badge, title, progress → per module: title, completion badge, summary, lesson rows (status icon, title, summary, exercise count, duration). |
| `/lesson/:id` | **Lesson** | Breadcrumb → title with course·module eyebrow → **Learn / Practice** tabs. *Learn* = concept prose + sticky Key-points aside. *Practice* = exercise stepper, the runner, prev/next, completion panel. Footer: previous/next lesson cards. |
| `/playground` | **Playground** | Full-width editor + Run → output pane; aside with four loadable examples. |
| `/progress` | **Progress** | Completion ring + streak/best/XP tiles → mastery bars for all 15 modules grouped by course → 7 achievement cards. |
| `/settings` | **Settings** | Appearance (theme 3-way, language) → Data (reset with inline confirmation) → About. |

### 2.3 Component inventory

**Primitives** (`components/ui.tsx`) — `Button` (4 variants × 3 sizes, plus an
exported `buttonClass()` so `<Link>` can wear the same style without nesting a
button), `IconButton`, `Card`, `SectionTitle`, `Badge` (6 tones), `ProgressBar`,
`ProgressRing`, `Segmented`, `Stat`.

**Composites** — `AppShell`, `CodeEditor` + `OutputPane`, `ExerciseRunner`,
`Markdown` + `Inline`, `Logo`/`Mark`/`Wordmark`.

`CodeEditor` is a textarea with a line gutter and a Tab key bound to four spaces
instead of focus-escape. Deliberately not a full editor: the subject is the
language, not the tool.

`Markdown` renders a small subset (headings, paragraphs, bullets, fenced code,
tables, inline code, bold) to **real React elements** — lesson content is data
and can never inject markup. `Inline` applies the same inline rules to prompts,
hints, bullets and quiz options, so `` `backticks` `` render as code everywhere.

---

## 3. Internationalisation

- `src/i18n/strings.ts` holds two catalogues. **English is the source of truth**:
  its inferred shape becomes `Dict`, so the Portuguese object *fails to compile*
  if a key is missing or renamed. Missing translations are a build error, not a
  runtime `undefined`.
- Access is `t.lesson.runCode` — a typed property path, not `t('lesson.runCode')`.
  No string keys, no lookup failures.
- Interpolation uses functions (`t.common.countOf(3, 10)`) so each locale controls
  its own word order and pluralisation — which is why `days(1)` yields "1 dia",
  not "1 dias".
- Portuguese is **European Portuguese (pt-PT)**, post-AO90: *definições*,
  *ficheiro*, *utilizador*, *ecrã*, *aceder*, *ação*/*atual*/*objeto*.
- Language is persisted to `localStorage` and seeded from `navigator.language`;
  `<html lang>` is kept in sync as `en` / `pt-PT` for screen readers.
- **Curriculum content is bilingual inline.** Every lesson field is a
  `{ en, pt }` pair resolved through `pick()`. Switching language re-renders
  lesson prose, exercise prompts, hints, quiz options and explanations — not just
  the chrome.

> **Content rule discovered during testing:** where an exercise asks the learner
> to print a literal string, that literal stays identical in both prompts, because
> a single `expectedOutput` is checked. Translating `Pass` to `Aprovado` in the
> Portuguese prompt would make the exercise unsolvable. Prose translates; checked
> literals do not.

---

## 4. Theming

- Preference is `light | dark | system`, persisted at `iterum.theme`.
- `system` stays **live** — a `matchMedia` listener updates the resolved theme
  when the OS switches, rather than sampling once at boot.
- An inline script in `index.html` resolves the theme **before first paint**, so
  there is no flash of the wrong theme on reload.
- `document.documentElement.style.colorScheme` is set alongside the class, which
  keeps native scrollbars and form controls in the right theme.
- The topbar toggle flips light↔dark directly; Settings exposes the full 3-way.

---

## 5. Curriculum integration

### 5.1 Data model

```
Course (2)  →  Module (15)  →  Lesson (41)  →  Exercise (82)
```

Each `Lesson` carries `title`, `summary`, `minutes`, `concept` (mini-markdown),
`keyPoints[]`, and `exercises[]` — every text field a `{ en, pt }` pair.

### 5.2 Three exercise kinds

The syllabus is **not uniformly executable**, so one exercise type could not cover
it. UML notation and Big-O classes have no runnable form; Gradio cannot run in a
browser sandbox at all.

| Kind | Mechanism | Covers |
|---|---|---|
| `code` | Learner writes Python; real stdout is diffed against `expectedOutput` | Everything executable — syntax through AVL trees |
| `predict` | Learner traces given code and types the exact output | Tracing, scope, mutation, generator exhaustion, default-argument traps |
| `quiz` | Single-answer with explanation | UML notation, Big-O classes, design trade-offs, Gradio API shape |

`predict` exists because *reading* code is the skill exams test and writing-only
practice never builds it. The mutable-default and generator-exhaustion exercises
are pure trace questions — they teach far more as a prediction than as a task.

### 5.3 Syllabus coverage

**Course I — Programming Fundamentals** (9 modules, 19 lessons)

| Module | Lessons |
|---|---|
| Getting started | Introductory concepts · Python language basics |
| Data and variables | Elementary data types · Variables and constants · Arithmetic & type conversion · Console I/O |
| Making decisions | Testing and conditions · Logical & relational operators · Conditional statements |
| Repetition | while loops · for loops and range |
| Functions | Defining functions · Local and global variables |
| Data structures | Lists · Dictionaries · Tuples and sets |
| Text | Strings |
| Interfaces | GUI with Gradio |
| First objects | Introduction to OOP |

**Course II — Programming II** (6 modules, 22 lessons)

| Module | Lessons |
|---|---|
| Advanced Python | Review & idiomatic Python · Native data structures in depth · Advanced function concepts |
| Organising code | Modules and packages · Documentation and type hints · Persistence: files and JSON |
| Object orientation | Classes & static members · Encapsulation · Inheritance · Polymorphism & overriding · Special methods & iteration · Associations between classes · UML class diagrams |
| Efficiency | Algorithmic complexity · Big-O notation |
| Comprehensions & generators | List comprehensions · Generators and iterators |
| Abstract data structures | Abstract data types · Stacks · Queues and deques · Binary search trees and AVL · Priority queues and heaps |

Every bullet in the original syllabus maps to exactly one lesson.

**Gradio**, which needs a server and cannot run under Pyodide, is handled by
splitting the topic: the *handler function* is practised as real, executable
Python (`code`), and the *interface wiring* is assessed as a `quiz`. This mirrors
the habit the lesson teaches — keep logic in a testable plain function and let
Gradio be a thin wrapper.

### 5.4 Execution & grading

`src/lib/python.ts` wraps Pyodide (CPython → WebAssembly):

- The runtime is loaded **once** and reused; the Lesson page pre-warms it while
  the learner reads the concept, so the first Run feels instant.
- Every run gets a **fresh global namespace**, so a variable defined in one
  exercise cannot silently satisfy the next.
- `input()` is **replaced**, not fed via stdin — the real builtin echoes its
  prompt to stdout, which would pollute the compared output.
- Tracebacks are filtered of Pyodide's own frames so learners see their error.
- Comparison is line-wise trimmed: trailing whitespace never fails a correct
  answer, but content and line breaks must match.

### 5.5 Progression & gamification

- **XP per exercise** (10–25, scaled by difficulty).
- **Streak** counts consecutive active days; yesterday still counts, so a streak
  is not lost merely because today's session has not started.
- A lesson auto-completes when all its exercises are solved.
- **7 achievements** tied to real milestones — first exercise, 10, 50, a full
  module, five active days, all of Course I, and the abstract-data-structures
  module.
- **No content is locked.** The original app gated each level behind the previous
  one; a student revising for an exam needs to jump straight to AVL trees. The
  curriculum is ordered and *recommends* a next lesson, but never blocks.

All progress is `localStorage` only (`iterum.progress.v1`) — no account, no
network, nothing leaves the device.

---

## 6. Accessibility & responsiveness

- Semantic landmarks (`banner`, `navigation`, `main`, `complementary`), `role="tablist"`
  on segmented controls, `role="progressbar"` with `aria-valuenow` on bars.
- Every icon-only control carries `aria-label` and `title`.
- Visible focus ring on all interactive elements (`:focus-visible`, 2 px accent).
- Radio groups in `fieldset`/`legend`; the prediction textarea has a bound `<label>`.
- Breakpoints: single column below `sm`, sidebar appears at `lg`, lesson layout
  splits to `1fr / 260px` at `lg`. Wide content (tables, code) scrolls in its own
  container — the page body never scrolls horizontally.

---

## 7. Verified behaviour

Checked end-to-end in the browser during the build:

- All three exercise kinds grade correctly, including a wrong answer.
- Real Python executes: `print`, f-strings, `__str__`/`__eq__`, `input()` stub.
- Language switch re-renders chrome **and** lesson content; `<html lang>` follows.
- Light and dark tokens flip cleanly; Inter Tight and JetBrains Mono load.
- Lesson auto-completion, XP, streak and module mastery all update.
- `tsc` clean, production build clean, zero console errors.
