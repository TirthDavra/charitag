import Title from "@/components/merchant/Title";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Title label="Dashboard" />
      {children}
    </div>
  );
};

export default layout;
