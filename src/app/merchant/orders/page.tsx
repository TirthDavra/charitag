import { getOrderCount, getOrderList } from "@/api/merchant/merchantOrder";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Button from "@/components/merchant/Custom/Button";
import CustomTable from "@/components/merchant/Custom/Tables/CustomTable";
import TableFilters from "@/components/merchant/Custom/Tables/TableFilters";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import {
  IOrder,
  columns,
} from "@/components/merchant/Order/OrderTable/OrderColumnDef";

import Title from "@/components/merchant/Title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import React from "react";

const Orders = async (context: {
  searchParams?: {
    id?: string;
    search?: string;
    sort_field?: string;
    sort_order?: string;
    page?: string;
    per_page?: number;
    status?: string;
  };
}) => {
  const orderList = await getOrderList({
    search: context.searchParams?.search || "",
    sort_field: context.searchParams?.sort_field || "",
    sort_order: context.searchParams?.sort_order || "",
    page: Number(context.searchParams?.page) || 1,
    per_page: 10,
    status: context.searchParams?.status || "",
  });

  return (
    <div>
      <Title label="Orders" />
      <div className="pt-4">
        <div className="text-[18px] font-[500] text-merchant_sidebar_text">
          Orders
        </div>
        <div className="mt-4 inline-block h-[34px] flex-wrap items-center justify-between text-sm md:flex">
          <div>
            <span className="text-merchant_sidebar_text">
              {" "}
              All <span>({orderList?.total}) </span>{" "}
            </span>
          </div>
          <div>
            <TableSearch label="Search Orders" />
          </div>
        </div>
        <div className="mt-[10px] flex flex-wrap items-center justify-between pt-[10px] md:pt-0">
          <TableFilters
            filterSelections={[
              {
                queryParam: "status",
                selectItems: [
                  { name: "Completed", value: "1" },
                  { name: "Processing", value: "2" },
                  { name: "Pending payment", value: "3" },
                  { name: " On hold", value: "4" },
                  { name: "Refunded", value: "5" },
                  { name: " Failed", value: "6" },
                ],
                triggerName: "All Status",
                defaultValue: context.searchParams?.status,
              },
            ]}
          />
          <TablePagination
            totalItems={orderList.total}
            itemsPerPage={10}
            className="flex items-center justify-end gap-[5px] pt-5 text-[12px]"
          />
        </div>
        <CustomTable columns={columns} data={orderList.data} />

        <TablePagination
          totalItems={orderList.total}
          itemsPerPage={10}
          className="flex items-center justify-end gap-[5px] pt-5 text-[12px]"
        />
      </div>
    </div>
  );
};

export default Orders;
