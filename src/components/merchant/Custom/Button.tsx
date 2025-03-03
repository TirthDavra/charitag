"use client";
import React from "react";

interface IButton {
  label?: string;
  className?: string;
  classNameBtn?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}
const Button = ({
  label,
  className,
  icon,
  classNameBtn,
  onClick,
  disabled,
  type = "button",
}: IButton) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`flex max-w-fit items-center justify-center gap-1 rounded-md border ${disabled ? "bg-gray-300" : "border-merchant_font_second"} p-1 text-merchant_font_second ${className}`}
      onClick={handleClick}
    >
      {icon}
      <button className={`${classNameBtn}`} disabled={disabled} type={type}>
        {label}
      </button>
    </div>
  );
};

export default Button;
