import { getCountries } from "@/api/common/charities";
import ManageCorporateLocations, {
  IMainCorporateLocation,
} from "@/components/corporate/MyProfile/ManageCorporateLocation";
import ManageCorporateOrganization from "@/components/corporate/MyProfile/ManageCorporateOrganization";
import React from "react";

const CorporateLocation = async () => {
  const initialState: IMainCorporateLocation = {
    numberOfLocations: 0,
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    stateProvince: "",
    state_id:"",
    country_id:"",
  };

  // const response = await getCorporateOrganization();
  // if (!response.error) {
  //   initialState = response.data.user;
  // }

  const countries = await getCountries()

  return (
    <div>
      <ManageCorporateLocations initialState={initialState} countries={countries.data}/>
    </div>
  );
};

export default CorporateLocation;
