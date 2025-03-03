import { tokenVerification } from "@/api/auth/auth";
import Confirm from "@/components/auth/Confirm/Confirm";
import React from "react";

const page = async ({ searchParams }: { searchParams: { token: string } }) => {
  let response = null;
  if (searchParams.token) {
    response = await tokenVerification(searchParams.token);
  }
  return (
    <div>
      <Confirm verficationResponse={response} />
    </div>
  );
};

export default page;
