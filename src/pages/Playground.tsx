import { useState } from 'react';
import { Loader2, Play, Trash2 } from 'lucide-react';
import { useI18n } from '../i18n';
import { isPythonReady, runPython } from '../lib/python';
import { CodeEditor, OutputPane } from '../components/CodeEditor';
import { Button, Card, SectionTitle } from '../components/ui';

const STARTER = `# Anything goes here.\nfor i in range(1, 4):\n    print(f'{i} squared is {i ** 2}')\n`;

const EXAMPLES = {
  fizzbuzz: `for n in range(1, 16):\n    if n % 15 == 0:\n        print('FizzBuzz')\n    elif n % 3 == 0:\n        print('Fizz')\n    elif n % 5 == 0:\n        print('Buzz')\n    else:\n        print(n)\n`,
  comprehension: `words = ['iterum', 'python', 'avl', 'heap']\nlong_words = [w.upper() for w in words if len(w) > 3]\nprint(long_words)\n\nlengths = {w: len(w) for w in words}\nprint(lengths)\n`,
  klass: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f'({self.x}, {self.y})'\n\n    def __eq__(self, other):\n        return (self.x, self.y) == (other.x, other.y)\n\nprint(Point(1, 2))\nprint(Point(1, 2) == Point(1, 2))\n`,
  stack: `stack = []\nfor ch in 'iterum':\n    stack.append(ch)\n\nreversed_word = ''\nwhile stack:\n    reversed_word += stack.pop()\n\nprint(reversed_word)\n`,
};

export function Playground() {
  const { t } = useI18n();
  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [booting, setBooting] = useState(false);

  async function run() {
    setRunning(true);
    if (!isPythonReady()) setBooting(true);
    const result = await runPython(code);
    setBooting(false);
    setOutput(result.stdout);
    setError(result.error);
    setRunning(false);
  }

  return (
    <div className="space-y-7">
      <header>
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.03em] text-fg">
          {t.playground.title}
        </h1>
        <p className="mt-1 text-[0.9375rem] text-muted">{t.playground.subtitle}</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0 space-y-4">
          <CodeEditor
            value={code}
            onChange={setCode}
            minRows={16}
            toolbar={
              <>
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-white/40">
                  main.py
                </span>
                <button
                  onClick={() => {
                    setCode('');
                    setOutput('');
                    setError(null);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/50 transition-colors hover:bg-white/10 hover:text-white/90"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {t.playground.clear}
                </button>
              </>
            }
          />

          <div className="flex items-center gap-3">
            <Button onClick={run} disabled={running}>
              {running ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" strokeWidth={2.2} />
              )}
              {running ? (booting ? t.lesson.bootingPython : t.lesson.running) : t.playground.run}
            </Button>
            {booting && running && <span className="text-xs text-subtle">{t.lesson.bootingPythonHint}</span>}
          </div>

          <div>
            <p className="mb-1.5 text-xs font-medium text-muted">{t.lesson.outputTitle}</p>
            <OutputPane
              text={error ?? output}
              tone={error ? 'error' : 'neutral'}
              emptyLabel={t.playground.outputEmpty}
            />
          </div>
        </div>

        <aside>
          <SectionTitle>{t.playground.examplesTitle}</SectionTitle>
          <Card padded={false} className="divide-y divide-line overflow-hidden">
            {(
              [
                ['fizzbuzz', t.playground.exampleFizzbuzz],
                ['comprehension', t.playground.exampleComprehension],
                ['klass', t.playground.exampleClass],
                ['stack', t.playground.exampleStack],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => {
                  setCode(EXAMPLES[key]);
                  setOutput('');
                  setError(null);
                }}
                className="block w-full px-4 py-3 text-left text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                {label}
              </button>
            ))}
          </Card>
        </aside>
      </div>
    </div>
  );
}
