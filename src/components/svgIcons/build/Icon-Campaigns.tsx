import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={1.75}
      d="M17.459 3.565v9.536a.792.792 0 0 1-.301.623.834.834 0 0 1-.492.168.793.793 0 0 1-.186-.024l-7.934-1.984-.933-.233-.105-.026H5.834a3.291 3.291 0 0 1 0-6.583h1.674l.105-.026 8.866-2.217a.792.792 0 0 1 .9.418c.053.109.08.228.08.348Z"
    />
    <path
      stroke="currentColor"
      strokeWidth={1.25}
      d="M5.685 17.708h.983a1.042 1.042 0 0 0 1.042-1.042V14.08l-.486-.12H5.835l-.15 3.749Zm0 0h-.012a1.042 1.042 0 0 1-1.042-.837l-.617-3.211c.15.05.301.093.455.13l1.216 3.918Z"
    />
  </svg>
)
export { SvgComponent as IconCampaigns }
