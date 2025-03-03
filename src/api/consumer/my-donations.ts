import { IDonationsCharityResponse } from "@/components/consumer/MyDonations/types";
import { clientCustomFetch, customFetch } from "../apiConfig";

export const getDonationsCharity = async () => {
  const response = await customFetch<IDonationsCharityResponse>({
    url: `/donation-preferences`,
  });
  return response.data;
};

export const postDonationsCharity = async (data: string[]) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: any;
  }>({
    url: `/donation-preferences`,
    data: JSON.stringify({ pref_charity_ids: data }),
    method: "POST",
  });
  return response;
};
