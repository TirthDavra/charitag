import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    fill="currentColor"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M3 .6h2.4A2.4 2.4 0 0 1 7.8 3v2.4a2.4 2.4 0 0 1-2.4 2.4H3A2.4 2.4 0 0 1 .6 5.4V3A2.4 2.4 0 0 1 3 .6Zm2.4 5.6a.8.8 0 0 0 .8-.8V3a.8.8 0 0 0-.8-.8H3a.8.8 0 0 0-.8.8v2.4a.8.8 0 0 0 .8.8h2.4Zm0 3.2H3a2.4 2.4 0 0 0-2.4 2.4v2.4A2.4 2.4 0 0 0 3 16.6h2.4a2.4 2.4 0 0 0 2.4-2.4v-2.4a2.4 2.4 0 0 0-2.4-2.4Zm0 5.6a.8.8 0 0 0 .8-.8v-2.4a.8.8 0 0 0-.8-.8H3a.8.8 0 0 0-.8.8v2.4a.8.8 0 0 0 .8.8h2.4Zm8.8-5.6h-2.4a2.4 2.4 0 0 0-2.4 2.4v2.4a2.4 2.4 0 0 0 2.4 2.4h2.4a2.4 2.4 0 0 0 2.4-2.4v-2.4a2.4 2.4 0 0 0-2.4-2.4Zm0 5.6a.8.8 0 0 0 .8-.8v-2.4a.8.8 0 0 0-.8-.8h-2.4a.8.8 0 0 0-.8.8v2.4a.8.8 0 0 0 .8.8h2.4Zm0-14.4h-2.4A2.4 2.4 0 0 0 9.4 3v2.4a2.4 2.4 0 0 0 2.4 2.4h2.4a2.4 2.4 0 0 0 2.4-2.4V3A2.4 2.4 0 0 0 14.2.6Zm0 5.6a.8.8 0 0 0 .8-.8V3a.8.8 0 0 0-.8-.8h-2.4a.8.8 0 0 0-.8.8v2.4a.8.8 0 0 0 .8.8h2.4Z"
      clipRule="evenodd"
    />
  </svg>
);
export { SvgComponent as IconVariation };
