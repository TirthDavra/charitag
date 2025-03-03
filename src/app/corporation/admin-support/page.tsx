import { getSupportRequestsLists } from "@/api/common/adminSupport";
import AdminSupportTable from "@/components/common/adminSupport/AdminSupportTable";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Title from "@/components/merchant/Title";
import Link from "next/link";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { page: string; search: string };
}) => {
  const requestData = await getSupportRequestsLists({
    per_page: 10,
    page: Number(searchParams?.page || 1),
    search: searchParams?.search || "",
  });

  return (
    <div>
      <Title label="Support" />
      <div className="py-4">
        <div className="text-[18px] font-[500] text-merchant_sidebar_text">
          Support
        </div>
        <div className="mt-4 inline-block flex-wrap items-center justify-between text-sm xl:flex">
          <div>
            <div className="h-[34px]">
              <span className="text-merchant_sidebar_text">All (0) |</span>{" "}
              <span className="text-merchant_text_color_blue">
                Open <span className="text-merchant_sidebar_text">(0) |</span>
              </span>{" "}
              <span className="text-merchant_text_color_blue">
                Closed <span className="text-merchant_sidebar_text">(0)</span>
              </span>{" "}
            </div>
            <div className="pb-2">
              <Link href={"/corporation/admin-support/create-request"}>
                <ButtonPrimary
                  label="Create"
                  className="ml-1 h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                  classNameLabel="text-[13px] font-normal"
                />
              </Link>
            </div>
          </div>
          <TableSearch label="Search Support" />
        </div>
        <TablePagination
          className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
          itemsPerPage={10}
          totalItems={0}
        />
        {/* <MerchantAdminSupportTable data={requestData?.data || []} /> */}
        <AdminSupportTable
          data={requestData?.data || []}
          userType="corporation"
        />
        <TablePagination
          className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
          itemsPerPage={10}
          totalItems={0}
        />
      </div>
    </div>
  );
};

export default page;
