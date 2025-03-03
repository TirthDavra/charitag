import { getCharityAllAdresses } from "@/api/charity/charityProfile";
import { getCountries } from "@/api/common/charities";
import { ICountries } from "@/api/common/types";
import ManageCharityLocations, {
  IMainCharityLocation,
} from "@/components/charity/MyProfile.tsx/ManageCharityLocations";
import React from "react";

const Locations = async ({ allCountries }: { allCountries: ICountries[] }) => {
  const initialState: IMainCharityLocation = {
    address: "",
    address2: "",
    city: "",
    postal_code: "",
    state_id: null,
    country_id: null,
  };

  const respone = await getCharityAllAdresses();

  return (
    <div>
      <ManageCharityLocations
        initialState={initialState}
        locationData={respone.data}
        allCountries={allCountries}
      />
    </div>
  );
};

export default Locations;
