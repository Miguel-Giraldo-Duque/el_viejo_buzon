import { MailboxIcon } from "./mailbox-icon";

function AccentO() {
  return (
    <span className="accent-o">
      o
      <svg viewBox="0 0 20 16" aria-hidden="true" focusable="false">
        <path
          d="M3.5 13.5 L14 2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function Wordmark({ id }: { id?: string }) {
  return (
    <h1 id={id} className="wordmark wordmark-header">
      <span className="sr-only">El Viejo Buzón</span>
      <span className="wordmark-visual" aria-hidden="true">
        <MailboxIcon />
        <span className="wordmark-lines">
          <span className="wordmark-viejo">El Viejo</span>
          <span className="wordmark-buzon">
            Buz
            <AccentO />n
          </span>
        </span>
      </span>
    </h1>
  );
}
