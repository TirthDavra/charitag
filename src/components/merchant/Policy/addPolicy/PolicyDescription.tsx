"use client";
import React, { useContext } from "react";
import { PolicyContext } from "../../store/PolicyContext";
import Tiptap from "../../../common/RichTextEditor/RichTextEditor";

const PolicyDescription = () => {
  const { policyDetails, setPolicyDetails } = useContext(PolicyContext);

  const handleChange = (data: string) => {
    setPolicyDetails((prev) => {
      return {
        ...prev,
        description: data,
      };
    });
  };

  return (
    <div className="max-w-[1200px]">
      <Tiptap
        onChange={handleChange}
        placeholder="Product Long Description..."
        initContent={policyDetails.description}
      />
    </div>
  );
};

export default PolicyDescription;
