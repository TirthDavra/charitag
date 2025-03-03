import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 14 14"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M0 11.249v2.364c0 .218.171.39.389.39h2.364a.365.365 0 0 0 .273-.117L11.519 5.4 8.603 2.483.117 10.97a.382.382 0 0 0-.117.28Zm13.773-8.105a.775.775 0 0 0 0-1.097l-1.82-1.82a.775.775 0 0 0-1.096 0L9.434 1.651l2.916 2.916 1.423-1.423Z"
      clipRule="evenodd"
    />
  </svg>
);
export { SvgComponent as IconProfileEdit };
