import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M20.04 10.5c0 5.392-4.325 9.75-9.645 9.75-5.32 0-9.645-4.358-9.645-9.75S5.075.75 10.395.75c5.32 0 9.645 4.358 9.645 9.75Z"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={21}
      height={21}
      fill="none"
      viewBox="0 0 21 21"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.71 9.73c-1.589-.413-2.1-.84-2.1-1.505 0-.763.707-1.295 1.89-1.295.994 0 1.491.378 1.673.98.084.28.315.49.609.49h.21a.664.664 0 0 0 .63-.889c-.294-.826-.98-1.512-2.072-1.778V5.25c0-.58-.469-1.05-1.05-1.05-.581 0-1.05.47-1.05 1.05v.462C8.092 6.006 7 6.888 7 8.24c0 1.617 1.337 2.422 3.29 2.891 1.75.42 2.1 1.036 2.1 1.687 0 .483-.343 1.253-1.89 1.253-1.155 0-1.75-.413-1.981-1-.105-.274-.343-.47-.63-.47h-.196a.668.668 0 0 0-.623.91c.399.973 1.33 1.547 2.38 1.771v.47c0 .58.469 1.05 1.05 1.05.581 0 1.05-.47 1.05-1.05v-.456c1.365-.259 2.45-1.05 2.45-2.485 0-1.988-1.701-2.667-3.29-3.08Z"
        clipRule="evenodd"
      />
    </svg>
  </svg>
)
export { SvgComponent as IconDollar }
