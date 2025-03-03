import { getMerchantRoles } from "@/api/merchant/merchantManageStaff";
import Await from "@/components/common/Await";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import RolesTable from "@/components/merchant/ManageStaff/ManageRoles/RolesTable";
import Link from "next/link";
import React, { Suspense } from "react";

const Roles = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    sort_field?: string;
    sort_order?: string;
    page?: number;
    per_page?: number;
  };
}) => {
  const roles = getMerchantRoles({
    search: searchParams?.search || "",
    sort_field: searchParams?.sort_field || "",
    sort_order: searchParams?.sort_order || "",
    page: Number(searchParams?.page) || 0,
    per_page: 10,
  });

  return (
    <div>
      <div>
        <div className="flex items-center gap-[10px]">
          <span className="text-lg font-medium text-merchant_sidebar_text">
            Roles
          </span>
          <Link href={"manage-staff/add-roles"}>
            <ButtonPrimary
              label="Add New"
              className="rounded-sm px-[13px] py-2 !shadow-none"
              classNameLabel="text-[12px] font-normal"
            />
          </Link>
        </div>
        <div className="mt-4 items-center justify-between sm:flex">
          <div className="max-w-[800px] ">
            <span className="text-xs text-merchant_sidebar_text">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution
            </span>
          </div>
          <TableSearch label="Search Role" />
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
          <Await promise={roles}>
            {(roles) => {
              return (
                <>
                  <TablePagination
                    className="mt-[5px] flex items-center justify-end gap-[5px] text-[12px] md:pt-0"
                    itemsPerPage={10}
                    totalItems={roles?.total ?? 0}
                  />
                  <RolesTable roles={roles?.data ?? []} />
                  <TablePagination
                    className="flex items-center justify-end gap-[5px] py-5 text-[12px]   "
                    itemsPerPage={10}
                    totalItems={roles?.total ?? 0}
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

export default Roles;
