import { getConsumerSupportList } from "@/api/merchant/merchantConsumerSupport";
import ConsumerSupprtTable from "@/components/merchant/ConsumerSupport/ConsumerSupprtTable";
import TableFilters from "@/components/merchant/Custom/Tables/TableFilters";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Title from "@/components/merchant/Title";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { status: string; search: string; page: string };
}) => {
  const suppostData = await getConsumerSupportList({
    search: searchParams?.search || "",
    status: searchParams?.status || "",
    page: Number(searchParams?.page) || 1,
    per_page: 10,
  });

  return (
    <div>
      <Title label="Store Support" />
      <div className="py-4">
        <div className="text-[18px] font-[500] text-merchant_sidebar_text">
          Store Support
        </div>
        <div className="mt-4 inline-block flex-wrap items-center justify-between text-sm xl:flex">
          <div className="h-[34px]">
            <span className="text-merchant_sidebar_text">
              All
              {/* ({supportCounts?.data.all_count || 0}) | */}
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Open{" "}
              <span className="text-merchant_sidebar_text">
                {/* ({supportCounts?.data.open_count || 0}) | */}
              </span>
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Closed{" "}
              <span className="text-merchant_sidebar_text">
                {/* ({supportCounts?.data?.closed_count || 0}) */}
              </span>
            </span>{" "}
          </div>
          <TableSearch label="Search Support" />
        </div>
        <div className="mt-[10px] flex flex-wrap items-center justify-between pt-[10px] md:pt-0">
          <TableFilters
            filterSelections={[
              {
                queryParam: "status",
                selectItems: [
                  { name: "Open", value: "Open" },
                  { name: "Closed", value: "Closed" },
                ],
                triggerName: "Status",
                defaultValue: searchParams?.status,
              },
            ]}
          />
          <TablePagination
            totalItems={suppostData.total}
            itemsPerPage={10}
            className="flex items-center justify-end gap-[5px] pt-5 text-[12px]"
          />
        </div>
        <ConsumerSupprtTable data={suppostData.data} />
        <TablePagination
          className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
          itemsPerPage={10}
          totalItems={suppostData.total}
        />
      </div>
    </div>
  );
};

export default page;
