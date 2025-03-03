import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={52}
    height={36}
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <path
        fill="#fff"
        d="M26.059 5.571a2 2 0 0 1 2.917-.032l18.296 19.077c1.22 1.271.318 3.384-1.444 3.384H10.033c-1.74 0-2.65-2.07-1.474-3.352l17.5-19.077Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={51.805}
        height={35.076}
        x={0.027}
        y={0.924}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0.15 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2385_13617"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0.15 0" />
        <feBlend
          in2="effect1_dropShadow_2385_13617"
          result="effect2_dropShadow_2385_13617"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_2385_13617"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
export { SvgComponent as IconTrickOnVector }
