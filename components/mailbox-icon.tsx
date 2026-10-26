export function MailboxIcon({
  className = "mailbox",
  slot = "var(--bg)",
}: {
  className?: string;
  slot?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 104"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M10 30c0-14 44-14 44 0v52c0 12-9 20-22 20S10 94 10 82V30z"
      />
      <ellipse cx="32" cy="30" rx="22" ry="12" fill="currentColor" />
      <rect x="16" y="50" width="32" height="8" rx="2" fill={slot} />
    </svg>
  );
}
