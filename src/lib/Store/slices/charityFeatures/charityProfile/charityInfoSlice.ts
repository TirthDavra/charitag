import {
  ICharityAddressByIdData,
  ICharityAddresses,
} from "@/api/charity/types";
import { ICharityInformationInitialState } from "@/components/charity/MyProfile.tsx/ManageCharityInformation";
import { ICharityProfileInitialState } from "@/components/charity/MyProfile.tsx/ManageCharityProfile";
import {
  IBankDetails,
  IStripeDetails,
} from "@/components/merchant/MyAccount/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  personalProfile: {
    personalProfileDetails: ICharityProfileInitialState;
    init: boolean;
  };
  profileImage: {
    profileImg: string | null;
    init: boolean;
  };
  bank: {
    bankDetails: IBankDetails;
    init: boolean;
  };
  stripe: {
    stripeDetails: IStripeDetails;
    init: boolean;
  };
  charityInfo: {
    charityInfoDetails: ICharityInformationInitialState;
    init: boolean;
  };
  charityLocations: {
    locations: ICharityAddresses[];
    managaeState: ICharityAddressByIdData;
    step: 1 | 2;
    init: boolean;
  };
}

const initialState: IInitialState = {
  personalProfile: {
    personalProfileDetails: {
      email: "",
      first_name: "",
      last_name: "",
      phone: "",
      website: "",
      organisation_name: "",
      organisation_logo: null,
      profile_image: null,
    },
    init: false,
  },
  profileImage: {
    profileImg: null,
    init: false,
  },
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
  stripe: {
    stripeDetails: {
      account_id: "",
      account_name: "",
      id: null,
    },
    init: false,
  },
  charityInfo: {
    charityInfoDetails: {
      company_support: "",
      contact_phone: "",
      email: "",
      files: [],
      initialFiles: [],
      number_of_employees: 0,
      registration_number: "",
      remove_doc: [],
      total_donor_base: 0,
      website: "",
    },
    init: false,
  },
  charityLocations: {
    locations: [],
    managaeState: {
      address: "",
      city: "",
      country_id: null,
      country: "",
      id: 0,
      is_default: false,
      postal_code: "",
      state_id: null,
      state: "",
      user_id: 0,
      address2: "",
    },
    init: false,
    step: 1,
  },
};

export const charityInfoSlice = createSlice({
  name: "charityInfo",
  initialState,
  reducers: {
    setCharityPersonalInfo: (
      state,
      action: PayloadAction<IInitialState["personalProfile"]>,
    ) => {
      state.personalProfile = action.payload;
    },
    updateCharityPersonalInfo: (
      state,
      action: PayloadAction<ICharityProfileInitialState>,
    ) => {
      state.personalProfile.personalProfileDetails = action.payload;
    },

    setCharityProfileImage: (
      state,
      action: PayloadAction<IInitialState["profileImage"]>,
    ) => {
      state.profileImage = action.payload;
    },
    updateCharityProfileImage: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.profileImage.profileImg = action.payload;
    },
    setCharitytBankInfo: (
      state,
      action: PayloadAction<IInitialState["bank"]>,
    ) => {
      state.bank = action.payload;
    },
    updateCharityBankInfo: (state, action: PayloadAction<IBankDetails>) => {
      state.bank.bankDetails = action.payload;
    },

    setCharityStripeInfo: (
      state,
      action: PayloadAction<IInitialState["stripe"]>,
    ) => {
      state.stripe = action.payload;
    },
    updateCharityStripeInfo: (state, action: PayloadAction<IStripeDetails>) => {
      state.stripe.stripeDetails = action.payload;
    },
    setCharityInfo: (
      state,
      action: PayloadAction<IInitialState["charityInfo"]>,
    ) => {
      state.charityInfo = action.payload;
    },

    updateCharityInformation: (
      state,
      action: PayloadAction<ICharityInformationInitialState>,
    ) => {
      state.charityInfo.charityInfoDetails = action.payload;
    },

    setCharityLocations: (
      state,
      action: PayloadAction<IInitialState["charityLocations"]>,
    ) => {
      state.charityLocations.locations = action.payload.locations;
      state.charityLocations.init = action.payload.init;
    },
    setCharityLocationsById: (
      state,
      action: PayloadAction<ICharityAddressByIdData>,
    ) => {
      state.charityLocations.managaeState = action.payload;
    },
    makeCharityLocationDefault: (
      state,
      action: PayloadAction<{ id: number }>,
    ) => {
      const { id } = action.payload;
      state.charityLocations.locations = state.charityLocations.locations.map(
        (location) => {
          if (location.id === id) {
            return { ...location, is_default: true };
          } else if (location.is_default === true) {
            return { ...location, is_default: false };
          }
          return location;
        },
      );
    },
    addCharityLocation: (state, action: PayloadAction<ICharityAddresses>) => {
      state.charityLocations.locations.push(action.payload);
    },
    editCharityLocation: (
      state,
      action: PayloadAction<{ id: number; updatedMethod: ICharityAddresses }>,
    ) => {
      const { id, updatedMethod } = action.payload;
      state.charityLocations.locations = state.charityLocations.locations.map(
        (location) => {
          if (location.id === id) {
            return updatedMethod;
          }
          return location;
        },
      );
    },
    deleteAddress: (state, action: PayloadAction<number>) => {
      state.charityLocations.locations =
        state.charityLocations.locations.filter(
          (location) => location.id !== action.payload,
        );
    },
    setStep: (state, action: PayloadAction<1 | 2>) => {
      state.charityLocations.step = action.payload;
    },
  },
});

export const {
  setCharityPersonalInfo,
  updateCharityPersonalInfo,
  setCharityProfileImage,
  updateCharityProfileImage,
  setCharityStripeInfo,
  setCharitytBankInfo,
  updateCharityBankInfo,
  updateCharityStripeInfo,
  setCharityInfo,
  updateCharityInformation,
  addCharityLocation,
  editCharityLocation,
  setCharityLocations,
  setStep,
  setCharityLocationsById,
  deleteAddress,
  makeCharityLocationDefault,
} = charityInfoSlice.actions;

const charityInfoReducer = charityInfoSlice.reducer;
export default charityInfoReducer;
