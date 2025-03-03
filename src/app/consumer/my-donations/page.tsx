import { getAllCharities, getCharitiesForHome } from "@/api/common/charities";
import { getDonationsCharity } from "@/api/consumer/my-donations";
import MyDonations from "@/components/consumer/MyDonations";
import React from "react";
import Heading from "@/components/common/Heading";

const page = async () => {
  const charities = await getCharitiesForHome({ is_only_name: false });
  const data = await getDonationsCharity();

  return (
    <main className="mt-[30px] w-full pt-7">
      <Heading
        content={"Donation preferences"}
        className="pb-4 !text-[34px] text-[#2F2F35]"
      />
      <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad dolorem
        asperiores nostrum et magni non.
      </span>

      <Heading
        content={"Select 2 charities that will receive the donations *"}
        className="py-6 !text-2xl text-[#2F2F35]"
      />
      <MyDonations
        charities={charities.data}
        initVal={
          data?.data &&
          data.data.length > 0
            ? data?.data?.map((item) => ({
                label: item.charity_name,
                value: item.id.toString(),
              }))
            : []
        }
      />
    </main>
  );
};

export default page;
