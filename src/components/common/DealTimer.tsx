"use client";
import { useCountdown } from "@/hooks/useCountdown";
import React from "react";

const DealTimer = ({
  countDown,
  className,
}: {
  countDown: string | Date | number;
  className?: string;
}) => {
  const { days, hours, minutes, seconds } = useCountdown(countDown);

  return (
    <div
      className={`mt-10 flex justify-center rounded-md border border-merchant_text_color_blue/50 py-2 font-semibold text-merchant_text_color_blue ${className}`}
      suppressHydrationWarning
    >
      <div className="">End of Deal:</div>
      <div>&nbsp;{days}d&nbsp;</div>
      <div>{hours}h&nbsp;</div>
      <div>{minutes}m&nbsp;</div>
      {/* <div>{seconds}s</div> */}
    </div>
  );
};

export default DealTimer;
