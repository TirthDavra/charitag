import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={48}
    fill="currentColor"
    {...props}
  >
    <path
      fill="#303136"
      fillRule="evenodd"
      d="M2.333 10A2.34 2.34 0 0 0 0 12.334v9.333h.023l-.023 21a4.68 4.68 0 0 0 4.667 4.667h39.666A2.34 2.34 0 0 0 46.667 45a2.34 2.34 0 0 0-2.334-2.333H7a2.34 2.34 0 0 1-2.333-2.333v-28A2.34 2.34 0 0 0 2.333 10Zm49-4.666H32.667l-3.29-3.29A4.681 4.681 0 0 0 26.063.667H14c-2.567 0-4.643 2.1-4.643 4.667l-.024 28A4.68 4.68 0 0 0 14 38h37.333A4.68 4.68 0 0 0 56 33.334V10a4.68 4.68 0 0 0-4.667-4.666Zm-33.6 23.8 8.19-10.92a1.185 1.185 0 0 1 1.867-.024l7.233 9.31 4.9-5.903c.467-.583 1.354-.56 1.82.023l5.81 7.467c.607.77.047 1.89-.91 1.89H18.667c-.957.023-1.517-1.073-.934-1.843Z"
      clipRule="evenodd"
    />
  </svg>
)
export { SvgComponent as IconVariationProductImage }
