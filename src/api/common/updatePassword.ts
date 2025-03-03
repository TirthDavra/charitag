import { IUpdatePasswordResponse } from "@/components/merchant/MyAccount/types";
import { axiosClientCustom } from "../apiConfig";

export const updatePassword = async (data: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => {
  const response = await axiosClientCustom<IUpdatePasswordResponse>({
    url: "/profile/update_password",
    data: JSON.stringify(data),
    method: "PUT",
  });
  return response;
};
