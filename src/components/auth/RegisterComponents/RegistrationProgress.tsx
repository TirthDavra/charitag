import ButtonPrimary from "@/components/common/ButtonPrimary";
import LinkButonPrimary from "@/components/common/LinkButtonPrimary";
import React, { useCallback } from "react";

const RegistrationProgress = ({
  maxStep,
  currentStep,
  className,
  classNameButton,
  disabled,
  saved = false,
  handleSaveReviewChange,
  disable,
}: {
  maxStep: number;
  currentStep: number;
  className?: string;
  classNameButton?: string;
  disabled?: boolean;
  saved?: boolean;
  handleSaveReviewChange?: (val: boolean) => void;
  disable?: boolean;
}) => {
  return (
    <div className={`mt-10 flex w-full items-center gap-5 ${className}`}>
      <div className="relative hidden h-[1px] flex-grow bg-blue-300 md:block">
        <div
          className={`absolute bottom-0 left-0 h-[2px] bg-blue-500`}
          style={{
            width: `${(100 / maxStep) * currentStep}%`,
          }}
        ></div>
      </div>
      {saved && currentStep === maxStep && (
        <ButtonPrimary
          className={`mt-5 flex w-full justify-center rounded-full md:mt-0 md:w-fit ${classNameButton}`}
          label="Save"
          type="button"
          onClick={() =>
            handleSaveReviewChange && handleSaveReviewChange(false)
          }
          name="save"
          disabled={disabled}
        />
      )}

      <ButtonPrimary
        label={
          currentStep !== maxStep
            ? "Continue"
            : saved
              ? "Ready for review"
              : "Join charitag"
        }
        onClick={() => handleSaveReviewChange && handleSaveReviewChange(true)}
        type={handleSaveReviewChange ? "button" : "submit"}
        name="send_review"
        className={`mt-5 flex w-full justify-center rounded-full md:mt-0 md:w-[140px] ${classNameButton}`}
        disabled={disable}
      />
    </div>
  );
};

export default RegistrationProgress;
