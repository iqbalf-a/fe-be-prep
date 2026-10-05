/**
 * components/ui.jsx
 * ---------------------------------------------------------------------------
 * Small presentational helpers shared by the shell: one button, one progress
 * bar, one priority badge, and the inline icons.
 *
 * Styling is plain Tailwind utility composition, so there is no separate
 * stylesheet to keep in sync. The BEM-ish hook class names (`btn`, `btn--primary`,
 * `progress`, `badge`) stay on the elements because the browser check suite
 * selects on them.
 */

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl border font-medium whitespace-nowrap transition ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

const BUTTON_VARIANTS = {
  primary:
    'border-brand bg-brand text-white shadow-card hover:bg-brand/90 hover:shadow-float active:translate-y-px',
  soft: 'border-transparent bg-brand-soft text-brand hover:bg-brand-soft/70 active:translate-y-px',
  ghost: 'border-transparent bg-transparent text-muted hover:bg-soft hover:text-ink',
  done: 'border-transparent bg-ok text-white shadow-card hover:brightness-110 active:translate-y-px',
  outline: 'border-line bg-panel text-ink hover:border-brand hover:text-brand',
  plain: 'border-transparent bg-transparent text-ink hover:bg-soft',
};

const BUTTON_SIZES = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
  hero: 'w-full px-6 py-4 text-lg sm:w-auto',
};

/**
 * @param {object} props
 * @param {'primary'|'soft'|'ghost'|'done'|'outline'|'plain'} [props.variant]
 * @param {'sm'|'md'|'lg'|'hero'} [props.size]
 * @param {boolean} [props.block] stretch to the full width of the parent
 * @param {'button'|'a'} [props.as] render as an anchor instead of a button
 */
export function Button({
  variant = 'plain',
  size = 'md',
  block = false,
  as: Tag = 'button',
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  return (
    <Tag
      type={Tag === 'button' ? type : undefined}
      className={`btn btn--${variant} btn--${size} ${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${
        block ? 'w-full' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const PRIORITY_CLASS = {
  P1: 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400',
  P2: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400',
  P3: 'border-slate-400/30 bg-slate-400/10 text-slate-600 dark:text-slate-400',
};

export function Badge({ priority = 'P3', short, label, className = '' }) {
  return (
    <span
      className={`badge badge--${priority} inline-flex items-center rounded-full border px-2 py-px text-[0.68rem] font-bold tracking-wide uppercase ${
        PRIORITY_CLASS[priority] ?? PRIORITY_CLASS.P3
      } ${className}`}
      title={label}
    >
      {short ?? priority}
    </span>
  );
}

export function ProgressBar({ percent, size = 'md', label = `${percent}% selesai` }) {
  const height = size === 'lg' ? 'h-2.5' : 'h-1.5';
  return (
    <span
      className={`progress progress--${size} block w-full overflow-hidden rounded-full bg-soft ${height}`}
      role="img"
      aria-label={label}
    >
      <span
        className="progress__fill block h-full rounded-full bg-brand transition-[width] duration-200 ease-out"
        style={{ width: `${percent}%` }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ icons */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export function IconCheck(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconCircleCheck(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </svg>
  );
}

export function IconMenu(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconSearch(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.2-3.2" />
    </svg>
  );
}

export function IconSun(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}

export function IconMoon(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconCopy(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h8" />
    </svg>
  );
}

export function IconArrowUp(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function IconChevron(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function IconStar(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="m12 4 2.4 5 5.6.8-4 4 1 5.5-5-2.6-5 2.6 1-5.5-4-4 5.6-.8Z" />
    </svg>
  );
}

export function IconWarn(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 4 2.5 20h19L12 4Z" />
      <path d="M12 10v4M12 17.5v.01" />
    </svg>
  );
}

export function IconArrowLeft(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
