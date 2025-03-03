import StripeElementWrapper from "@/components/consumer/PaymentMethods/StripeElementWrapper";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <StripeElementWrapper>{children}</StripeElementWrapper>;
};

export default layout;
