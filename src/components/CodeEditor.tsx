import { useRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from './ui';

/**
 * A textarea that behaves enough like an editor for teaching Python: a line
 * gutter, and a Tab key that indents by four spaces instead of leaving the
 * field. Deliberately not a full editor — the point is the language, not the tool.
 */
export function CodeEditor({
  value,
  onChange,
  minRows = 12,
  readOnly = false,
  toolbar,
  className,
}: {
  value: string;
  onChange?: (next: string) => void;
  minRows?: number;
  readOnly?: boolean;
  toolbar?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const lineCount = Math.max(value.split('\n').length, minRows);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Tab' || !onChange) return;
    event.preventDefault();
    const target = event.currentTarget;
    const { selectionStart, selectionEnd } = target;
    const next = `${value.slice(0, selectionStart)}    ${value.slice(selectionEnd)}`;
    onChange(next);
    // Restore the caret after React re-renders with the new value.
    requestAnimationFrame(() => {
      target.selectionStart = target.selectionEnd = selectionStart + 4;
    });
  }

  return (
    <div className={cn('overflow-hidden rounded-xl border border-line bg-code-bg', className)}>
      {toolbar && (
        <div className="flex items-center justify-between gap-2 border-b border-white/8 px-3 py-2">
          {toolbar}
        </div>
      )}
      <div className="relative flex overflow-x-auto font-mono text-[0.8125rem] leading-[1.65]">
        <div
          aria-hidden="true"
          className="sticky left-0 z-10 shrink-0 select-none border-r border-white/8 bg-code-bg py-3.5 pl-3.5 pr-2.5 text-right text-white/25"
        >
          {Array.from({ length: lineCount }, (_, index) => (
            <div key={index}>{index + 1}</div>
          ))}
        </div>
        <textarea
          ref={ref}
          value={value}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          onKeyDown={handleKeyDown}
          onChange={(event) => onChange?.(event.target.value)}
          rows={lineCount}
          className={cn(
            'w-full resize-none whitespace-pre bg-transparent py-3.5 pl-3.5 pr-4 text-code-fg',
            'font-mono leading-[1.65] outline-none placeholder:text-white/25',
            readOnly && 'cursor-default',
          )}
        />
      </div>
    </div>
  );
}

export function OutputPane({
  text,
  tone = 'neutral',
  emptyLabel,
}: {
  text: string;
  tone?: 'neutral' | 'error';
  emptyLabel?: string;
}) {
  const empty = text.trim() === '';
  return (
    <pre
      className={cn(
        'max-h-52 overflow-auto rounded-lg border px-3.5 py-3 font-mono text-[0.8125rem] leading-relaxed whitespace-pre-wrap',
        tone === 'error'
          ? 'border-danger/25 bg-danger-soft text-danger'
          : 'border-line bg-surface-2 text-fg',
        empty && 'text-subtle italic',
      )}
    >
      {empty ? (emptyLabel ?? ' ') : text}
    </pre>
  );
}
