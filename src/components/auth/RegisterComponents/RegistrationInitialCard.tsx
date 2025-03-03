"use client";

import React, { useState } from "react";
import JoinginCategorySection, { IOptionType } from "./JoiningCategorySection";
import MerchantRegistrationForm from "./MerchantRegistrationForm";
import CharityRegistrationForm from "./CharityRegistrationForm";
import { ICategories } from "@/api/auth/types";
import { ICountries } from "@/api/common/types";
import CorporateRegistrationForm from "./CorporateRegistrationForm";
import DefaultSignUpForm from "./DefaultSignUpForm";

export const joiningReasons = [
  {
    label: "I am a merchant",
    value: "merchant",
    url: "/merchant",
  },
  {
    label: "I am a charity",
    value: "charity",
    url: "/charity",
  },
  {
    label: "I am a corporation",
    value: "corporation",
    url: "/corporation",
  },
  {
    label: "I am looking for the best deals",
    value: "default",
    url: "/default",
  },
];

const RegisterationInitialCard = ({
  countries,
  merchantCategories,
  searchParams,
}: {
  countries: ICountries[];
  merchantCategories: ICategories[];
  searchParams: string;
}) => {
  const [activeJoiningReason, setActiveJoiningReason] = useState<IOptionType>(
    joiningReasons[Number(searchParams || 3)],
  );
  const [shouldShowError, setShouldShowError] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleJoinReasonChange = (value: IOptionType[]) => {
    setActiveJoiningReason(value[0]);
    handleCurrentStepChange(1);
  };
  const handleCurrentStepChange = (val: number) => {
    setCurrentStep(val < 1 ? 1 : val);
  };
  return (
    <div
      className={`flex h-full flex-col rounded-xl bg-white p-5 shadow-equally_distributed_bluish`}
    >
      <div>
        <h2 className="text-lg  font-bold md:text-xl">
          What best describes why you&apos;re joining Charitag?
        </h2>
        <JoinginCategorySection
          initialOptions={[activeJoiningReason]}
          categories={joiningReasons}
          handleChange={handleJoinReasonChange}
          max={1}
        />
      </div>

      {activeJoiningReason?.value === "merchant" && (
        <MerchantRegistrationForm
          currentStep={currentStep}
          handleCurrentStepChange={handleCurrentStepChange}
          activeJoiningReason={activeJoiningReason}
          merchatCategories={merchantCategories.map((item) => ({
            label: item.title,
            value: item.id,
          }))}
          countries={countries}
        />
      )}
      {activeJoiningReason?.value === "charity" && (
        <CharityRegistrationForm
          activeJoiningReason={activeJoiningReason}
          currentStep={currentStep}
          handleCurrentStepChange={handleCurrentStepChange}
          countries={countries}
        />
      )}
      {activeJoiningReason?.value === "corporation" && (
        <CorporateRegistrationForm
          activeJoiningReason={activeJoiningReason}
          currentStep={currentStep}
          handleCurrentStepChange={handleCurrentStepChange}
          countries={countries}
        />
      )}
      {activeJoiningReason?.value === "default" && (
        <DefaultSignUpForm
          currentStep={currentStep}
          handleCurrentStepChange={handleCurrentStepChange}
          activeJoiningReason={activeJoiningReason}
        />
      )}
    </div>
  );
};

export default RegisterationInitialCard;
