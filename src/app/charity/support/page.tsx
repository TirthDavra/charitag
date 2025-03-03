import {
  getCharitySupport,
  getCharitySupportCount,
} from "@/api/charity/charitysupportCounts";
import { CharitySupportColumn } from "@/components/charity/Support/CharitySupportColumn";
import CreateNewRequest from "@/components/charity/Support/CreateNewRequest";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import CustomTable from "@/components/merchant/Custom/Tables/CustomTable";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Title from "@/components/merchant/Title";
import Link from "next/link";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    sort_field?: string;
    sort_order?: string;
    page?: string;
    per_page?: string;
  };
}) => {
  const supportCounts = await getCharitySupportCount();

  const supportData = await getCharitySupport({
    search: searchParams?.search || "",
    sort_field: searchParams?.sort_field || "",
    sort_order: searchParams?.sort_order || "",
    page: Number(searchParams?.page) || 0,
    per_page: 10,
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
              <span className="text-merchant_sidebar_text">
                All ({supportCounts?.data?.all_count || 0}) |
              </span>{" "}
              <span className="text-merchant_text_color_blue">
                Open{" "}
                <span className="text-merchant_sidebar_text">
                  ({supportCounts?.data?.open_count || 0}) |
                </span>
              </span>{" "}
              <span className="text-merchant_text_color_blue">
                Closed{" "}
                <span className="text-merchant_sidebar_text">
                  ({supportCounts?.data?.closed_count || 0})
                </span>
              </span>{" "}
            </div>
            <div className="pb-2">
              <Link href={"/charity/support/create-request"} >
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
          totalItems={supportData.total}
        />
        <CustomTable columns={CharitySupportColumn} data={supportData.data} />
        <TablePagination
          className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
          itemsPerPage={10}
          totalItems={supportData.total}
        />
      </div>
    </div>
  );
};

export default page;
