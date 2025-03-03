"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Heading from "@/components/common/Heading";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import MultipleSelector, {
  MultipleSelectorRef,
  Option,
} from "@/components/ui/multiple-selector";
import { CartContext } from "@/components/context/CartContext";
import { getCampaignByCharity } from "@/api/charity/charityCampaign";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import { ICheckoutDetails } from ".";
import { ICartItem } from "@/api/user/types";
import { toast } from "react-toastify";
import { logout } from "@/lib/utils";
import Select, { MultiValue, SelectInstance } from "react-select";
import { useAppSelectorConsumer } from "@/lib/Store/hooks";
import {
  incrementCartItemQuantity,
  incrementCurrentStep,
} from "./CartOperations";

interface WelcomeBackProps {
  className?: string;
  user?: {
    first_name: string;
    last_name: string;
    email: string;
  };
  charities: Option[]; // Change the type as per your actual data structure
  handleCharityInfoChange?: (charityInfo: any) => void; // Change the type as per your actual data structure
  checkoutDetails: ICheckoutDetails;
  setCheckoutDetails: React.Dispatch<React.SetStateAction<ICheckoutDetails>>;
  cart_items: ICartItem[];
}

const validationSchema = Yup.object().shape({
  charity: Yup.array().min(1, "Please select at least one charity"),
  charityCampaigns: Yup.array().min(1, "Please select at least one campaign"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .required("Contact information is required"),
  consent: Yup.boolean().oneOf([true], "You must consent to receive deals"),
});

interface FormValues {
  charity: Option[];
  charityCampaigns: CampaignOption[];
  email: string;
  consent: boolean;
}
export interface CampaignOption extends Option {
  charity_id: string;
}
const WelcomeBack: React.FC<WelcomeBackProps> = ({
  className,
  user,
  charities,
  checkoutDetails,
  setCheckoutDetails,
  cart_items,
}) => {
  const [campaigns, setCampaigns] = useState<CampaignOption[]>([]);
  const { setCurrentStep, currentStep } = useContext(CartContext);
  const charityRef = useRef<SelectInstance<Option, true> | null>(null);
  const compaignRef = useRef<MultipleSelectorRef>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const selectedCharities = useAppSelectorConsumer(
    (state) => state.cart.cart.charity,
  );

  const handleLogout = async () => {
    logout({
      redirect: true,
      callbackUrl: "/",
    });
  };

  const formik = useFormik({
    initialValues: {
      charity:
        selectedCharities.map((item) => ({
          label: item.charity_name,
          value: item.id.toString(),
        })) || [],
      charityCampaigns: checkoutDetails.campaign_ids,
      email: checkoutDetails.contact_email,
      consent: checkoutDetails.email_consent,
    },
    enableReinitialize: true,
    onSubmit: (values: FormValues, { resetForm }) => {
      console.log("fasdfsf sdfsd sdf ads");
      if (cart_items.length < 1) {
        toast.info("Please first add items in the cart");
        return;
      }
      setCheckoutDetails((prev) => ({
        ...prev,
        campaign_ids: values.charityCampaigns,
        charity_ids: values.charity,
        contact_email: values.email,
        email_consent: values.consent,
      }));
      resetForm(); // Reset form after submission
      setCurrentStep(currentStep + 1);
      incrementCurrentStep();
    },
    validationSchema: validationSchema,
  });

  useEffect(() => {
    (async () => {
      if (checkoutDetails.charity_ids.length > 0) {
        const response = await getCampaignByCharity({
          charity_ids: checkoutDetails.charity_ids.map((item) => item.value),
        });
        if (!response.error) {
          const campaigns = response.data.data.map((campaign) => ({
            label: campaign.title,
            value: campaign.id.toString(),
            charity_id: campaign.charity_id.toString(),
          }));
          setCampaigns(campaigns);
        }
      }
    })();
  }, []);

  const handleCharityChange = async (values: MultiValue<Option>) => {
    formik.setFieldValue("charity", values);
    const selectedCharities = values.map((item) => item.value);
    const currentCharities = [...values];
    const currentCampaigns = [...formik.values.charityCampaigns];
    if (currentCharities.length >= 2) {
      charityRef.current?.blur();
    }
    const updatedCampaign = currentCampaigns.filter((item) => {
      const index = currentCharities.findIndex(
        (c) => c.value === item.charity_id,
      );
      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    });
    formik.setFieldValue("charityCampaigns", updatedCampaign);

    if (values.length > 0) {
      setLoading(true);
      const response = await getCampaignByCharity({
        charity_ids: selectedCharities,
      });

      if (!response.error) {
        setCampaigns(
          response.data.data.map((campaign) => ({
            label: campaign.title,
            value: campaign.id.toString(),
            charity_id: campaign.charity_id.toString(),
          })),
        );
      }
      setLoading(false);
    } else {
      formik.setFieldValue("charityCampaigns", []);
      setCampaigns([]);
    }
  };

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="flex justify-center lg:block"
      >
        <div
          className={`mb-8 flex w-full flex-col gap-5  rounded-xl bg-white px-10 py-10 shadow-equally_distributed_bluish  ${className}`}
        >
          <Heading content={"WelcomeBack"} varient={"4xl"} />
          <div>
            <Heading
              content={`${user?.first_name} ${user?.last_name} (${user?.email})`}
              className="font-medium"
              varient="xl"
            />

            <button
              className="font-semibold underline decoration-slate-400  decoration-2 "
              onClick={() => {
                handleLogout();
              }}
              type="button"
            >
              Logout
            </button>
          </div>
          <Heading
            content="Select which charity will receive the donation"
            className=" max-w-fit pr-3"
            required
          />
          {/* <div>
            <MultipleSelector
              value={formik.values.charity}
              defaultOptions={charities}
              onSearch={async (value) => {
                const filteredOptions = charities.filter((option) =>
                  option.label.toLowerCase().includes(value.toLowerCase()),
                );
                return filteredOptions;
              }}
              maxSelected={2}
              onMaxSelected={() => {
                toast.error("Only 2 charities can be selected");
              }}
              isOpen={charityOpen}
              triggerSearchOnFocus
              ref={charityRef}
              placeholder={"Select charities (limit 2)"}
              onChange={handleCharityChange}
              className="border-merchant_text_color_blue/50 py-3"
              hidePlaceholderWhenSelected
              loadingIndicator={
                <p className="text-center text-sm text-muted-foreground">
                  loading...
                </p>
              }
              emptyIndicator={
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  No results found.
                </p>
              }
              delay={300}
            />
            <div className="text-sm text-red-500">
              {formik.touched.charity &&
              typeof formik.errors.charity === "string"
                ? formik.errors.charity
                : ""}
            </div>
          </div> */}
          <div>
            <Select
              ref={charityRef}
              value={formik.values.charity}
              onChange={handleCharityChange}
              options={charities}
              isMulti
              classNames={{
                control: () =>
                  ` py-1 !h-[52px] !h-full !rounded-[8px] !border-merchant_text_color_blue/50 focus:!ring-0 focus:!outline-0`,
                multiValue: () =>
                  "!bg-merchant_text_color_blue !text-white hover:!bg-gray-500",
                multiValueLabel: () => "!text-white",
                multiValueRemove: () => "hover:!text-white hover:!bg-[unset]",
              }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  boxShadow: "none", // Removes the default box shadow
                  borderColor: state.isFocused ? "" : provided.borderColor, // Removes border color on focus
                  "&:hover": {
                    borderColor: "merchant_text_color_blue", // Maintain hover border color
                  },
                  "&:focus": {
                    outline: "none", // Removes the default outline on focus
                    borderColor: "merchant_text_color_blue", // Maintain border color on focus
                  },
                  padding: "0.25rem 0.5rem", // Adjust padding if needed
                  height: "52px", // Set a fixed height if required
                }),
              }}
              closeMenuOnSelect={
                formik.values.charity.length >= 2 ? true : false
              }
              isOptionDisabled={() => formik.values.charity.length >= 2}
              placeholder={"Select charities (limit 2)"}
              loadingMessage={() => "loading..."}
              noOptionsMessage={() => "No results found"}
            />
          </div>
          {/* <div>
            <MultipleSelectorV2
              value={formik.values.charity}
              defaultOptions={charities}
              onSearch={async (value) => {
                const filteredOptions = charities.filter((option) =>
                  option.label.toLowerCase().includes(value.toLowerCase()),
                );
                return filteredOptions;
              }}
              maxSelected={2}
              onMaxSelected={() => {
                toast.error("Only 2 charities can be selected");
              }}
              isOpen={charityOpen}
              triggerSearchOnFocus
              ref={charityRef}
              placeholder={"Select charities (limit 2)"}
              onChange={handleCharityChange}
              className="border-merchant_text_color_blue/50 py-3"
              hidePlaceholderWhenSelected
              loadingIndicator={
                <p className="text-center text-sm text-muted-foreground">
                  loading...
                </p>
              }
              emptyIndicator={
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  No results found.
                </p>
              }
              delay={300}
            />
            <div className="text-sm text-red-500">
              {formik.touched.charity &&
              typeof formik.errors.charity === "string"
                ? formik.errors.charity
                : ""}
            </div>
          </div> */}
          <Heading
            content="Select charity campaigns"
            className="relative pr-3"
            required
          />
          <div className="relative">
            {/* <MultipleSelector
              value={formik.values.charityCampaigns}
              options={campaigns}
              // ref={compaignRef}
              disabled={campaigns.length === 0 || isLoading}
              onSearch={async (value) => {
                const filteredOptions = campaigns.filter((option) =>
                  option.label.toLowerCase().includes(value.toLowerCase()),
                );
                return filteredOptions;
              }}
              maxSelected={2}
              triggerSearchOnFocus
              placeholder={
                formik.values.charity.length < 1
                  ? "Please select a charity first"
                  : campaigns.length === 0
                    ? "No campaigns available for this charity"
                    : "Select up to 2 campaigns"
              }
              onChange={(values) => {
                formik.setFieldValue("charityCampaigns", values);
              }}
              className={`border-merchant_text_color_blue/50 py-3`}
              hidePlaceholderWhenSelected
              loadingIndicator={
                <p className="py-2 text-center text-sm leading-10 text-muted-foreground">
                  loading...
                </p>
              }
              emptyIndicator={
                <p className="text-center text-sm leading-5 text-gray-600 dark:text-gray-400">
                  No results found.
                </p>
              }
            /> */}
            <Select
              value={formik.values.charityCampaigns}
              onChange={(values) => {
                formik.setFieldValue("charityCampaigns", values);
              }}
              options={campaigns}
              isMulti
              isOptionDisabled={() =>
                formik.values.charityCampaigns.length >= 2
              }
              isDisabled={campaigns.length === 0 || isLoading}
              classNames={{
                control: () =>
                  ` py-1 !min-h-[52px] !h-full !rounded-[8px] !border-merchant_text_color_blue/50 `,
                multiValue: () =>
                  "!bg-merchant_text_color_blue !text-white hover:!bg-gray-500",
                multiValueLabel: () => "!text-white",
                multiValueRemove: () => "hover:!text-white hover:!bg-[unset]",
              }}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  boxShadow: "none", // Removes the default box shadow
                  borderColor: state.isFocused ? "" : provided.borderColor, // Removes border color on focus
                  "&:hover": {
                    borderColor: "merchant_text_color_blue", // Maintain hover border color
                  },
                  "&:focus": {
                    outline: "none", // Removes the default outline on focus
                    borderColor: "merchant_text_color_blue", // Maintain border color on focus
                  },
                  padding: "0.25rem 0.5rem", // Adjust padding if needed
                  height: "52px", // Set a fixed height if required
                  backgroundColor: state.isDisabled
                    ? "#ffffff"
                    : provided.backgroundColor,
                }),
              }}
              placeholder={
                formik.values.charity.length < 1
                  ? "Please select a charity first"
                  : campaigns.length === 0
                    ? "No campaigns available for this charity"
                    : "Select up to 2 campaigns"
              }
              loadingMessage={() => "loading..."}
              noOptionsMessage={() => "No results found"}
            />
            {isLoading && (
              <div className="absolute bottom-0 right-12 top-0 flex items-center">
                <div className="flex h-5 w-5 animate-spin items-center justify-center  text-blue-400">
                  <FontAwesomeIcon icon={faSpinner} />
                </div>
              </div>
            )}
            <div className="text-sm text-red-500">
              {formik.touched.charityCampaigns &&
              typeof formik.errors.charityCampaigns === "string"
                ? formik.errors.charityCampaigns
                : ""}
            </div>
          </div>
          <Heading
            content="Contact information"
            className="relative pr-3"
            required
          />
          <CustomInputField
            value={formik.values.email}
            onChange={formik.handleChange}
            required
            type="email"
            name="email"
            placeholder="Enter email"
            errorMessage={
              formik.touched.email && typeof formik.errors.email === "string"
                ? formik.errors.email
                : ""
            }
          />
          <Heading
            content={`We will use your email to send you information related to this order.`}
            className="!text-[18px] font-light leading-[23px]"
            varient="xl"
          />
          <div className="flex items-center">
            <label className="text-black-700 relative block">
              <input
                type="checkbox"
                name="consent"
                checked={formik.values.consent} // Fix: Use Formik's state
                onChange={() =>
                  formik.setFieldValue("consent", !formik.values.consent)
                }
                className="appearance-none"
              />
              <div className="flex cursor-pointer items-center gap-2">
                <div
                  className={`${
                    formik.values.consent ? "bg-blue-600" : "bg-white"
                  } flex h-[25px] w-[25px] items-center justify-center rounded-sm border border-blue-200`}
                >
                  <FontAwesomeIcon icon={faCheck} className="text-white" />
                </div>
                <span>I consent to receive my deals by email.</span>
              </div>
              <div className="text-red-500">
                {formik.touched.consent &&
                typeof formik.errors.consent === "string"
                  ? formik.errors.consent
                  : ""}
              </div>
            </label>
          </div>
          <ButtonPrimary
            label="Place Order"
            className={`mt-4 w-full rounded-full text-center`}
            classNameLabel={"w-full"}
            // disabled={cart_items.length === 0}
          />
        </div>
      </form>
    </>
  );
};

export default WelcomeBack;
