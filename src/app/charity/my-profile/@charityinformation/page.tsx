import { chanrityInfo } from "@/api/charity/charityProfile";
import ManageCharityInformation, {
  ICharityInformationInitialState,
} from "@/components/charity/MyProfile.tsx/ManageCharityInformation";
import React from "react";

const CharityINformation = async () => {
  let initialState: ICharityInformationInitialState = {
    registration_number: "",
    files: [],
    number_of_employees: 0,
    total_donor_base: 0,
    company_support: "",
    contact_phone: "",
    email: "",
    website: "",
    initialFiles: [],
    remove_doc: [],
  };

  const charityData = await chanrityInfo();

  if (!charityData.error) {
    const info = charityData.data.data;
    initialState = {
      company_support: info.charity?.company_support || "",
      contact_phone: info.charity?.contact_phone || "",
      email: info.charity?.email || "",
      files: [],
      number_of_employees: info.charity?.number_of_employees || 0,
      registration_number: info.charity?.registration_number || "",
      total_donor_base: info.charity?.total_donor_base || 0,
      website: info.charity?.website || "",
      initialFiles: info.document.length > 0 ? info.document : [],
      remove_doc: [],
    };
  }

  return (
    <div>
      <ManageCharityInformation initialState={initialState} />
    </div>
  );
};

export default CharityINformation;
