import { ICorporateOrganization } from "@/components/corporate/MyProfile/ManageCorporateOrganization";
import { CorporateProfileState } from "@/components/corporate/MyProfile/ManageCorporateProfile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticImageData } from "next/image";

interface IInitialState {
  profileImage: {
    profileImg: string | null ;
    init: boolean;
  };
  personalProfile: {
    personalProfileDetails: CorporateProfileState;
    init: boolean;
  };
  organisation: {
    organisationProfileDetails: ICorporateOrganization;
    init: boolean;
  };
}

const initialState: IInitialState = {
  profileImage: {
    profileImg: null,
    init: false,
  },
  personalProfile: {
    personalProfileDetails: {
      email: "",
      first_name: "",
      last_name: "",
      corporate_name: "",
      profile_image: null,
    },
    init: false,
  },
  organisation: {
    organisationProfileDetails: {
     fundraising_goal: "",
     date_to_achieve_goal:"",
     number_of_employees: 0,
     supporting_charities: "",
     cause: "",
     phone: "",
     email: "",
     website: "",
     
    },
    init: false,
  },
};

export const corporateInfoSlice = createSlice({
  name: "corporateInfo",
  initialState,
  reducers: {
    setCorporateProfileImage: (
      state,
      action: PayloadAction<IInitialState["profileImage"]>,
    ) => {
      state.profileImage = action.payload;
    },
    updateCorporateProfileImage: (state, action: PayloadAction<string>) => {
      state.profileImage.profileImg = action.payload;
    },
    setCorporatePersonalInfo: (
      state,
      action: PayloadAction<IInitialState["personalProfile"]>,
    ) => {
      state.personalProfile = action.payload;
    },
    updateCorporatePersonalInfo: (
      state,
      action: PayloadAction<CorporateProfileState>,
    ) => {
      state.personalProfile.personalProfileDetails = action.payload;
    },
    setCorporateOrganisationInfo: (
      state,
      action: PayloadAction<IInitialState["organisation"]>,
    ) => {
      state.organisation = action.payload;
    },
    updateCorporateOrganisationInfo: (
      state,
      action: PayloadAction<ICorporateOrganization>,
    ) => {
      state.organisation.organisationProfileDetails = action.payload;
    },
  },
});

export const {
  setCorporateProfileImage,
  updateCorporateProfileImage,
  setCorporatePersonalInfo,
  updateCorporatePersonalInfo,
  setCorporateOrganisationInfo,
  updateCorporateOrganisationInfo,
} = corporateInfoSlice.actions;

const corporateInfoReducer = corporateInfoSlice.reducer;
export default corporateInfoReducer;
