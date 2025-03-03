import { getCharityRolesById } from "@/api/charity/charityManageStaff";
import { getCorporateRolesById } from "@/api/corporation/manageCorporateStaff";
import AddOrCharityRoles from "@/components/charity/ManageStaff/ManageCharityRoles/AddOrEditCharityRoles";
import AddOrEditCorporateRoles from "@/components/corporate/ManageStaff/ManageCorporateRoles/AddOrEditCorporateRoles";
import Title from "@/components/merchant/Title";
import Link from "next/link";

const AddRole = async (context: {
  searchParams: { roles?: string; rolesId?: string };
}) => {
  const response = await getCorporateRolesById(
    context.searchParams?.rolesId ?? "",
  );

  return (
    <div>
      <Title label="Manage staff" />
      <div className="pt-4">
        <div className="flex gap-[10px] divide-x divide-[#2F2F35] pb-[35px]">
          <Link href={"/corporation/manage-staff/?roles=true"}>
            <div
              className={`text-sm font-normal ${context.searchParams.roles === "false" ? "text-merchant_text_color_blue " : "text-merchant_sidebar_text"}`}
            >
              Roles
            </div>
          </Link>
          <Link href={"/corporation/manage-staff/?roles=false"}>
            <div
              className={`pl-[10px] text-sm font-normal ${context.searchParams.roles === "false" ? "text-merchant_sidebar_text" : "text-merchant_text_color_blue"} `}
            >
              Members
            </div>
          </Link>
        </div>
      </div>
      <AddOrEditCorporateRoles
        initialState={{
          name: response.data.data.name || "",
          id: context.searchParams.rolesId,
        }}
      />
    </div>
  );
};

export default AddRole;
