import { ApiResponse } from "@/api/apiConfig";
import { tokenVerification } from "@/api/auth/auth";
import { IResponseWithoutToken } from "@/api/auth/types";
import Confirm from "@/components/auth/Confirm/Confirm";
import React from "react";
const page = async ({ searchParams }: { searchParams: { token: string } }) => {
  let response: ApiResponse<IResponseWithoutToken> | null = null;
  if (searchParams.token) {
    response = await tokenVerification(searchParams.token);
  }
  return <Confirm verficationResponse={response} />;
};

export default page;
