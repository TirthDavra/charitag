"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/components/common/Heading";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { ICheckoutDetails } from ".";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import {
  chargePayement,
  getPaymentsMethodsClient,
} from "@/api/consumer/paymentsMethods";
import { toast } from "react-toastify";
import { ISavedAddress } from "@/api/consumer/types";
import { deleteAddress, getMySavedAddress } from "@/api/consumer/checkout";
import BillingAddressSingle from "@/app/consumer/billing-address/BillingAddressSingle";
import { useModal } from "@/components/context/ModalContext";
import ManageAddressModal, {
  ISaveAddressInternalState,
} from "@/app/consumer/billing-address/ManageAddressModal";
import { IPaymentsMethods } from "../PaymentMethods/types";
import { useAppDispatch, useAppSelectorConsumer } from "@/lib/Store/hooks";
import {
  deleteallAddress,
  setallAddress,
} from "@/lib/Store/slices/consumerFeatures/address/address";
import Loader from "@/components/common/Loader";
import { clearCart, setCurrentStep } from "./CartOperations";

const Checkout = ({
  checkoutDetails,
  setCheckoutDetails,
}: {
  checkoutDetails: ICheckoutDetails;
  setCheckoutDetails: React.Dispatch<React.SetStateAction<ICheckoutDetails>>;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const allAddresses = useAppSelectorConsumer((state) => state.address);
  const address = allAddresses.allAddress;
  const wholeCart = useAppSelectorConsumer((state) => state.cart);
  const cart = wholeCart.cart;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (cart) {
        const response = await getMySavedAddress();
        if (
          !response.error &&
          response.data.status &&
          allAddresses.init === false
        ) {
          dispatch(setallAddress({ data: response.data.data, init: true }));
          if (
            response.data?.data?.length > 0 &&
            checkoutDetails.address_id === null
          ) {
            setCheckoutDetails((prev) => ({
              ...prev,
              address_id: response.data.data[0].id,
            }));
          }
        }
      }
      setIsLoading(false);
    })();
  }, [dispatch]);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { openModal, closeModal } = useModal();
  return (
    <div className="">
      <div className="my-8 flex w-full flex-col gap-5  rounded-xl bg-white px-10 py-10 shadow-equally_distributed_bluish ">
        <div
          className="`transition-transform  w-fit cursor-pointer rounded-xl p-1 px-2 text-links_color duration-300 ease-in-out hover:scale-[1.1]"
          onClick={() => {
            setCurrentStep(wholeCart.currentStep - 1);
          }}
        >
          <FontAwesomeIcon className="pr-2" icon={faArrowLeft} />
          Back
        </div>
        <Heading varient={"4xl"} content={"Checkout"} />
        {wholeCart.currentStep === 1 && (
          <>
            <Heading varient={"xl"} content={"Billing details"} required />
            <div className="relative min-h-[44vh]">
              {address?.length > 0 && !isLoading ? (
                address.map((addres, index) => {
                  return (
                    <BillingAddressSingle
                      key={addres.id}
                      address={addres}
                      handleChange={() => {
                        setCheckoutDetails((prev) => {
                          return {
                            ...prev,
                            address_id: addres.id,
                          };
                        });
                      }}
                      handleManage={() => {
                        openModal({
                          content: (
                            <ManageAddressModal
                              id={addres.id}
                              initVal={{
                                ...addres,
                                country_id: {
                                  label: addres?.country || "",
                                  value: addres.country_id,
                                },

                                state_id: {
                                  label: addres?.state || "",
                                  value: addres.state_id,
                                },
                              }}
                              isAdd={false}
                              handleDelete={async () => {
                                const response = await deleteAddress(addres.id);
                                if (!response.error) {
                                  toast.success("Address deleted successfully");
                                  dispatch(deleteallAddress(addres.id));
                                  closeModal();
                                  closeModal();
                                } else {
                                  toast.error("Failed to delete address");
                                }
                              }}
                            />
                          ),
                        });
                      }}
                      isSelected={addres.id === checkoutDetails.address_id}
                    />
                  );
                })
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-14 w-14 animate-spin rounded-full border-8 border-gray-300 border-t-blue-600" />
                </div>
              )}
              {!isLoading && (
                <div
                  className="cursor-pointer text-blue-500 underline hover:text-blue-600"
                  onClick={() => {
                    openModal({
                      content: (
                        <ManageAddressModal
                          initVal={{
                            id: null,
                            first_name: "",
                            last_name: "",
                            phone_number: "",
                            title: "",
                            address: "",
                            city: "",
                            state_id: null,
                            country_id: null,
                            postal_code: "",
                          }}
                          isAdd={true}
                          allAddresses={allAddresses.allAddress}
                        />
                      ),
                    });
                  }}
                >
                  Add new address
                </div>
              )}
            </div>
          </>
        )}
        {wholeCart.currentStep === 2 && (
          <CardManagement
            checkoutDetails={checkoutDetails}
            setCheckoutDetails={setCheckoutDetails}
          />
        )}
        <div className="flex justify-end">
          <ButtonPrimary
            label={wholeCart.currentStep === 2 ? "Confirm" : "Next"}
            className="rounded-md"
            onClick={async () => {
              if (wholeCart.currentStep === 1) {
                setCurrentStep(wholeCart.currentStep + 1);
              }
              if (wholeCart.currentStep === 2) {
                setIsSubmiting(true);
                const _checkoutDetails: {
                  charity_ids: number[];
                  campaign_ids: number[];
                  contact_email: string;
                  email_consent: boolean;
                  address_id: number;
                  token: string | null;
                } = {
                  ...checkoutDetails,
                  campaign_ids: checkoutDetails.campaign_ids.map((item) =>
                    Number(item.value),
                  ),
                  charity_ids: checkoutDetails.charity_ids.map((item) =>
                    Number(item.value),
                  ),
                };
                if (!stripe || !elements) {
                  toast.error("Stripe is not ready yet");
                  setIsSubmiting(false);
                  return;
                }
                if (_checkoutDetails.token === "-1") {
                  const cardNumber = elements.getElement(CardNumberElement);
                  if (cardNumber) {
                    const result = await stripe.createToken(cardNumber);
                    if (result.error) {
                      toast.error(result.error.message);
                      setIsSubmiting(false);
                      return;
                    }
                    _checkoutDetails.token = result.token?.id;
                  }
                }
                const response = await chargePayement(_checkoutDetails);
                if (!response.error) {
                  toast.success(response.data.message);
                  clearCart();
                  setIsSubmiting(false);
                  router.push("/cart/thank-you");
                } else {
                  toast.error(response.data.message || "Payment failed");
                }
                setIsSubmiting(false);
              }
            }}
            disabled={
              (wholeCart.currentStep === 1 &&
                !address.some(
                  (item) => item.id === checkoutDetails.address_id,
                )) ||
              (wholeCart.currentStep === 2 && !checkoutDetails.token) ||
              isSubmiting
            }
          />
        </div>
      </div>
      {isSubmiting && <Loader />}
    </div>
  );
};

