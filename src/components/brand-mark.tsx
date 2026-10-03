/** Uses the supplied logo pixels; the filter removes only its blue backdrop. */
export function BrandMark({
  id,
  className = "",
  emblem = false,
}: {
  id: string;
  className?: string;
  emblem?: boolean;
}) {
  return (
    <svg
      className={`brand-mark ${className}`}
      viewBox={emblem ? "196 142 116 151" : "96 143 317 276"}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id={`${id}-ink`} colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1 1 0 0 -0.30"
          />
        </filter>
        <mask
          id={`${id}-mask`}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="513"
          height="513"
          style={{ maskType: "alpha" }}
        >
          <image
            href="/media/orza-logo-original.png"
            width="513"
            height="513"
            filter={`url(#${id}-ink)`}
          />
        </mask>
      </defs>
      <rect
        width="513"
        height="513"
        fill="currentColor"
        mask={`url(#${id}-mask)`}
      />
    </svg>
  );
}
