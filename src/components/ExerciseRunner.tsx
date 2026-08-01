import { useState } from 'react';
import { Check, Lightbulb, Loader2, Play, RotateCcw, Sparkles, X } from 'lucide-react';
import type { Exercise } from '../curriculum';
import { useI18n } from '../i18n';
import { isPythonReady, runPython } from '../lib/python';
import { CodeEditor, OutputPane } from './CodeEditor';
import { Inline } from './Markdown';
import { Badge, Button, cn } from './ui';

type Status = 'idle' | 'running' | 'correct' | 'incorrect' | 'error';

/** Line-wise trim so trailing spaces never fail an otherwise correct answer. */
function normalise(text: string) {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.trimEnd())
    .join('\n')
    .trim();
}

export function ExerciseRunner({
  exercise,
  solved,
  onSolved,
}: {
  exercise: Exercise;
  solved: boolean;
  onSolved: () => void;
}) {
  const { t, pick } = useI18n();

  const [code, setCode] = useState(exercise.kind === 'code' ? exercise.starter : '');
  const [prediction, setPrediction] = useState('');
  const [choice, setChoice] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [output, setOutput] = useState('');
  const [errorText, setErrorText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [booting, setBooting] = useState(false);

  function succeed() {
    setStatus('correct');
    onSolved();
  }

  async function checkCode() {
    if (exercise.kind !== 'code') return;
    setStatus('running');
    setErrorText('');
    if (!isPythonReady()) setBooting(true);

    const result = await runPython(code, exercise.stdin);
    setBooting(false);
    setOutput(result.stdout);

    if (result.error) {
      setErrorText(result.error);
      setStatus('error');
      return;
    }
    if (normalise(result.stdout) === normalise(exercise.expectedOutput)) {
      succeed();
    } else {
      setStatus('incorrect');
    }
  }

  function checkPrediction() {
    if (exercise.kind !== 'predict') return;
    if (normalise(prediction) === normalise(exercise.expectedOutput)) succeed();
    else setStatus('incorrect');
  }

  function checkQuiz() {
    if (exercise.kind !== 'quiz') return;
    if (choice === exercise.correct) succeed();
    else setStatus('incorrect');
  }

  const resolved = status === 'correct' || solved;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[0.9375rem] leading-relaxed text-fg">
          <Inline text={pick(exercise.prompt)} />
        </p>
        {resolved && (
          <Badge tone="success" className="mt-0.5 shrink-0">
            <Check className="h-3 w-3" strokeWidth={2.5} />
            {t.common.completed}
          </Badge>
        )}
      </div>

      {/* ------------------------------------------------------------ code */}
      {exercise.kind === 'code' && (
        <>
          <CodeEditor
            value={code}
            onChange={setCode}
            minRows={8}
            toolbar={
              <>
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-white/40">
                  {t.lesson.editorTitle}
                </span>
                <button
                  onClick={() => {
                    setCode(exercise.starter);
                    setStatus('idle');
                    setOutput('');
                    setErrorText('');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-white/50 transition-colors hover:bg-white/10 hover:text-white/90"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {t.lesson.resetCode}
                </button>
              </>
            }
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={checkCode} disabled={status === 'running'}>
              {status === 'running' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" strokeWidth={2.2} />
              )}
              {status === 'running'
                ? booting
                  ? t.lesson.bootingPython
                  : t.lesson.running
                : t.lesson.runCode}
            </Button>
            {exercise.hint && (
              <Button variant="ghost" size="md" onClick={() => setShowHint((prev) => !prev)}>
                <Lightbulb className="h-4 w-4" strokeWidth={1.9} />
                {showHint ? t.lesson.hideHint : t.lesson.showHint}
              </Button>
            )}
            <Button variant="ghost" size="md" onClick={() => setShowSolution((prev) => !prev)}>
              <Sparkles className="h-4 w-4" strokeWidth={1.9} />
              {showSolution ? t.lesson.hideSolution : t.lesson.showSolution}
            </Button>
          </div>

          {booting && status === 'running' && (
            <p className="text-xs text-subtle">{t.lesson.bootingPythonHint}</p>
          )}

          {(output !== '' || status === 'error' || status === 'incorrect') && (
            <div className="space-y-3">
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted">
                  {status === 'error' ? t.lesson.errorTitle : t.lesson.yourOutput}
                </p>
                <OutputPane
                  text={status === 'error' ? errorText : output}
                  tone={status === 'error' ? 'error' : 'neutral'}
                  emptyLabel={t.lesson.outputEmpty}
                />
              </div>
              {status === 'incorrect' && (
                <div>
                  <p className="mb-1.5 text-xs font-medium text-muted">{t.lesson.expectedTitle}</p>
                  <OutputPane text={exercise.expectedOutput} />
                </div>
              )}
            </div>
          )}

          {showSolution && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted">{t.lesson.solutionTitle}</p>
              <CodeEditor value={exercise.solution} readOnly minRows={3} />
            </div>
          )}
        </>
      )}

      {/* --------------------------------------------------------- predict */}
      {exercise.kind === 'predict' && (
        <>
          <CodeEditor value={exercise.snippet} readOnly minRows={3} />
          <div>
            <label
              htmlFor={`predict-${exercise.id}`}
              className="mb-1.5 block text-xs font-medium text-muted"
            >
              {t.lesson.predictPrompt}
            </label>
            <textarea
              id={`predict-${exercise.id}`}
              value={prediction}
              onChange={(event) => setPrediction(event.target.value)}
              placeholder={t.lesson.predictPlaceholder}
              spellCheck={false}
              rows={3}
              className="w-full resize-y rounded-lg border border-line bg-surface px-3.5 py-2.5 font-mono text-[0.8125rem] leading-relaxed text-fg outline-none transition-colors placeholder:text-subtle focus:border-accent"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={checkPrediction} disabled={prediction.trim() === ''}>
              <Check className="h-4 w-4" strokeWidth={2.2} />
              {t.lesson.checkAnswer}
            </Button>
            {exercise.hint && (
              <Button variant="ghost" onClick={() => setShowHint((prev) => !prev)}>
                <Lightbulb className="h-4 w-4" strokeWidth={1.9} />
                {showHint ? t.lesson.hideHint : t.lesson.showHint}
              </Button>
            )}
          </div>
          {status === 'incorrect' && (
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted">{t.lesson.expectedTitle}</p>
              <OutputPane text={exercise.expectedOutput} />
            </div>
          )}
        </>
      )}

      {/* ------------------------------------------------------------ quiz */}
      {exercise.kind === 'quiz' && (
        <>
          {exercise.snippet && <CodeEditor value={exercise.snippet} readOnly minRows={3} />}
          <fieldset className="space-y-2">
            <legend className="sr-only">{t.lesson.quizPrompt}</legend>
            {exercise.choices.map((option) => {
              const active = choice === option.id;
              const isAnswer = resolved && option.id === exercise.correct;
              const isWrongPick = status === 'incorrect' && active;
              return (
                <label
                  key={option.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-3 text-sm transition-colors',
                    isAnswer
                      ? 'border-success/40 bg-success-soft text-fg'
                      : isWrongPick
                        ? 'border-danger/40 bg-danger-soft text-fg'
                        : active
                          ? 'border-accent bg-accent-soft text-fg'
                          : 'border-line bg-surface text-muted hover:border-line-strong hover:text-fg',
                  )}
                >
                  <input
                    type="radio"
                    name={`quiz-${exercise.id}`}
                    value={option.id}
                    checked={active}
                    disabled={resolved}
                    onChange={() => {
                      setChoice(option.id);
                      setStatus('idle');
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                  />
                  <span>
                    <Inline text={pick(option.label)} />
                  </span>
                  {isAnswer && <Check className="ml-auto h-4 w-4 shrink-0 text-success" strokeWidth={2.5} />}
                </label>
              );
            })}
          </fieldset>
          {!resolved && (
            <Button onClick={checkQuiz} disabled={choice === null}>
              <Check className="h-4 w-4" strokeWidth={2.2} />
              {t.lesson.checkAnswer}
            </Button>
          )}
        </>
      )}

      {/* ---------------------------------------------------------- shared */}
      {showHint && exercise.hint && (
        <div className="flex gap-2.5 rounded-lg border border-warn/25 bg-warn-soft px-3.5 py-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-warn" strokeWidth={2} />
          <p className="text-[0.8125rem] leading-relaxed text-fg">
            <Inline text={pick(exercise.hint)} />
          </p>
        </div>
      )}

      {status === 'correct' && (
        <div className="animate-pop flex gap-2.5 rounded-lg border border-success/30 bg-success-soft px-3.5 py-3">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2.5} />
          <div>
            <p className="text-sm font-medium text-fg">{t.lesson.correct}</p>
            <p className="text-[0.8125rem] text-muted">
              {exercise.kind === 'code' ? (
                t.lesson.correctBody
              ) : (
                <Inline text={pick(exercise.explanation)} />
              )}
            </p>
          </div>
        </div>
      )}

      {status === 'incorrect' && (
        <div className="flex gap-2.5 rounded-lg border border-danger/25 bg-danger-soft px-3.5 py-3">
          <X className="mt-0.5 h-4 w-4 shrink-0 text-danger" strokeWidth={2.5} />
          <div>
            <p className="text-sm font-medium text-fg">{t.lesson.incorrect}</p>
            <p className="text-[0.8125rem] text-muted">{t.lesson.incorrectBody}</p>
          </div>
        </div>
      )}
    </div>
  );
}