export default Checkout;

const CardManagement = ({
  checkoutDetails,
  setCheckoutDetails,
}: {
  checkoutDetails: ICheckoutDetails;
  setCheckoutDetails: React.Dispatch<React.SetStateAction<ICheckoutDetails>>;
}) => {
  const [paymentCards, setPaymentCards] = useState<IPaymentsMethods[]>([]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentsMethodsClient();
      if (!response.error) {
        setPaymentCards(response.data.data);
      }
    })();
  }, []);

  const handleCardSelection = (cardId: string) => {
    setCheckoutDetails((prev) => ({ ...prev, token: cardId }));
  };

  return (
    <div>
      <Heading varient={"xl"} content={"Select payment method"} required />
      <div className="max-h-[43vh] scrollbar">
        {paymentCards &&
          paymentCards?.map((card) => (
            <CardManagementSingle
              key={card.id}
              card={card}
              selectedCardId={checkoutDetails.token}
              onCardSelect={handleCardSelection}
            />
          ))}
        <div className="rounded-lg shadow-md">
          <div className="rounded-lg border border-borders_color bg-white p-8">
            {checkoutDetails.token !== "-1" ? (
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={checkoutDetails.token === "-1"}
                  onChange={() => handleCardSelection("-1")}
                  className="mr-2"
                />
                Debit/Credit Card
              </label>
            ) : (
              <div>
                <h1 className="mb-4 text-2xl font-bold">Add New Card</h1>
                <div className="mb-4">
                  <label
                    htmlFor="card-number"
                    className="mb-2 block text-gray-700"
                  >
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
                  <label
                    htmlFor="card-expiry"
                    className="mb-2 block text-gray-700"
                  >
                    Expiry
                  </label>
                  <CardExpiryElement
                    id="card-expiry"
                    className="w-full rounded border border-borders_color p-2"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="card-cvc"
                    className="mb-2 block text-gray-700"
                  >
                    CVV
                  </label>
                  <CardCvcElement
                    id="card-cvc"
                    className="w-full rounded border border-borders_color p-2"
                    options={{ placeholder: "CVV" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CardManagementSingle = ({
  card,
  selectedCardId,
  onCardSelect,
}: {
  card: IPaymentsMethods;
  selectedCardId: string | number;
  onCardSelect: (cardId: string) => void;
}) => {
  return (
    <div
      className="my-8 flex w-full flex-col gap-5 rounded-xl bg-white px-10 py-10 shadow-equally_distributed_bluish"
      key={card.id}
    >
      <label className="flex flex-1 items-center">
        <input
          type="radio"
          name="paymentMethod"
          checked={selectedCardId.toString() === card.stripe_card_id.toString()}
          onChange={() => onCardSelect(card.stripe_card_id.toString())}
          className="mr-2"
        />
        <div
          className={`flex cursor-pointer items-center gap-2 ${
            selectedCardId.toString() === card.stripe_card_id.toString()
              ? "text-links_color"
              : "text-black"
          }`}
        >
          <FontAwesomeIcon
            className="cursor-pointer"
            icon={faCreditCard}
            size="sm"
          />
          <div className="flex justify-between">
            {card.brand} XXXX XXXX XXXX {card.last4}
          </div>
        </div>
      </label>
    </div>
  );
};
