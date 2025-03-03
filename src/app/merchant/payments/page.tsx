import {
  getTransactions,
  getTransactionscount,
} from "@/api/merchant/merchantTransaction";
import Await from "@/components/common/Await";
import CustomTable from "@/components/merchant/Custom/Tables/CustomTable";
import TableFilters from "@/components/merchant/Custom/Tables/TableFilters";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import { PaymentsColumnDef } from "@/components/merchant/Payments/PaymentsColumnDef";
import Title from "@/components/merchant/Title";
import React, { Suspense } from "react";

const page = async (context: {
  searchParams?: {
    search?: string;
    sort_field?: string;
    sort_order?: string;
    page?: string;
    per_page?: number;
  };
}) => {
  const count = await getTransactionscount();
  const transactionsCount = count?.data?.data;
  const transactions = getTransactions({
    search: context.searchParams?.search || "",
    sort_field: context.searchParams?.sort_field || "",
    sort_order: context.searchParams?.sort_order || "",
    page: Number(context.searchParams?.page) || 1,
    per_page: 10,
  });
  return (
    <div>
      <Title label="Transactions" />
      <div className="py-4">
        <div className="text-[18px] font-medium text-merchant_sidebar_text">
          Transactions
        </div>
        <div className="mb-[30px] mt-4 inline-block h-[34px] flex-wrap items-center justify-between gap-[10px] md:flex xl:mb-0">
          <div className="!text-sm">
            <span className="text-merchant_sidebar_text">
              All ({transactionsCount?.all_count || 0}) |
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Succeeded{" "}
              <span className="text-merchant_sidebar_text">
                ({transactionsCount?.succeeded_count || 0}) |
              </span>
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Escrow{" "}
              <span className="text-merchant_sidebar_text">
                ({transactionsCount?.escrow_count || 0}) |
              </span>
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Payment{" "}
              <span className="text-merchant_sidebar_text">
                ({transactionsCount?.payment_count || 0}) |
              </span>
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Refund{" "}
              <span className="text-merchant_sidebar_text">
                ({transactionsCount?.refund_count || 0})
              </span>
            </span>{" "}
          </div>
          <div>
            <TableSearch label="Search Transactions" />
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
          <Await promise={transactions}>
            {(transactions) => {
              return (
                <>
                  <TablePagination
                    className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
                    itemsPerPage={10}
                    totalItems={transactions.total}
                  />
                  <CustomTable
                    columns={PaymentsColumnDef}
                    data={transactions.data}
                  />
                  <TablePagination
                    className="flex items-center justify-end gap-[5px] pt-5 text-[12px]"
                    itemsPerPage={10}
                    totalItems={transactions.total}
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
