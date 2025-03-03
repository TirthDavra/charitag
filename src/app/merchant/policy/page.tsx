import React, { Suspense } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import PolicyTable from "@/components/merchant/Policy/PolicyTable/PolicyTable";
import Title from "@/components/merchant/Title";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import { getPolicyCount, getPolicyList } from "@/api/merchant/merchantPolicy";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Await from "@/components/common/Await";
import TableFilters from "@/components/merchant/Custom/Tables/TableFilters";
import { PolicyTypes } from "@/components/merchant/constants";

const Policy = async (context: {
  searchParams?: {
    search?: string;
    page?: string;
    per_page?: string;
    sort_field?: string;
    sort_order?: string;
    policy_type?: string;
  };
}) => {
  const policyList = getPolicyList({
    search: context.searchParams?.search || "",
    page: context.searchParams?.page?.toString() || "1",
    per_page: context.searchParams?.per_page?.toString() || "10",
    sort_field: context.searchParams?.sort_field || "",
    sort_order: context.searchParams?.sort_order || "",
    policy_type: context.searchParams?.policy_type || "",
  });

  return (
    <div>
      <Title label="Policy" />
      <div className="pt-4">
        <div className="mb-2 flex gap-[5px] text-sm font-medium items-center text-merchant_sidebar_text">
          Policy
          <Link href="/merchant/policy/add">
            <ButtonPrimary
              label="Add Policy"
              className="rounded-sm px-[10px] py-2 !h-[34px] !shadow-none"
              classNameLabel="text-[13px] font-normal"
            />
          </Link>
        </div>
        <div className="mt-4 max-w-[800px]">
          <span className="text-[12px] leading-4 text-merchant_sidebar_text">
            A shipping zone consists of the region(S) you&apos;d like to ship to
            and the shipping method(S) offered. a shopper can only be matched to
            one zone, and we&apos;ll use their shipping address to show them the
            methods available in their area.
          </span>
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
            </div>
          }
        >
          <Await promise={policyList}>
            {(policyList) => {
              return (
                <>
                  <div className="mt-4 inline-block h-[34px] flex-wrap items-center justify-between md:flex">
                    <div>
                      <span className="text-sm text-merchant_sidebar_text">
                        {" "}
                        All <span>({policyList?.length || 0}) |</span>{" "}
                      </span>
                      <span className="text-sm text-merchant_text_color_blue ">
                        Published
                      </span>{" "}
                      <span className="text-merchant_sidebar_text text-sm">
                        ({policyList?.length || 0})
                      </span>
                    </div>
                    <TableSearch label="search policy" />
                  </div>
                  <div className="mt-[10px] flex-wrap items-center justify-between pt-[10px] sm:flex md:pt-0">
                    <TableFilters
                      filterSelections={[
                        {
                          queryParam: "policy_type",
                          selectItems: PolicyTypes.map((selectedItem) => ({
                            name: selectedItem.label,
                            value: selectedItem.value,
                          })),
                          triggerName: "Types",
                          defaultValue: context.searchParams?.policy_type,
                        },
                      ]}
                    />
                    <TablePagination
                      className="flex items-center justify-end gap-[5px] pt-5 text-[12px]"
                      totalItems={policyList?.length || 0}
                      itemsPerPage={10}
                    />
                  </div>

                  <PolicyTable data={policyList ?? []} />

                  <TablePagination
                    className="flex items-center justify-end gap-[5px] pt-5 text-[12px]"
                    totalItems={policyList?.length || 0}
                    itemsPerPage={10}
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

export default Policy;
