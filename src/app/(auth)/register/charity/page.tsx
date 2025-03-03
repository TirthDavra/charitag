import { getFinalStepInformation, tokenVerification } from "@/api/auth/auth";
import { getCategories } from "@/api/auth/categories";
import { IFinalStepInformationDataCharity } from "@/api/auth/types";
import { getCountries } from "@/api/common/charities";
import { getCorporateFundraisers } from "@/api/common/corporateFundraisers";
import CharitySignUpForm, {
  ICharityFinalStep,
} from "@/components/auth/RegisterComponents/CharitySignUpForm";
import { redirect } from "next/navigation";
import React from "react";

/**
 * This page represents the charity final step page for the application.
 */
const page = async ({ searchParams }: { searchParams: { token: string } }) => {
  // if (!searchParams.token || searchParams.token === "") {
  //   redirect(`/`);
  // }

  // const varification = await tokenVerification(searchParams.token);
  const response = await getCorporateFundraisers({ is_only_name: true });
  const charityCategories = await getCategories("charity");
  const allCountries = await getCountries();

  const formattedCategories =
    charityCategories.data?.map((category) => ({
      label: category.title,
      value: category.id,
    })) || [];

  let initialValues: ICharityFinalStep = {
    registration_number: "",
    files: [],
    number_of_employees: "",
    total_donor_base: "",
    category_ids:
      formattedCategories.length > 0 ? [formattedCategories[0]] : [],
    area_id: "",
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
    company_support: "",
    send_review: false,
    remove_doc: [],
    initialFiles: [],
  };

  const charityData = await getFinalStepInformation();
  if (!charityData.error) {
    if (charityData.data.data.role === 3) {
      const info: IFinalStepInformationDataCharity = charityData.data.data;
      if (info?.category.length > 0) {
        initialValues = {
          address_line_1: info.charity.address_line_1,
          address_line_2: info.charity.address_line_2,
          area_id: info.charity.area_id?.toString() || "",
          category_ids: info.category.map((item) => ({
            label: item.name,
            value: item.id,
          })),
          city: info.charity.city,
          company_support: info.charity.company_support,
          country_id: info.charity.country_id?.toString() || "",
          email: info.charity.email,
          initialFiles: info.document.length > 0 ? info.document : [],
          // info.document.length > 0
          //   ? info.document.map((item) => ({
          //       // path: item.path,
          //       // type: item.file_type,
          //       // name: item.file_name,
          //       // id: item.id,
          //       // size: item.size,
          //       ...item,
          //     }))
          //   : [],
          files: [],
          locations: info.charity.locations,
          number_of_employees: info.charity.number_of_employees,
          phone: info.charity.phone,
          postal_code: info.charity.postal_code,
          registration_number: info.charity.registration_number,
          state_id: info.charity.state_id?.toString() || "",
          total_donor_base: info.charity.total_donor_base,
          website: info.charity.website,
          send_review: false,
          remove_doc: [],
        };
      }
    }
  }
  return (
    <div className="h-full">
      <CharitySignUpForm
        countries={allCountries.data}
        corporate={response.data}
        // varification={varification}
        searchParams={searchParams.token || ""}
        charityCategories={
          charityCategories.data &&
          charityCategories.data.map((item) => ({
            label: item.title,
            value: item.id,
          }))
        }
        initialValues={initialValues}
      />
    </div>
  );
};

export default page;
