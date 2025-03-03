import { getCategories } from "@/api/auth/categories";
import { ICountries } from "@/api/common/types";
import { getMerchantBusinessInfo } from "@/api/merchant/merchantAccount";
import ManageBusinessInfo, {
  IMerchantInitState,
} from "@/components/merchant/MyAccount/ManageBusinessInfo";
import React from "react";

const BusinessInfo = async ({
  allCountries,
}: {
  allCountries: ICountries[];
}) => {
  const merchantCategories = await getCategories("merchant");

  let initialValues: IMerchantInitState = {
    business_number: "",
    files: [],
    selling_duration: "",
    sku_count: "",
    yearly_revenue: "",
    category_ids: [],
    country_id: null,
    type: null,
    state_id: null,
    charity_support: "",
    address_line_1: "",
    address_line_2: "",
    postal_code: "",
    city: "",
    business_name: "",
    initialFiles: [],
    remove_doc: [],
  };

  const response = await getMerchantBusinessInfo();

  if (!response.error) {
    const businessData = response.data.user;
    initialValues = {
      address_line_1: businessData.address_line_1,
      address_line_2: businessData.address_line_2,
      business_number: businessData.business_number,
      charity_support: businessData.charity_support,
      city: businessData.city,
      postal_code: businessData.postal_code,
      type: businessData.type,
      business_name: businessData.businessName,
      initialFiles:
        businessData.document.length > 0 ? businessData.document : [],
      files: [],
      category_ids: businessData.categories.map((item) => ({
        label: item.title,
        value: item.id.toString(),
      })),
      country_id: {
        label: businessData.country.name,
        value: businessData.country.id.toString(),
      },
      state_id: {
        label: businessData.state.name,
        value: businessData.state.id.toString(),
      },
      sku_count: businessData.sku_count.toString(),
      selling_duration: businessData.selling_duration.toString(),
      yearly_revenue: businessData.yearly_revenue.toString(),
      remove_doc: [],
    };
  }

  return (
    <div>
      <ManageBusinessInfo
        merchantCategories={
          merchantCategories?.data &&
          merchantCategories.data.map((item) => ({
            label: item.title,
            value: item.id.toString(),
          }))
        }
        initialValues={initialValues}
        allCountries={allCountries}
      />
    </div>
  );
};

export default BusinessInfo;
