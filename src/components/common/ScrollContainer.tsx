"use client";
import React, { useEffect, useState } from "react";

type Props = { children: React.ReactNode; className?: string };

const ScrollContainer = ({ children, className }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY < 150) {
        setIsVisible(true);
      }
      if (window.scrollY > 150) {
        if (window.scrollY < lastScrollY) {
          // If scrolling up
          setIsVisible(true);
        } else {
          // If scrolling down
          setIsVisible(false);
        }
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);
  return (
    <div
      className={`fixed top-0 w-full transition-transform duration-500 ${isVisible ? "translate-y-0 transform backdrop-blur-xl" : "-translate-y-full  transform ease-in-out"} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
