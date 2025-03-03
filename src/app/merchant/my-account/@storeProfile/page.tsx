import React from "react";
import { getStoreProfile } from "@/api/merchant/merchantAccount";
import ManageStoreProfile, {
  IInitStoreState,
} from "@/components/merchant/MyAccount/ManageStoreProfile";

const StoreProfile = async () => {
  let initialState: IInitStoreState = {
    name: "",
    description: "",
    about_store: "",
    twitter: "",
    linkedin: "",
    facebook: "",
    feature_image: null,
    gallery: [],
    logo: null,
  };

  const response = await getStoreProfile();
  if (!response.error) {
    initialState = response.data.data;
  }

  return (
    <div>
      <ManageStoreProfile initialState={initialState} />
    </div>
  );
};

export default StoreProfile;
