"use client";
import React, { useEffect, useState } from "react";
import { IPaymentsMethods } from "./types";
import {
  cardIcons,
  PaymentMethodBrand,
  paymentMethodIconMap,
} from "../constants";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Link from "next/link";
import { deletePaymentsMethods } from "@/api/consumer/paymentsMethods";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePaymentMethod,
  setPaymentMethods,
} from "@/lib/Store/slices/consumerFeatures/paymentMethod/paymentMethodSlice";
import { useModal } from "@/components/context/ModalContext";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { useAppSelectorConsumer } from "@/lib/Store/hooks";
import Image from "next/image";

const PaymentMethods = ({
  paymentMethods,
}: {
  paymentMethods: IPaymentsMethods[];
}) => {
  const dispatch = useDispatch();
  const _allPaymentMehtods = useAppSelectorConsumer(
    (state) => state.paymentMethods,
  );
  const allPaymentMehtods = _allPaymentMehtods.allPaymentMethods;
  const { closeModal, openModal } = useModal();

  useEffect(() => {
    if (!_allPaymentMehtods.init) {
      dispatch(setPaymentMethods({ data: paymentMethods, init: true }));
    }
  }, [dispatch, paymentMethods]);

  return (
    <div className="">
      {allPaymentMehtods?.length > 0 &&
        allPaymentMehtods?.map((method, index) => {
          const IconComponent =
            paymentMethodIconMap[method.brand as PaymentMethodBrand] || null;
          return (
            <div
              key={method.id}
              className="mb-4 rounded-xl border border-merchant_border p-4 sm:overflow-x-hidden"
            >
              <div className="flex gap-2  sm:min-w-[570px]">
                {/* <div>{IconComponent && <IconComponent className="mr-2" />}</div> */}
                <div>
                  <Image
                    src={cardIcons[method.brand] || ""}
                    alt={method.brand}
                    width={50}
                    height={50}

                  />
                </div>
                <div className="flex flex-grow justify-between">
                  <div>
                    <div className="font-bold">
                      {method.brand} &bull;&bull;&bull;&bull; {method.last4}
                      {method.is_default === 1 && (
                        <span className="ml-2 bg-[#F6F8FA] px-2 py-1 text-sm">
                          Default
                        </span>
                      )}
                    </div>
                    <div>
                      Expiration date : {method.exp_month}/{method.exp_year}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* <Link
                    href={`/consumer/payments-methods/manage?id=${method.id}`}
                    className="text-sidebar_icon_color underline"
                  >
                    Edit
                  </Link> */}

                    <button
                      className="text-sidebar_icon_color underline"
                      onClick={async () =>
                        openModal({
                          content: (
                            <ActionContent
                              cancelLabel="cancel"
                              confirmLabel="confirm"
                              message="Are you sure you want to delete the payment method"
                              type="question"
                              onCancel={closeModal}
                              onOk={async () => {
                                const response = await deletePaymentsMethods(
                                  method.id,
                                );
                                if (!response.error) {
                                  toast.success(
                                    "Payment method deleted successfully.",
                                  );
                                  dispatch(deletePaymentMethod(method.id));
                                } else {
                                  toast.error(
                                    "Failed to delete payment method.",
                                  );
                                }
                                closeModal();
                              }}
                            />
                          ),
                        })
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <div className="mt-7 w-fit">
        <Link href="payments-methods/manage">
          <ButtonPrimary
            label="Add a payment method"
            className={"h-[50px] rounded-full px-[25px] py-[15px] "}
          />
        </Link>
      </div>
    </div>
  );
};

export default PaymentMethods;
