import * as React from "react";
import { SVGProps } from "react";

interface svgProps {
  firstcolor: string;
  secondcolor: string;
  id: string;
}
const SvgComponent: React.FC<SVGProps<SVGSVGElement> & svgProps> = (props) => {
  const { firstcolor, secondcolor, id } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 62.75 91.79"
      {...props}
    >
      <defs>
        <linearGradient
          id={`${id}_a`}
          x1={31.38}
          x2={31.38}
          y1={92.04}
          y2={0.26}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor={firstcolor} />
          <stop offset={1} stopColor={secondcolor} />
        </linearGradient>
        <linearGradient
          xlinkHref={`#${id}_a`}
          id={`${id}_b`}
          x1={31.34}
          x2={31.34}
          y1={41.26}
          y2={36.34}
        />
      </defs>
      <g data-name="Layer 2">
        <g data-name="Layer 1">
          <g data-name="Layer 2">
            <g data-name="Layer 1-2">
              <path
                d="m62.62 79.38-19.19-20a.4.4 0 0 1 0-.56C49.47 51.52 58 39.08 58 26.5a26.5 26.5 0 0 0-53 0C5 39 13.4 51.38 19.44 58.66a.43.43 0 0 1 0 .56L.12 79.38a.41.41 0 0 0 0 .59.34.34 0 0 0 .16.1l7.92 2.68a.46.46 0 0 1 .27.26l2.88 8.49a.42.42 0 0 0 .53.27.62.62 0 0 0 .17-.11l19-19.85a.41.41 0 0 1 .58 0l19 19.85a.41.41 0 0 0 .59 0 .45.45 0 0 0 .11-.17L54.22 83a.4.4 0 0 1 .26-.26l8-2.68a.41.41 0 0 0 .24-.54.44.44 0 0 0-.1-.14ZM40.7 31.91c-.1 6.2-8.37 13.84-9.32 14-1-.14-9.21-7.78-9.32-14V20.59a2.61 2.61 0 0 1 .73-1.85 2.55 2.55 0 0 1 1.72-.74c1.67-.05 6.79-.24 13.71 0a3.37 3.37 0 0 1 2.48 2.62Z"
                style={{
                  fill: `url(#${id}_a)`,
                }}
              />
              <path
                d="M33.8 38.8a2.46 2.46 0 1 1-2.46-2.46 2.46 2.46 0 0 1 2.46 2.46"
                style={{
                  fill: `url(#${id}_b)`,
                }}
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};
export { SvgComponent as IconGradientCharityLogo };
