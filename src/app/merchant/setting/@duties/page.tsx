import { getMerchantSettings } from "@/api/merchant/merchantSettings";
import { IDuty } from "@/api/merchant/types";
import DutiesForm from "@/components/merchant/Setting/DutiesForm";
import React from "react";

const Duties = async () => {
  let initialState: IDuty = {
    automated_duty: 1,
    price_with_duty: 1,
    duty_round_at_subtotal: "",
    duty_classes: "",
    duty_based_on: "",
    shipping_duty_class: "",
    duty_display_shop: "",
    duty_display_cart: "",
    duty_total_display: "",
  };

  const response = await getMerchantSettings();
  const dutyData = response.data.data?.duty || initialState;
  if (!response.error) {
    initialState = dutyData;
  }

  return (
    <div>
      <DutiesForm initialState={initialState} />
    </div>
  );
};

export default Duties;
