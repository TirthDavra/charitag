"use client";
import { addPromotionNotify } from "@/api/common/merchant";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import CheckBox from "@/components/merchant/Custom/CheckBox";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const NotifyPromotion = ({ id }: { id: number }) => {
  const [notify, setNotify] = useState({
    email: "",
    terms: false,
  });

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotify((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleTermsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotify((prev) => ({
      ...prev,
      terms: e.target.checked,
    }));
  };

  const handleNotify = async () => {
    const response = await addPromotionNotify({
      email: notify.email,
      reference_id: Number(id),
      type: 1,
    });
    if (!response.error) {
      toast.success(response.data.message);
    } else {
      // const errorMessage = Object.values<string>(response.data.message);
      toast.error(response.data.message);
    }
  };

  return (
    <div className="pt-[56px]">
      <span className="text-[22px] font-bold text-merchant_sidebar_text">
        Notify me when this Merchant is launching a new promotion.
      </span>
      <div className="text-lg text-merchant_sidebar_text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
      <div className="pb-4 pt-5">
        <CustomInputField
          onChange={handleEmailChange}
          value={notify.email}
          inputPlaceholder="Email address"
          classNameContainer="!rounded-full !border-[rgba(15,64,87,0.21)]"
        />
      </div>
      <div className="flex items-center gap-[10px]">
        <CheckBox value={notify.terms} label="" onChange={handleTermsChange} />
        <span>
          I accept the&nbsp;
          <Link href="google.com" className="text-blue-400 underline">
            Terms and Conditions
          </Link>
          &nbsp;and acknowledge that I have read and understood the&nbsp;
          <Link href="google.com" className="text-blue-400 underline">
            Privacy Policy
          </Link>
          &nbsp;.
        </span>
      </div>
      <div className="pt-[22px]">
        <ButtonPrimary
          label={"Notify me"}
          FWIcon={faEnvelope}
          classNameLogo="w-[16px] h-[24px]"
          className={`h-[50px] w-full justify-center rounded-full !py-0 `}
          onClick={handleNotify}
          disabled={notify.terms === false || notify.email.length < 1}
        />
      </div>
    </div>
  );
};

export default NotifyPromotion;
