"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { ReactNode, MouseEvent } from "react";

interface IButtonPrimary {
  label?: string;
  icon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  classNameLabel?: string;
  classNameIcon?: string;
  disabled?: boolean;
  FWIcon?: any; // Import the specific type from FontAwesome
  logo?: string;
  classNameLogo?: string;
  name?: string;
}

const ButtonPrimary: React.FC<IButtonPrimary> = ({
  label,
  icon,
  onClick,
  className,
  type = "submit",
  classNameLabel,
  classNameIcon,
  disabled = false,
  FWIcon,
  logo,
  classNameLogo,
  name,
  ...props
}) => {
  return (
    <button
      type={type}
      name={name}
      disabled={disabled}
      onClick={onClick}
      {...props}
      className={`G flex w-fit items-center gap-1 bg-[linear-gradient(100deg,_#1657D9_-32.11%,_#FFF_220%)] px-5 py-2 font-bold text-white shadow-sm shadow-gradient_color_2 ${
        disabled
          ? "cursor-not-allowed opacity-50" // Change background color when disabled
          : ""
      } ${className}`}
    >
      {logo && (
        <Image
          src={logo}
          alt="btn-logo"
          width={20}
          height={20}
          className={`${classNameLogo}`}
        />
      )}
      {FWIcon && (
        <FontAwesomeIcon icon={FWIcon} className={`${classNameIcon}`} />
      )}
      {icon}
      <span className={`whitespace-nowrap ${classNameLabel}`}>{label}</span>
    </button>
  );
};

export default ButtonPrimary;

export const Button = ({
  label,
  icon,
  className,
  onClick,
  type,
  classNameLabel,
  classNameLogo,
  logo,
  disabled,
  classNameIcon,
  name,
  ...props
}: {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  classNameLabel?: string;
  classNameLogo?: string;
  logo?: string;
  disabled?: boolean;
  classNameIcon?: string;
  name?: string;
}) => {
  return (
    <button
      type={type || "button"}
      className={`flex items-center gap-1 px-5 py-2 font-bold ${className}`}
      onClick={onClick}
      disabled={disabled}
      name={name}
      {...props}
    >
      {icon}
      {logo && <Image alt="btnLogo" src={logo} className={classNameLogo} />}
      <span className={`w-full ${classNameLabel}`}>{label}</span>
    </button>
  );
};
