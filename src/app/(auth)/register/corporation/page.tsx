import { getFinalStepInformation, tokenVerification } from "@/api/auth/auth";
import { getCategories } from "@/api/auth/categories";
import { IFinalStepInformationDataCorporate } from "@/api/auth/types";
import { getCharities } from "@/api/charity/charity";
import { getCountries } from "@/api/common/charities";
import { getCorporateCauses } from "@/api/corporation/corporateCauses";
import CorporateSignUpForm, {
  CorporateFinalStep,
} from "@/components/auth/RegisterComponents/CorporateSignUpForm";
import { convertUTCtoLocalISO } from "@/utils/basicfunctions";
import { redirect } from "next/navigation";
import React from "react";

/**
 * This page represents the corporate final step page for the application.
 */

const page = async ({ searchParams }: { searchParams: { token: string } }) => {
  const causes = await getCorporateCauses();
  const charities = await getCharities({ is_only_name: true });
  const corporateCategories = await getCategories("corporate");
  const allCountries = await getCountries();

  // if (!searchParams.token || searchParams.token === "") {
  //   redirect(`/`);
  // }

  let initialValues: CorporateFinalStep = {
    fundraising_goal: "",
    date_to_achieve_goal: "",
    number_of_employees: "",
    supporting_charities: "",
    cause: "",
    category_ids: "",
    type_id: "",
    country_id: "",
    state_id: "",
    address_line_1: "",
    address_line_2: "",
    postal_code: "",
    city: "",
    locations: "",
    phone: "",
    email: "",
    website: "",
    send_review: false,
  };

  const corporateData = await getFinalStepInformation();
  if (!corporateData.error) {
    if (corporateData.data.data?.role === 4) {
      const info: IFinalStepInformationDataCorporate = corporateData.data.data;
      if (info?.corpora && info.corpora !== null) {
        // const category_ids: string[] =
        //   JSON.parse(info.corpora.category_ids) || [];
        initialValues = {
          address_line_1: info.corpora.address_line_1,
          address_line_2: info.corpora.address_line_2,
          category_ids: info.corpora.category_ids || "",
          // category_ids.length > 0 ? category_ids[0]?.toString() : "",
          cause: info.corpora.cause,
          city: info.corpora.city,
          country_id: info.corpora.country_id?.toString() || "",
          date_to_achieve_goal: info.corpora.date_to_achieve_goal
          ? convertUTCtoLocalISO(info.corpora.date_to_achieve_goal)
          : "",
          email: info.corpora.email,
          fundraising_goal: info.corpora.fundraising_goal,
          locations: info.corpora.locations,
          number_of_employees: info.corpora.number_of_employees,
          phone: info.corpora.phone,
          postal_code: info.corpora.postal_code,
          state_id: info.corpora?.state_id || "",
          supporting_charities: info.corpora.supporting_charities,
          type_id: info.corpora.type_id?.toString() || "",
          website: info.corpora.website,
          send_review: false,
        };
      }
    }
  }
  // const response = await tokenVerification(searchParams.token);

  return (
    <div className="h-full">
      <CorporateSignUpForm
        token={searchParams.token}
        // verificationResponse={response}
        // causes={causes.data || []}
        // charities={charities.data.data || []}
        corporateCategories={corporateCategories.data}
        countries={allCountries.data}
        initialValues={initialValues}
      />
    </div>
  );
};

export default page;
