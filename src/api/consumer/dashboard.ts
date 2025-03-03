import { IConsumerDashboardResponse } from "@/components/consumer/Dashboard/types";
import { customFetch } from "../apiConfig";

export const getConusmerDashboardDetails = async () => {
  const response = await customFetch<IConsumerDashboardResponse>({
    url: `/consumer/dashboard`,
  });
  return response.data;
};
