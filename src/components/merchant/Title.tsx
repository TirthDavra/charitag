import React from "react";

const Title = ({ label }: { label: string }) => {
  return (
    <div className="bg-merchant_header rounded-lg py-[14px] pl-[15px] text-[14px] font-semibold">
      {label}
    </div>
  );
};

export default Title;
