"use client";
import { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import ButtonPrimary from "@/components/common/ButtonPrimary";
export default function PaymentCard() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.log("Stipe is not loaded yet");
      return;
    }
    setIsLoading(true);
    const cardNumber = elements.getElement(CardNumberElement);
    if (cardNumber) {
      const result = await stripe.createToken(cardNumber);
    }
    setIsLoading(false);
  };

  return (
    <div className="mt-[30px] rounded-lg border border-borders_color bg-white p-8">
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

      <div className="flex justify-center">
        <ButtonPrimary
          label="Test Card"
          type="submit"
          onClick={handleSubmit}
          className="rounded-lg"
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
