"use client";
import FailedToLoadPage from "@/components/FailedToLoad";
import React from "react";

const error = () => {
  return (
    <div className="container">
      <FailedToLoadPage />
    </div>
  );
};

export default error;
