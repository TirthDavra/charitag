import { getMerchantSettings } from "@/api/merchant/merchantSettings";
import { ITax } from "@/api/merchant/types";
import TaxForm from "@/components/merchant/Setting";
import React from "react";

const Tax = async () => {
  let initialState: ITax = {
    automated_tax: 1,
    price_with_tax: 1,
    tax_round_at_subtotal: "",
    tax_classes: "",
    tax_based_on: "",
    shipping_tax_class: "",
    tax_display_shop: "",
    tax_display_cart: "",
    tax_total_display: "",
  };

  const taxData = await getMerchantSettings();
  const response = taxData.data.data?.tax || initialState;
  if (!taxData.error) {
    initialState = response;
  }

  return (
    <div>
      <TaxForm initialState={initialState} />
    </div>
  );
};

export default Tax;
