import { getCorporateOrganization } from "@/api/corporation/corporateOrganization";
import ManageCorporateOrganization, {
  ICorporateOrganization,
} from "@/components/corporate/MyProfile/ManageCorporateOrganization";
import React from "react";

const CorporateOrganization = async () => {
  let initialState: ICorporateOrganization = {
    fundraising_goal: "",
    date_to_achieve_goal: "",
    number_of_employees: 0,
    supporting_charities: "",
    cause: "",
    phone: "",
    email: "",
    website: "",
  };

  const response = await getCorporateOrganization();
  if (!response.error) {
    initialState = {
      cause: response.data.data.cause,
      date_to_achieve_goal: response.data.data.date_to_achieve_goal,
      email: response.data.data.email,
      fundraising_goal: response.data.data.fundraising_goal,
      number_of_employees: response.data.data.number_of_employees,
      phone: response.data.data.phone,
      supporting_charities: response.data.data.supporting_charities,
      website: response.data.data.website,
    };
  }

  return (
    <div>
      <ManageCorporateOrganization initialState={initialState} />
    </div>
  );
};

export default CorporateOrganization;
