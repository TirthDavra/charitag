import {
  getMerchantDeals,
  getMerchantDealsCount,
} from "@/api/merchant/merchantDeals";
import Await from "@/components/common/Await";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import TableFilters from "@/components/merchant/Custom/Tables/TableFilters";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import DealsTable from "@/components/merchant/Deals/DealsTable";
import Title from "@/components/merchant/Title";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    status: string;
    search: string;
    sort_field: string;
    sort_order: string;
    per_page: number;
    page: number;
  };
}) => {
  const count = await getMerchantDealsCount();

  const deals = getMerchantDeals({
    page: Number(searchParams.page) || 0,
    per_page: 10,
    search: searchParams.search || "",
    sort_field: searchParams.sort_field || "",
    sort_order: searchParams.sort_order || "",
    status: searchParams.status || "",
  });

  return (
    <div>
      <div>
        <Title label="Deals" />
        <div className="py-4">
          <div className="flex items-center gap-[10px]">
            <span className="text-lg font-medium">Deals</span>
            <Link href={"deals/add-deals"}>
              <ButtonPrimary
                label="Add New"
                className="rounded-sm px-[10px] py-2 !h-[34px] !shadow-none"
                classNameLabel="text-[13px] font-normal"
              />
            </Link>
          </div>
          <div className="mt-4 inline-block flex-wrap items-center justify-between text-sm xl:flex">
            <div className="h-[34px]">
              <span className="text-merchant_sidebar_text">
                All ({count?.all_count || 0}) |
              </span>{" "}
              <span className="text-merchant_text_color_blue">
                Published{" "}
                <span className="text-merchant_sidebar_text">
                  ({count?.published_count || 0})
                </span>
              </span>
            </div>
            <div>
              <TableSearch label="Search Deals" />
            </div>
          </div>
          <Suspense
            key={Math.random()}
            fallback={
              <div className="h-[500px] animate-pulse">
                <div className="my-[13px] h-[20px] bg-gray-100"></div>
                <div className="my-[13px] h-[20px] bg-gray-100"></div>
                <div className="my-[16px] h-[113px] bg-gray-100"></div>
                <div className="my-[16px] h-[113px] bg-gray-100"></div>
                <div className="my-[16px] h-[113px] bg-gray-100"></div>
                <div className="my-[16px] h-[113px] bg-gray-100"></div>
                <div className="my-[16px] h-[113px] bg-gray-100"></div>
                <div className="my-[16px] h-[113px] bg-gray-100"></div>
                <div className="my-[16px] h-[113px] bg-gray-100"></div>
                <div className="my-[16px] h-[113px] bg-gray-100"></div>
                <div className="my-[16px] h-[113px] bg-gray-100"></div>
              </div>
            }
          >
            <Await promise={deals}>
              {(deals) => {
                return (
                  <>
                    <div className="mt-[10px] flex flex-wrap items-center justify-between pt-[10px] md:pt-0">
                      <TableFilters
                        filterSelections={[
                          {
                            queryParam: "status",
                            selectItems: [
                              { name: "In Review", value: "1" },
                              { name: "Approved", value: "2" },
                              { name: "Declined", value: "3" },
                              { name: "Published", value: "4" },
                            ],
                            triggerName: "Filter By Status",
                            defaultValue: searchParams.status,
                          },
                        ]}
                      />
                      <TablePagination
                        className="flex items-center gap-[5px] pt-[10px] text-[12px] md:pt-0"
                        itemsPerPage={10}
                        totalItems={deals?.total}
                      />
                    </div>
                    <DealsTable data={deals?.data} />
                    <TablePagination
                      className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] md:pt-[15px]"
                      itemsPerPage={10}
                      totalItems={deals?.total}
                    />
                  </>
                );
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
