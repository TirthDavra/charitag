import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.001.667C4.406.667.668 4.405.668 9v3.453c0 .853.747 1.547 1.667 1.547h.833a.833.833 0 0 0 .833-.833V8.881a.833.833 0 0 0-.833-.833h-.757c.464-3.225 3.239-5.714 6.59-5.714 3.352 0 6.127 2.489 6.59 5.714h-.756A.833.833 0 0 0 14 8.88v5.12c0 .918-.747 1.666-1.666 1.666h-1.667v-.833H7.335v2.5h5A3.337 3.337 0 0 0 15.668 14c.92 0 1.667-.694 1.667-1.547V9C17.335 4.405 13.596.667 9 .667Z"
    />
  </svg>
)
export { SvgComponent as IconStoreSupport }
