/**
 * Minimal SVG icons for dashboard cards. Stroke-based, 24×24, currentColor.
 * Use inside a span with styles.cardIcon for size and accent color.
 */
const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function IconBalance(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v12M8 10h8M8 14h8" />
    </svg>
  );
}

export function IconSend(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

export function IconContract(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M8 4v16h8V4H8zM6 2h12v20H6V2z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

export function IconCall(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function IconActivity(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 12h4l2-6 2 10 2-4 2 2" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function IconLink(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export function IconTarget(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IconBook(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8M8 11h8" />
    </svg>
  );
}
