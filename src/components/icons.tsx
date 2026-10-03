export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M3 12h17m-7-7 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`flourish ${className}`}
      viewBox="0 0 270 110"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 67C65 41 197 28 251 51c33 15-4 37-48 43-55 8-142-2-161-19C1 38 139 5 204 9c43 3 54 15 41 28M225 90l-12 10 19 1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
