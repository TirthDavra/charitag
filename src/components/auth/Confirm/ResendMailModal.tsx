import ButtonPrimary from "@/components/common/ButtonPrimary";
import Heading from "@/components/common/Heading";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import Image from "next/image";
import React, { useState } from "react";
import newsImg from "@images/news-letter.png";
import { resendEmail } from "@/api/auth/auth";
import { toast } from "react-toastify";

const ResendMailModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
    return isValid;
  };

  const handleEmail = async () => {
    const isEmailValid = validateEmail();
    if (!isEmailValid) {
      return;
    }

    // const response = await resendEmail(email);
    // if (!response.error) {
    //   toast.success(response.data.message);
    // } else {
    //   toast.success(response.data.message);
    // }
    onClose();
  };

  return (
    <div className="mt-8 flex flex-col items-center p-3">
      <div className="flex items-center justify-center">
        <div className="relative flex aspect-square h-[200px] w-[200px] items-center justify-center">
          <Image src={newsImg} alt="" fill={true} />
        </div>
      </div>
      <Heading
        varient={"2xl"}
        className="py-2 text-[22px] font-bold"
        content={"Enter your email"}
      />
      <CustomInputField
        value={email}
        onChange={(e: any) => {
          setEmail(e.target.value);
        }}
        inputPlaceholder="Email address"
        classNameWrapper="w-[90%]"
      />
      {emailError && <p className="text-red-500">{emailError}</p>}

      <ButtonPrimary
        label="Send"
        className="my-5 flex !w-[90%] justify-center rounded-lg py-2"
        onClick={handleEmail}
      />
    </div>
  );
};

export default ResendMailModal;
