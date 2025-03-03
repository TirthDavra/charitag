import CustomTable from "@/components/merchant/Custom/Tables/CustomTable";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Title from "@/components/merchant/Title";
import React from "react";
import profileImg from "@images/profile4.jpeg";
import { CharityMerchantColumn } from "@/components/charity/MyMerchant/CharityMerchantColumn";

const data = [
  {
    id: "1",
    image: profileImg,
    first_name: "Hello",
    last_name: "World",
    email: "helloworld@gmail.com",
  },
  {
    id: "2",
    image: profileImg,
    first_name: "Hello",
    last_name: "World",
    email: "helloworld@gmail.com",
  },
  {
    id: "3",
    image: profileImg,
    first_name: "Hello",
    last_name: "World",
    email: "helloworld@gmail.com",
  },
];
const page = () => {
  return (
    <div>
      <Title label="My Merchant" />
      <div className="py-4">
        <div className="mt-4 flex items-center justify-between">
          <div className="max-w-[800px] ">
            <span className="text-xs text-merchant_sidebar_text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution
            </span>
          </div>
          <TableSearch label="Search Merchant" />
        </div>
        <TablePagination
          className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] md:pt-0"
          itemsPerPage={10}
          totalItems={10}
        />
      </div>
      <CustomTable columns={CharityMerchantColumn} data={data} />
      <TablePagination
        className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
        itemsPerPage={10}
        totalItems={10}
      />
    </div>
  );
};

export default page;
