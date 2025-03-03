import React from "react";

export interface HeaingProps {
  content: string | number;
  varient?: string;
  className?: string;
  required?: boolean;
}

const Heading: React.FC<HeaingProps> = ({
  content,
  varient = "xl",
  className,
  required,
}) => {
  return (
    <>
      <h1 className={`text-${varient} font-bold ${className}`}>
        {content}
        {required && (
          <span className="ml-1 text-xl font-bold text-blue-600">*</span>
        )}
      </h1>
    </>
  );
};

export default Heading;
