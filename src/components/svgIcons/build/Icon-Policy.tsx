import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M19.766 18.815a9.635 9.635 0 1 1-9.093-15.784m3.65.008a9.636 9.636 0 0 1 7.289 12.599"
    />
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M10.414 11.98v-1.863c0-1.129.933-2.044 2.083-2.044 1.151 0 2.084.915 2.084 2.044v1.862m-4.688 0h5.209a1.04 1.04 0 0 1 1.041 1.042v2.864a1.04 1.04 0 0 1-1.041 1.042H9.893a1.04 1.04 0 0 1-1.041-1.041V13.02a1.04 1.04 0 0 1 1.041-1.042Z"
    />
  </svg>
)
export { SvgComponent as IconPolicy }
