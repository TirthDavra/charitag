"use client";
import React, { useEffect } from "react";
import { useCountdown } from "@/hooks/useCountdown";

const RemaningTime = ({
  startTime,
  endTime,
}: {
  startTime?: string | Date;
  endTime: string | Date;
}) => {
  const currentTime = new Date().getTime();
  const remainingTime = new Date(endTime).getTime() - currentTime;

  const { days, hours, minutes } = useCountdown(endTime);
  if (remainingTime <= 0) {
    return <div>Campaign has ended</div>;
  }

  return (
    <div suppressHydrationWarning={true}>
      Days Remaining: {days} d {hours} h {minutes} m
    </div>
  );
};

export default RemaningTime;
