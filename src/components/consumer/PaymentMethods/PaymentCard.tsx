"use client";
import { useRef, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { toast } from "react-toastify";
import { addPaymentMethod } from "@/api/consumer/paymentsMethods";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addPaymentMethod as addPaymentMethodStore } from "@/lib/Store/slices/consumerFeatures/paymentMethod/paymentMethodSlice";
import { StripeCardNumberElement } from "@stripe/stripe-js";

const defaultErrorMsg = {
  number: null,
  expiry: null,
  cvc: null,
};

export default function PaymentCard() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsgs, setErrorMsgs] = useState<{
    number: string | null;
    expiry: string | null;
    cvc: string | null;
  }>(defaultErrorMsg);

  const previousCardNumberToken = useRef<string | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (cardNumberElement) {
      const { token, error } = await stripe.createToken(cardNumberElement);

      if (error) {
        const errorMsgKey = error.code?.split("_")[1];
        if (errorMsgKey) {
          setErrorMsgs((prev) => ({
            ...prev,
            [errorMsgKey]: error.message,
          }));
        }
      } else if (token) {
        if (previousCardNumberToken.current !== token.id) {
          previousCardNumberToken.current = token.id;
          const res = await addPaymentMethod({ token: token.id });

          if (res.error) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            dispatch(addPaymentMethodStore(res.data.data));
            router.push("/consumer/payments-methods");
          }
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="mt-[30px] rounded-lg border border-borders_color bg-white p-8">
      <h1 className="mb-4 text-2xl font-bold">Add Payment Method</h1>
      <form onSubmit={handleSubmit}>
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
            onChange={() => {
              if (errorMsgs.number) {
                setErrorMsgs((prev) => ({ ...prev, number: null }));
              }
            }}
          />
          {errorMsgs.number && (
            <div className="text-red-500">{errorMsgs.number}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="card-expiry" className="mb-2 block text-gray-700">
            Expiry
          </label>
          <CardExpiryElement
            id="card-expiry"
            className="w-full rounded border border-borders_color p-2"
            onChange={() => {
              if (errorMsgs.expiry) {
                setErrorMsgs((prev) => ({ ...prev, expiry: null }));
              }
            }}
          />
          {errorMsgs.expiry && (
            <div className="text-red-500">{errorMsgs.expiry}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="card-cvc" className="mb-2 block text-gray-700">
            CVV
          </label>
          <CardCvcElement
            id="card-cvc"
            className="w-full rounded border border-borders_color p-2"
            options={{ placeholder: "CVV" }}
            onChange={() => {
              if (errorMsgs.cvc) {
                setErrorMsgs((prev) => ({ ...prev, cvc: null }));
              }
            }}
          />
          {errorMsgs.cvc && <div className="text-red-500">{errorMsgs.cvc}</div>}
        </div>

        {message && <p className="mt-4 text-red-500">{message}</p>}
        <div className="flex justify-center">
          <ButtonPrimary
            label="Save Card"
            type="submit"
            className="rounded-lg"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
}
