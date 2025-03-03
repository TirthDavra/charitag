"use client";
import { ICharitiesForHome } from "@/api/common/types";
import { postDonationsCharity } from "@/api/consumer/my-donations";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MyDonations = ({
  charities,
  initVal,
}: {
  charities: ICharitiesForHome[];
  initVal: Option[];
}) => {
  const [donationsCharity, setDonationsCharity] = useState<Option[]>(initVal);

  const handleSave = async () => {
    const response = await postDonationsCharity(
      donationsCharity.map((item) => item.value),
    );
    if (!response.error) {
      toast.success(response.data.message);
    } else {
      toast.error("The pref charity field is required.");
    }
  };

  return (
    <div>
      <MultipleSelector
        value={donationsCharity}
        defaultOptions={charities.map((item) => ({
          label: item.charity_name,
          value: item.id.toString(),
        }))}
        placeholder="Select charity"
        maxSelected={2}
        onChange={(values) => setDonationsCharity(values)}
        className="rounded-md border-borders_color py-4 text-base"
      />
      <div className="pt-10">
        <ButtonPrimary
          label="Save preferences"
          className="h-[50px] rounded-full"
          // onClick={() => {
          //   postDonationsCharity(donationsCharity.map((item) => item.value));
          // }}

          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default MyDonations;
