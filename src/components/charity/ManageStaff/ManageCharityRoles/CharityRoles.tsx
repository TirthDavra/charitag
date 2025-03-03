import { getCharityRoles } from "@/api/charity/charityManageStaff";
import CharityRolesTable from "@/components/charity/ManageStaff/ManageCharityRoles/CharityRolesTable";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Link from "next/link";

const CharityRoles = async ({
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
  const roles = await getCharityRoles({
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
          <span className="text-lg font-semibold text-merchant_sidebar_text">
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
        <div className="mt-4 flex items-center justify-between">
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
        <TablePagination
          className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] md:pt-0"
          itemsPerPage={10}
          totalItems={roles?.total}
        />
        <CharityRolesTable roles={roles?.data} />
        <TablePagination
          className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]   "
          itemsPerPage={10}
          totalItems={roles?.total}
        />
      </div>
    </div>
  );
};

export default CharityRoles;
