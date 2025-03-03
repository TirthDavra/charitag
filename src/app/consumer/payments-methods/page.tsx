import React from "react";
import Heading from "@/components/common/Heading";
import PaymentMethods from "@/components/consumer/PaymentMethods";
import { getPaymentsMethods } from "@/api/consumer/paymentsMethods";

const page = async () => {
  const response = await getPaymentsMethods();

  return (
    <div className="mt-[30px] pt-7">
      <Heading
        content={`Payments methods`}
        className="!text-[34px] leading-[43px] text-merchant_sidebar_text"
      />
      <div className="pt-2">
        <span className="text-merchant_sidebar_text">
          Add and manage your payment methods using our secure payment system.
        </span>
      </div>
      <div className="mt-7">
        <PaymentMethods paymentMethods={response.data.data} />
      </div>
    </div>
  );
};

export default page;
