import { IMerchantInitState } from "@/components/merchant/MyAccount/ManageBusinessInfo";
import { IInitStoreState } from "@/components/merchant/MyAccount/ManageStoreProfile";
import {
  IBankDetails,
  IMerchantPersonalProfile,
  IStripeDetails,
} from "@/components/merchant/MyAccount/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

interface IInitialState {
  bank: {
    bankDetails: IBankDetails;
    init: boolean;
  };
  stripe: {
    stripeDetails: IStripeDetails;
    init: boolean;
  };
  personalProfile: {
    personalProfileDetails: IMerchantPersonalProfile;
    init: boolean;
  };
  storeProfile: {
    storeProfileDetails: IInitStoreState;
    init: boolean;
  };
  businessInfo: {
    businessInfoDetails: IMerchantInitState;
    init: boolean;
  };
  profileImage: {
    profileImg: string | null;
    init: boolean;
  };
}

const initialState: IInitialState = {
  bank: {
    bankDetails: {
      account_name: "",
      account_number: "",
      bank_name: "",
      branch_address: "",
      confirm_account_number: "",
      ifsc_code: "",
    },
    init: false,
  },
  personalProfile: {
    personalProfileDetails: {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      profile_image: null,
    },
    init: false,
  },
  storeProfile: {
    storeProfileDetails: {
      about_store: "",
      description: "",
      facebook: "",
      linkedin: "",
      feature_image: null,
      gallery: [],
      logo: null,
      name: "",
      twitter: "",
    },
    init: false,
  },
  businessInfo: {
    businessInfoDetails: {
      business_number: "",
      files: [],
      selling_duration: "",
      sku_count: "",
      yearly_revenue: "",
      category_ids: [],
      country_id: null,
      type: null,
      state_id: null,
      charity_support: "",
      address_line_1: "",
      address_line_2: "",
      postal_code: "",
      city: "",
      business_name: "",
      initialFiles: [],
      remove_doc: [],
    },
    init: false,
  },
  stripe: {
    stripeDetails: {
      account_id: "",
      account_name: "",
      id: null,
    },
    init: false,
  },
  profileImage: {
    profileImg: null,
    init: false,
  },
};

export const merchantInfoSlice = createSlice({
  name: "merchantBankInfo",
  initialState,
  reducers: {
    setMerchantPersonalInfo: (
      state,
      action: PayloadAction<IInitialState["personalProfile"]>,
    ) => {
      state.personalProfile = action.payload;
    },
    updateMerchantPersonalInfo: (
      state,
      action: PayloadAction<IMerchantPersonalProfile>,
    ) => {
      state.personalProfile.personalProfileDetails = action.payload;
    },
    setMerchantBankInfo: (
      state,
      action: PayloadAction<IInitialState["bank"]>,
    ) => {
      state.bank = action.payload;
    },
    updateMerchantBankInfo: (state, action: PayloadAction<IBankDetails>) => {
      state.bank.bankDetails = action.payload;
    },

    setMerchantStripeInfo: (
      state,
      action: PayloadAction<IInitialState["stripe"]>,
    ) => {
      state.stripe = action.payload;
    },
    updateMerchantStripeInfo: (
      state,
      action: PayloadAction<IStripeDetails>,
    ) => {
      state.stripe.stripeDetails = action.payload;
    },

    setMerchantStoreInfo: (
      state,
      action: PayloadAction<IInitialState["storeProfile"]>,
    ) => {
      state.storeProfile = action.payload;
    },
    updateMerchantStoreInfo: (
      state,
      action: PayloadAction<IInitStoreState>,
    ) => {
      state.storeProfile.storeProfileDetails = action.payload;
    },
    setMerchantBusinessInfo: (
      state,
      action: PayloadAction<IInitialState["businessInfo"]>,
    ) => {
      state.businessInfo = action.payload;
    },
    updateMerchantBusinessInformation: (
      state,
      action: PayloadAction<IMerchantInitState>,
    ) => {
      state.businessInfo.businessInfoDetails = action.payload;
    },
    setMerchantProfileImage: (
      state,
      action: PayloadAction<IInitialState["profileImage"]>,
    ) => {
      state.profileImage = action.payload;
    },
    updateMerchantProfileImage: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.profileImage.profileImg = action.payload;
    },
  },
});

export const {
  setMerchantPersonalInfo,
  updateMerchantPersonalInfo,
  setMerchantBankInfo,
  updateMerchantBankInfo,
  setMerchantStoreInfo,
  updateMerchantStoreInfo,
  setMerchantBusinessInfo,
  updateMerchantBusinessInformation,
  setMerchantStripeInfo,
  updateMerchantStripeInfo,
  setMerchantProfileImage,
  updateMerchantProfileImage,
} = merchantInfoSlice.actions;

const merchantInfoReducer = merchantInfoSlice.reducer;
export default merchantInfoReducer;
