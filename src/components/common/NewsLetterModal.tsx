import React, { useState } from "react";
import newsImg from "@images/news-letter.png";
import Image from "next/image";
import Heading from "./Heading";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import ButtonPrimary from "./ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import CheckBox from "../merchant/Custom/CheckBox";
import { addEmailToNewsLetter } from "@/api/common/common";
import { toast } from "react-toastify";

const NewsLetterModal = ({
  onClose,
  reference_id,
  type,
}: {
  onClose: () => void;
  reference_id: number;
  type: number;
}) => {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");

  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    return isValid;
  };

  const handleSubscribe = async () => {
    const isEmailValid = validateEmail();
    if (!isEmailValid || !checked) {
      return;
    }

    const response = await addEmailToNewsLetter({
      email,
      reference_id,
      type,
    });

    if (response.error) {
      toast.error(response.data?.message?.email || "Failed to Subscribe");
    } else {
      toast.success("Subscribed successfully");
      onClose();
    }
  };

  const handleCheckboxChange = () => {
    setCheckboxError("");
    setChecked(!checked);
  };

  return (
    <div className="border-bottom-0 max-h-[90vh] !max-w-[650px]  overflow-auto">
      <div className="mt-12 px-[20px] sm:px-[90px]">
        {" "}
        <div className="flex items-center justify-center">
          <div className="relative flex aspect-square h-[200px] w-[200px] items-center justify-center">
            <Image src={newsImg} alt="" fill={true} />
          </div>
        </div>
        <Heading
          varient={"2xl"}
          className="text-center text-[22px] font-bold"
          content={
            "Subscribe and stay up-to-date on Charitag news, exclusive offers, and more."
          }
        />
        <div className="mt-3  w-[486px] text-center">
          <span className="text-center text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
        <div className="mb-5 mt-3 px-3">
          <CustomInputField
            inputPlaceholder="Enter your Email address"
            name="email"
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            classNameContainer={`max-w-[457px] !rounded-full border-merchant_border p-1 ${
              emailError ? "border-red-500" : ""
            }`}
            styleInput={{ resize: "none" }}
            classNameWrapper="pt-[5px]"
            className="!py-2"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
          <div className="mt-3">
            <ButtonPrimary
              disabled={!checked}
              label={"Subscribe"}
              icon={<FontAwesomeIcon icon={faEnvelope} />}
              className="flex w-full justify-center gap-3 rounded-full "
              classNameLabel="text-lg w-auto "
              onClick={handleSubscribe}
            />
          </div>
          <div>
            <div className="flex items-center">
              <label className="text-black-700 relative block">
                <input
                  type="checkbox"
                  name="consent"
                  checked={checked}
                  onChange={handleCheckboxChange}
                  className="appearance-none"
                />
                <div className="flex cursor-pointer">
                  <CheckBox
                    label=""
                    onChange={handleCheckboxChange}
                    value={checked}
                    className="pt-2"
                  />
                  <span>
                    I accept the&nbsp;
                    <a href="google.com" className="text-blue-400 underline">
                      Terms and Conditions
                    </a>
                    &nbsp;and acknowledge that I have read and understood
                    the&nbsp;
                    <a href="google.com" className="text-blue-400 underline">
                      Privacy Policy
                    </a>
                    &nbsp;.
                  </span>
                </div>
              </label>
            </div>
            {checkboxError && <p className="text-red-500">{checkboxError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterModal;
