"use client";
import Link from "next/link";
import React from "react";

interface LinkButtonPrimaryProps {
  value: React.ReactNode;
  linkTo: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  styleClasses?: string;
}

const LinkButonPrimary: React.FC<LinkButtonPrimaryProps> = ({
  value,
  linkTo,
  onClick,
  styleClasses,
}) => {
  return (
    <Link
      href={linkTo}
      className={`${styleClasses} rounded-full bg-gradient-to-l from-gradient_color_1 to-gradient_color_2 px-4 py-4 font-bold text-white`}
      onClick={onClick}
    >
      {value}
    </Link>
  );
};

export default LinkButonPrimary;
