import { getMerchantProfile } from "@/api/merchant/merchantAccount";
import ManageProfile from "@/components/merchant/MyAccount/ManageProfile";
import {
  IMerchantPersonalProfile,
  IMerchantProfile,
} from "@/components/merchant/MyAccount/types";
import React from "react";

const PersonalProfile = async () => {
  let initialState: IMerchantPersonalProfile = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    profile_image: null,
  };

  const response = await getMerchantProfile();
  if (!response.error) {
    initialState = {
      email: response.data.user.email,
      first_name: response.data.user.first_name,
      last_name: response.data.user.last_name,
      phone: response.data.user.phone,
      profile_image: response.data.user.profile_image?.path
        ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
          response.data.user.profile_image?.path
        : null,
    };
  }

  return (
    <div>
      <ManageProfile initialState={initialState} />
    </div>
  );
};

export default PersonalProfile;
