# Iterum

**Learn Python by iteration** — an interactive platform covering a full two-semester
CS curriculum, from your first `print` to AVL trees and Big-O analysis.

- **41 lessons · 82 exercises · 15 modules · 2 courses**
- **Real CPython** in the browser via Pyodide (WebAssembly) — your code executes
  exactly as it would locally
- **English and European Portuguese**, interface *and* every lesson
- **Light and dark themes**, with a system option

## Run it

```bash
npm install
```

```bash
npm run dev
```

Then open the printed URL. Build for production with `npm run build`; the output
in `dist/` is a static site that works on any host (routing is hash-based, so no
server rewrite rules are needed).

## Project structure

```
src/
  brand/        logo mark, wordmark, lockup
  components/   ui primitives, app shell, editor, exercise runner, markdown
  curriculum/   the syllabus as typed bilingual data
    types.ts        Course -> Module -> Lesson -> Exercise
    fundamentals.ts Course I
    oop.ts          Course II, modules 1-3
    algorithms.ts   Course II, modules 4-6
  i18n/         typed EN / pt-PT string catalogues
  lib/          Pyodide wrapper, labels
  pages/        Dashboard, Curriculum, Lesson, Playground, Progress, Settings
  providers/    theme, progress
```

## Adding a lesson

Append to the relevant module's `lessons` array. Every text field is a
`{ en, pt }` pair — the `L()` helper at the top of each content file keeps this
terse:

```ts
{
  id: 'my-lesson',
  title: L('Recursion', 'Recursão'),
  summary: L('Functions that call themselves.', 'Funções que se chamam a si próprias.'),
  minutes: 12,
  concept: L('...mini-markdown...', '...mini-markdown...'),
  keyPoints: [L('Base case first.', 'Caso base primeiro.')],
  exercises: [
    {
      id: 'my-lesson-1',
      kind: 'code',
      xp: 15,
      prompt: L('Print 6.', 'Imprime 6.'),
      starter: '# your code\n',
      expectedOutput: '6',
      solution: 'print(6)',
    },
  ],
}
```

Exercise kinds are `code` (runs and diffs real stdout), `predict` (type the exact
output of a given snippet), and `quiz` (single answer with an explanation).

> When an exercise asks the learner to print a literal string, keep that literal
> **identical in both languages** — a single `expectedOutput` is checked, so a
> translated literal makes the exercise unsolvable.

`concept` supports a small markdown subset: `### headings`, paragraphs, `- bullets`,
fenced code blocks, tables, `` `inline code` `` and `**bold**`.

## Design documentation

See [DESIGN.md](DESIGN.md) for the branding rationale, colour and type system,
full layout plan, and how the syllabus maps onto the app.

## Data

Progress lives in `localStorage` under `iterum.progress.v1`. There is no account
and no backend — nothing leaves the device. Settings → *Reset all progress* clears it.
