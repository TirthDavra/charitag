"use client";
import React from "react";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import ButtonPrimary from "@/components/common/ButtonPrimary";
const Page = () => {
  return <TokenGen />;
};

export default Page;

const TokenGen = () => {
  const stripe = useStripe();
  const elements = useElements();
  if (!stripe || !elements) {
    console.log("Stripe is not ready yet");
    return;
  }

  const handleClick = async () => {
    const cardNumber = elements.getElement(CardNumberElement);
    if (cardNumber) {
      const result = await stripe.createToken(cardNumber);
    }
  };
  return (
    <div className="container mt-40">
      <div className="rounded-lg border border-borders_color bg-white p-8">
        <h1 className="mb-4 text-2xl font-bold"></h1>
        <div className="mb-4">
          <label htmlFor="card-number" className="mb-2 block text-gray-700">
            Card Number
          </label>
          <CardNumberElement
            id="card-number"
            className="w-full rounded border border-borders_color p-2"
            options={{
              showIcon: true,
            }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="card-expiry" className="mb-2 block text-gray-700">
            Expiry
          </label>
          <CardExpiryElement
            id="card-expiry"
            className="w-full rounded border border-borders_color p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="card-cvc" className="mb-2 block text-gray-700">
            CVV
          </label>
          <CardCvcElement
            id="card-cvc"
            className="w-full rounded border border-borders_color p-2"
            options={{ placeholder: "CVV" }}
          />
        </div>
      </div>
      <ButtonPrimary label="Gen token" onClick={handleClick}></ButtonPrimary>
    </div>
  );
};
