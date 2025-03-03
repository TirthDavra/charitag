import React from "react";
import Heading from "@/components/common/Heading";
import ProfileForm from "./ProfileForm";

const ConsumerProfile = () => {
  return (
    <main className="mt-[30px] w-full">
      <div>
        <Heading
          content={"My profile"}
          className="!text-[34px] text-merchant_sidebar_text"
        />
        <p className="mt-[25px] text-gray-600">
          Find and update all your personal information here.
        </p>
        <Heading
          content={"Personal information"}
          className="py-[25px] !text-[22px] text-merchant_sidebar_text"
        />
      </div>
      <ProfileForm />
    </main>
  );
};

export default ConsumerProfile;
