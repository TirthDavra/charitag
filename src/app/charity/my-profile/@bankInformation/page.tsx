import {
  getCharityBankDetails,
  getStripeDetailsCharity,
} from "@/api/charity/charityProfile";
import ManageCharityBankInfo from "@/components/charity/MyProfile.tsx/ManageCharityBankInfo";
import StripeConnectCharity from "@/components/charity/MyProfile.tsx/StripeConnectCharity";
import {
  IBankDetails,
  IStripeDetails,
} from "@/components/merchant/MyAccount/types";
import React from "react";

const BankInformation = async () => {
  let initialState: IBankDetails = {
    bank_name: "",
    ifsc_code: "",
    account_number: "",
    confirm_account_number: "",
    account_name: "",
    branch_address: "",
  };
  let initialStateStripe: IStripeDetails = {
    account_id: "",
    account_name: "",
    id: null,
  };

  const response = await getCharityBankDetails();
  const responseStripe = await getStripeDetailsCharity();

  if (!response.error) {
    initialState = {
      ...response.data.data,
      confirm_account_number: response.data.data?.account_number || "",
    };
  }
  if (!responseStripe.error) {
    initialStateStripe = {
      ...responseStripe.data.data,
    };
  }
  return (
    <div className="flex flex-col lg:gap-x-14 xl:flex-row">
      <ManageCharityBankInfo initialState={initialState} />
      <div className="text-sm capitalize leading-5 text-zinc-500 max-xl:mt-10 max-xl:grid max-xl:grid-cols-3 xl:flex xl:flex-col xl:items-center xl:justify-center">
        <div className="border-t-2 border-merchant_border border-opacity-20 max-xl:mt-2 xl:min-h-[260px] xl:border-l-[1px] " />
        <div className="my-auto flex justify-center xl:pt-14">Or</div>
        <div className="border-t-2 border-merchant_border border-opacity-20 max-xl:mt-2 xl:mt-14 xl:min-h-[260px] xl:border-l-[1px] " />
      </div>
      <StripeConnectCharity initialState={initialStateStripe} />
    </div>
  );
};

export default BankInformation;
