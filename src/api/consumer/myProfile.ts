import { IProfileFormValues } from "@/components/consumer/Profile/types";
import { axiosClientCustom } from "../apiConfig";

export const updateConsumerProfile = async (data: IProfileFormValues) => {
  const response = await axiosClientCustom<{
    status: boolean;
    message: string;
  }>({
    url: "/consumer/profile/update",
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};
