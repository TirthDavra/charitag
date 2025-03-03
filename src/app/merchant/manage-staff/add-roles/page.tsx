import React from "react";
import Title from "@/components/merchant/Title";
import Link from "next/link";
import AddOrEditRoles from "@/components/merchant/ManageStaff/ManageRoles/AddOrEditRoles";
import { getMerchantRolesById } from "@/api/merchant/merchantManageStaff";

const AddRoles = async (context: {
  searchParams: { roles?: string; rolesId?: string };
}) => {
  const response = await getMerchantRolesById(
    context.searchParams?.rolesId ?? "",
  );

  return (
    <div>
      <div>
        <Title label="Manage staff" />
        <div className="pt-4">
          <div className="flex gap-[10px] divide-x divide-[#2F2F35] pb-[35px]">
            <Link href={"/merchant/manage-staff/?roles=true"}>
              <div
                className={`text-sm font-normal ${context.searchParams.roles === "false" ? "text-merchant_text_color_blue " : "text-merchant_sidebar_text"}`}
              >
                Roles
              </div>
            </Link>
            <Link href={"/merchant/manage-staff/?roles=false"}>
              <div
                className={`pl-[10px] text-sm font-normal ${context.searchParams.roles === "false" ? "text-merchant_sidebar_text" : "text-merchant_text_color_blue"} `}
              >
                Members
              </div>
            </Link>
          </div>
        </div>
        <AddOrEditRoles
          initialState={{
            name: response.data.data.name || "",
            id: context.searchParams.rolesId,
          }}
        />
      </div>
    </div>
  );
};

export default AddRoles;
