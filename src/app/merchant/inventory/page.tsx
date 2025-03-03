import {
  getInventoryCounts,
  getInventoryProducts,
  getMerchantInventory,
} from "@/api/merchant/merchantInventory";
import Await from "@/components/common/Await";
import CustomTable from "@/components/merchant/Custom/Tables/CustomTable";
import TableFilters from "@/components/merchant/Custom/Tables/TableFilters";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import { InventoryTable } from "@/components/merchant/Inventory/InventoryTable";
import Title from "@/components/merchant/Title";
import React, { Suspense } from "react";

const page = async (context: {
  searchParams?: {
    search?: string;
    per_page?: number;
    sort_field?: string;
    sort_order?: string;
    is_only_name?: boolean;
    page?: number;
    stock_status?: string;
  };
}) => {
  const response = getMerchantInventory({
    search: context.searchParams?.search || "",
    per_page: 10,
    sort_field: context.searchParams?.sort_field || "",
    sort_order: context.searchParams?.sort_order || "",
    page: Number(context.searchParams?.page) || 1,
    stock_status: context.searchParams?.stock_status || "",
  });

  const products = await getInventoryProducts({
    is_only_name: true,
  });

  const counts = await getInventoryCounts();
  const inventoryCounts = counts?.data?.data;

  return (
    <div>
      <Title label="Inventory" />
      <div className="py-4">
        <div className="text-[18px] font-[500] text-merchant_sidebar_text">
          Inventory
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-y-2 text-sm">
          <div>
            <span className="text-merchant_sidebar_text">
              Products ({inventoryCounts?.all_count || 0}) |
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Out of stock{" "}
              <span className="text-merchant_sidebar_text">
                ({inventoryCounts?.out_of_stock || 0}) |
              </span>
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Low stock{" "}
              <span className="text-merchant_sidebar_text">
                ({inventoryCounts?.low_stock || 0}) |
              </span>
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              In stock{" "}
              <span className="text-merchant_sidebar_text">
                ({inventoryCounts?.in_stock || 0})
              </span>
            </span>{" "}
          </div>
          <div>
            <TableSearch label="Search Inventory" />
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
          <Await promise={response}>
            {(response) => {
              return (
                <>
                  <div className="mt-[10px] flex-wrap items-center justify-between pt-[10px] sm:flex xl:pt-0">
                    <TableFilters
                      filterSelections={[
                        {
                          queryParam: "stock_status",
                          selectItems: [
                            { name: "In Stock", value: "In Stock" },
                            { name: "Out of Stock", value: "Out of Stock" },
                            { name: "Low Stock", value: "Low Stock" },
                          ],
                          triggerName: "Status",
                          defaultValue: context.searchParams?.stock_status,
                        },
                      ]}
                    />

                    <TablePagination
                      className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] xl:pt-0"
                      itemsPerPage={10}
                      totalItems={response.total}
                    />
                  </div>
                  <CustomTable
                    columns={InventoryTable}
                    data={response.data}
                    classNameBody="[&>*:first-child]:max-w-[500px]"
                  />
                  <TablePagination
                    className="flex items-center justify-end gap-[5px] pt-5 text-[12px]"
                    itemsPerPage={10}
                    totalItems={response.total}
                  />
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
