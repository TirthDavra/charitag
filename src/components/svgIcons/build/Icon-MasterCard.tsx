import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={48}
    fill="none"
    {...props}
  >
    <rect width={80} height={48} fill="#F6F8FA" rx={6} />
    <g clipPath="url(#a)">
      <path fill="#FF5F00" d="M47.129 35.965H33.878V12.227h13.251v23.738Z" />
      <path
        fill="#EB001B"
        d="M34.718 24.096c0-4.815 2.262-9.105 5.784-11.869A15.11 15.11 0 0 0 31.143 9C22.78 9 16 15.76 16 24.096c0 8.338 6.78 15.097 15.143 15.097a15.109 15.109 0 0 0 9.36-3.228c-3.523-2.764-5.785-7.054-5.785-11.869Z"
      />
      <path
        fill="#F79E1B"
        d="M65.006 24.097c0 8.337-6.78 15.096-15.143 15.096a15.114 15.114 0 0 1-9.36-3.227c3.523-2.765 5.785-7.054 5.785-11.87 0-4.815-2.262-9.104-5.785-11.868A15.114 15.114 0 0 1 49.863 9c8.363 0 15.143 6.759 15.143 15.097"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M16 9h49v38H16z" />
      </clipPath>
    </defs>
  </svg>
)
export { SvgComponent as IconMasterCard }
