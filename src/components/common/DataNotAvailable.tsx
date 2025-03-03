import React from "react";
import Link from "next/link";
import ButtonPrimary from "./ButtonPrimary"; // Adjust the import path as necessary
import { AlertCircle } from "lucide-react";

// Define the props interface
interface DataNotAvailableProps {
  title?: string;
  message?: string;
  linkText?: string;
  linkHref?: string;
  claasNameButton?: string;
  className?: string;
}

// Create the functional component using the props interface
const DataNotAvailable: React.FC<DataNotAvailableProps> = ({
  title,
  message,
  linkText,
  linkHref,
  claasNameButton,
  className,
}) => {
  return (
    <div>
      <div className={`flex h-64 items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="flex justify-center">
            <AlertCircle className="mb-4 text-gray-400" size={48} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-700">{title}</h2>
          <p className="text-gray-500">{message}</p>
        </div>
      </div>
      {linkText && (
        <Link href={linkHref || ""} className="mt-6 justify-center sm:flex">
          <ButtonPrimary
            label={linkText}
            className={`flex !h-[58px] justify-center rounded-full p-4 max-sm:w-full md:h-[50px] ${claasNameButton}`}
          />
        </Link>
      )}
    </div>
  );
};

export default DataNotAvailable;
