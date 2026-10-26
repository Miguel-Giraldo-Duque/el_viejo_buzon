export function Postmark({ text }: { text: string }) {
  return (
    <svg
      className="postmark"
      viewBox="0 0 360 260"
      role="img"
      aria-label={`Matasellos: ${text}`}
    >
      <g fill="none" strokeLinecap="round">
        <path d="M6 118 C 40 92, 74 144, 108 118 S 160 94, 196 118" stroke="var(--surface)" strokeWidth="9" />
        <path d="M6 140 C 40 114, 74 166, 108 140 S 168 116, 210 140" stroke="var(--surface)" strokeWidth="9" />
        <path d="M6 162 C 40 136, 74 188, 108 162 S 156 138, 188 162" stroke="var(--surface)" strokeWidth="9" />
        <path d="M6 118 C 40 92, 74 144, 108 118 S 160 94, 196 118" stroke="var(--accent-red)" strokeWidth="3" />
        <path d="M6 140 C 40 114, 74 166, 108 140 S 168 116, 210 140" stroke="var(--accent-red)" strokeWidth="3" />
        <path d="M6 162 C 40 136, 74 188, 108 162 S 156 138, 188 162" stroke="var(--accent-red)" strokeWidth="3" />
      </g>
      <circle cx="230" cy="132" r="108" fill="var(--surface)" stroke="var(--accent-red)" strokeWidth="4" />
      <circle cx="230" cy="132" r="78" fill="none" stroke="var(--accent-red)" strokeWidth="2" />
      <path id="postmark-ring" d="M140 128 A 90 90 0 0 1 320 128" fill="none" />
      <text fill="var(--accent-red)" fontFamily="Chivo, sans-serif" fontSize="13" fontWeight="500">
        <textPath href="#postmark-ring" startOffset="0" textLength="278" lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
      <g transform="translate(206 148)">
        <path fill="var(--accent-red)" d="M6 16c0-8 28-8 28 0v32c0 8-6 13-14 13S6 56 6 48V16z" />
        <ellipse cx="20" cy="16" rx="14" ry="8" fill="var(--accent-red)" />
        <rect x="8" y="28" width="24" height="5" rx="1.5" fill="var(--surface)" />
      </g>
    </svg>
  );
}
