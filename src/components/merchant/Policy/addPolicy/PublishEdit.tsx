"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { PolicyContext } from "../../store/PolicyContext";
import { useRouter } from "next/navigation";
import { updatePolicyApi } from "@/api/merchant/merchantPolicy";
import { validateFormValues } from "@/utils/basicfunctions";
import { validationSchemaForpolicy } from "./PolicySchema";

interface PublishEditProps {
  policyId: number;
}

const PublishEdit = ({ policyId }: PublishEditProps) => {
  const { policyDetails } = useContext(PolicyContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const policy: any = policyDetails;
      policy.policy_type = policyDetails.policies_type; // api issue column not match

      const isValid = await validateFormValues(
        validationSchemaForpolicy,
        policy,
      );
      if (!isValid.isValid) {
        toast.error(isValid.errorMessage);
        return;
      }

      const response = await updatePolicyApi(policyId, {
        ...policyDetails,
        policy_type: Number(policyDetails.policies_type),
      });
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
      className="mt-4 !h-[34px] rounded-sm px-[13px] !shadow-none"
      classNameLabel="text-[12px] font-normal"
      onClick={handleSubmit}
      disabled={isSubmitting}
    />
  );
};

export default PublishEdit;
