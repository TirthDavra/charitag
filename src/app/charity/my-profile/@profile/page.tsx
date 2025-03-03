import { getCharityProfile } from "@/api/charity/charityProfile";
import ManageCharityProfile, {
  ICharityProfileInitialState,
} from "@/components/charity/MyProfile.tsx/ManageCharityProfile";
import React from "react";

const Profile = async () => {
  let initialState: ICharityProfileInitialState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    website: "",
    organisation_name: "",
    organisation_logo: null,
    profile_image: null,
  };

  const profileData = await getCharityProfile();
  if (!profileData.error) {
    initialState = {
      ...profileData.data.user,
      organisation_name: profileData.data.user.charity?.organisation_name || "",
      organisation_logo: profileData.data.user.charity?.organisation_logo,
      profile_image:
        process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
          profileData.data.user.profile_image?.path || "",
    };
  }

  return (
    <div>
      <ManageCharityProfile initialState={initialState} />
    </div>
  );
};

export default Profile;
