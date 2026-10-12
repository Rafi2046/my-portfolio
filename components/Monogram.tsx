/**
 * IR monogram: a lowercase i and an R sharing one stem. The i's dot and the
 * R's leg (a slanted blade) are Flutter blue, a nod to the framework's design
 * language without reusing its trademarked logo.
 * Letters take `currentColor`; the accents take `--flutter-blade`.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className}>
      <circle cx="14.1" cy="8.6" r="2.5" fill="var(--flutter-blade)" />
      <path
        fillRule="evenodd"
        d="M12 13h8.4a6.2 6.2 0 0 1 0 12.4h-4.1V32H12Zm4.3 3.8v4.8h4.1a2.4 2.4 0 0 0 0-4.8Z"
        fill="currentColor"
      />
      <path d="M19 25.4h5l6.2 6.6h-5Z" fill="var(--flutter-blade)" />
    </svg>
  );
}
