import { getCorporateProfile } from "@/api/corporation/corporateProfile";
import ManageCorporateProfile, {
  CorporateProfileState,
} from "@/components/corporate/MyProfile/ManageCorporateProfile";
import React from "react";

const CorporateProfile = async () => {
  let initialState: CorporateProfileState = {
    first_name: "",
    last_name: "",
    email: "",
    corporate_name: "",
    profile_image: null,
  };

  const response = await getCorporateProfile();
  if (!response.error) {
    initialState = {
      email: response.data.user.email,
      first_name: response.data.user.first_name,
      last_name: response.data.user.last_name,
      corporate_name: response.data.user.corporate_name,
      profile_image:
        process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
        response.data.user.profile_image?.path || "",
    };
  }

  return (
    <div>
      <ManageCorporateProfile initialState={initialState} />
    </div>
  );
};

export default CorporateProfile;
