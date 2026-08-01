import type { ButtonHTMLAttributes, ReactNode } from 'react';

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

/* -------------------------------------------------------------------------- */
/* Button                                                                      */
/* -------------------------------------------------------------------------- */

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-fg hover:bg-accent-hover shadow-xs disabled:hover:bg-accent',
  secondary:
    'bg-surface text-fg border border-line hover:bg-surface-2 hover:border-line-strong disabled:hover:bg-surface',
  ghost: 'text-muted hover:text-fg hover:bg-surface-2',
  danger: 'bg-danger-soft text-danger border border-danger/25 hover:border-danger/50',
};

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-[0.8125rem] gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-[0.9375rem] gap-2 rounded-lg',
};

/** Exported so links can wear the same clothes without nesting a button. */
export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra?: string) {
  return cn(
    'inline-flex items-center justify-center font-medium whitespace-nowrap select-none',
    'transition-colors duration-150 disabled:opacity-45 disabled:cursor-not-allowed',
    VARIANTS[variant],
    SIZES[size],
    extra,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'primary', size = 'md', className, ...rest }: ButtonProps) {
  return <button className={buttonClass(variant, size, className)} {...rest} />;
}

export function IconButton({
  label,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted',
        'transition-colors hover:bg-surface-2 hover:text-fg',
        className,
      )}
      {...rest}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Surfaces                                                                    */
/* -------------------------------------------------------------------------- */

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-surface shadow-xs',
        padded && 'p-5',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-4">
      <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.07em] text-subtle">
        {children}
      </h2>
      {action}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Badge                                                                       */
/* -------------------------------------------------------------------------- */

type Tone = 'accent' | 'success' | 'muted' | 'warn' | 'danger' | 'info';

const TONES: Record<Tone, string> = {
  accent: 'bg-accent-soft text-accent border-accent-line',
  success: 'bg-success-soft text-success border-success/25',
  muted: 'bg-surface-2 text-muted border-line',
  warn: 'bg-warn-soft text-warn border-warn/25',
  danger: 'bg-danger-soft text-danger border-danger/25',
  info: 'bg-info-soft text-info border-info/25',
};

export function Badge({
  children,
  tone = 'muted',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2 py-0.5',
        'text-[0.6875rem] font-medium leading-5 whitespace-nowrap',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Progress                                                                    */
/* -------------------------------------------------------------------------- */

export function ProgressBar({
  percent,
  className,
  tone = 'accent',
}: {
  percent: number;
  className?: string;
  tone?: 'accent' | 'success';
}) {
  return (
    <div
      className={cn('h-1.5 w-full overflow-hidden rounded-full bg-surface-3', className)}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-700 ease-out',
          tone === 'accent' ? 'bg-accent' : 'bg-success',
        )}
        style={{ width: `${Math.max(percent, percent > 0 ? 3 : 0)}%` }}
      />
    </div>
  );
}

export function ProgressRing({
  percent,
  size = 56,
  stroke = 5,
  children,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  children?: ReactNode;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-surface-3"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          className="stroke-accent transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-fg">
        {children}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Segmented control — used for tabs, theme and language pickers               */
/* -------------------------------------------------------------------------- */

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  size = 'md',
  className,
}: {
  value: T;
  onChange: (next: T) => void;
  options: Array<{ value: T; label: ReactNode }>;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 rounded-lg border border-line bg-surface-2 p-1',
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors',
              size === 'sm' ? 'h-7 px-2.5 text-xs' : 'h-8 px-3 text-[0.8125rem]',
              active
                ? 'bg-surface text-fg shadow-xs'
                : 'text-muted hover:text-fg',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty / stat                                                                */
/* -------------------------------------------------------------------------- */

export function Stat({
  label,
  value,
  icon,
  tone = 'muted',
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  tone?: Tone;
}) {
  return (
    <Card className="flex items-center gap-3.5">
      {icon && (
        <span
          className={cn(
            'grid h-9 w-9 shrink-0 place-items-center rounded-lg border',
            TONES[tone],
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-xl font-semibold leading-tight tracking-[-0.02em] text-fg">
          {value}
        </span>
        <span className="block truncate text-[0.8125rem] text-muted">{label}</span>
      </span>
    </Card>
  );
}
