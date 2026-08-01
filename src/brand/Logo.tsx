/**
 * Iterum's mark: an open loop that spirals inward and closes with an arrowhead —
 * iteration converging on mastery. Drawn on a 32-unit grid so it stays crisp at
 * favicon size, and inherits colour so it works on any surface.
 */
export function Mark({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8.5" fill="url(#iterum-grad)" />
      <path d="M16 7.75a8.25 8.25 0 1 0 8.25 8.25" stroke="white" strokeWidth="2.7" strokeLinecap="round" />
      <path
        d="M16 12.9a3.1 3.1 0 1 1-3.1 3.1"
        stroke="white"
        strokeWidth="2.7"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="m21.35 4.6 3.9 3.15-3.9 3.15"
        stroke="white"
        strokeWidth="2.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="iterum-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8B6BFF" />
          <stop offset="1" stopColor="#5A31EF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span
      className={`font-semibold tracking-[-0.03em] text-fg ${className}`}
      style={{ fontVariationSettings: "'wght' 640" }}
    >
      Iterum
    </span>
  );
}

export function Logo({ size = 28, showWord = true }: { size?: number; showWord?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark size={size} />
      {showWord && <Wordmark className="text-[1.0625rem]" />}
    </span>
  );
}
