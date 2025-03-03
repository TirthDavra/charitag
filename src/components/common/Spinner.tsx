import React from "react";

const LoadingSpinner = ({
  size = "10",
  color = "blue-500",
}: {
  size?: string;
  color?: string;
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div
          className={`h-${size} w-${size} rounded-full border-b-8 border-t-8 border-gray-200`}
        ></div>
        <div
          className={`absolute left-0 top-0 h-${size} w-${size} animate-spin rounded-full border-b-8 border-t-8 border-${color}`}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
