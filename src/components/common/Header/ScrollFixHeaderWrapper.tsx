"use client";
import React from "react";
import { useEffect, useState } from "react";

const ScrollFixHeaderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.pageYOffset > 600);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`left-0 right-0 top-0 ${scroll ? "sticky  z-[20]  bg-white pb-3 border-b border-gradient_color_2/30" : "absolute  bg-transparent"}`}
    >
      {children}
    </div>
  );
};

export default ScrollFixHeaderWrapper;
