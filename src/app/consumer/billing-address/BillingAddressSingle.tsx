"use client";
import { ISavedAddress } from "@/api/consumer/types";
import React from "react";

interface Props {
  address: ISavedAddress;
  isSelected: boolean;
  handleChange: () => void;
  handleManage: () => void;
}

const BillingAddressSingle = ({
  address,
  isSelected,
  handleChange,
  handleManage,
}: Props) => {
  return (
    <div key={address.id} className="mb-4 border-b border-gray-200 pb-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-grow  items-center gap-4 pl-2 hover:bg-blue-100 mr-4 rounded-lg" onClick={handleChange}>
          <input
            type="radio"
            id={`address-${address.id}`}
            name="deliveryAddress"
            value={address.id}
            checked={isSelected}
            // onChange={handleChange}
            className="mr-2"
          />
          <div className="flex items-start gap-4">
            <label htmlFor={`address-${address.id}`} className=" text-gray-600">
              <div>
                <div>
                  <strong>{address.title ? `${address.title}:` : ""}</strong>{" "}
                  {address.address}, {address.city},
                </div>
                <div>
                  {address.state}, {address.country}, {address.postal_code}
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="">
          <button onClick={handleManage} className=" text-blue-500">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingAddressSingle;
