"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addPolicyApi } from "@/api/merchant/merchantPolicy";
import { PolicyContext } from "../../store/PolicyContext";
import { validateFormValues } from "@/utils/basicfunctions";
import * as Yup from "yup";
import { validationSchemaForpolicy } from "./PolicySchema";

const Publish = () => {
  const { policyDetails } = useContext(PolicyContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true); // Disable the button
    try {
      const policy = policyDetails;
      const isValid = await validateFormValues(
        validationSchemaForpolicy,
        policy,
      );
      if (!isValid.isValid) {
        toast.error(isValid.errorMessage);
        return;
      }
      const response = await addPolicyApi(policy);
      if (response.error) {
        const errorMessage: string[] = Object.values<string[]>(
          response.data.message,
        )[0];
        toast.error(errorMessage[0]);
      } else {
        toast.success(response.data.message);
        router.push("/merchant/policy");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setTimeout(() => {
        setIsSubmitting(false); // Re-enable the button
      }, 1500);
    }
  };

  return (
    <ButtonPrimary
      label="Save Changes"
      className="mt-4 rounded-sm px-[13px] !shadow-none"
      classNameLabel="text-[12px] font-normal"
      onClick={handleSubmit}
      disabled={isSubmitting} // Disable the button based on isSubmitting state
    />
  );
};

export default Publish;
