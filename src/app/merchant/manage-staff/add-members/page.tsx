import {
  getMerchantMembersById,
  getMerchantRoles,
} from "@/api/merchant/merchantManageStaff";
import AddOrEditMembers from "@/components/merchant/ManageStaff/ManageMembers/AddOrEditMembers";
import Title from "@/components/merchant/Title";
import Link from "next/link";
import React from "react";

const AddMember = async (context: {
  searchParams: {
    roles?: string;
    membersId?: string;
    search?: string;
    sort_field?: string;
    sort_order?: string;
    page?: number;
    per_page?: number;
  };
}) => {
  const response = await getMerchantMembersById(
    context.searchParams.membersId ?? "",
  );

  const roles = await getMerchantRoles({
    search: context.searchParams?.search || "",
    sort_field: context.searchParams?.sort_field || "",
    sort_order: context.searchParams?.sort_order || "",
    page: Number(context.searchParams.page) || 0,
    per_page: 10,
  });

  const members = response.data.data || {};
  const rolesIds = members.roles ? members.roles.map((item) => item.id) : [];
  const selectedId = rolesIds.length > 0 ? rolesIds[0] : "";

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
        <AddOrEditMembers
          initialState={
            response.error
              ? {
                  first_name: "",
                  last_name: "",
                  email: "",
                  password: "",
                  phone: "",
                  role_id: "",
                }
              : {
                  first_name: members.first_name || "",
                  last_name: members.last_name || "",
                  email: members.email || "",
                  phone: members.phone || "",
                  role_id: selectedId,
                  password: "",
                  id: context.searchParams.membersId,
                }
          }
          roles={roles.data}
        />
      </div>
    </div>
  );
};

export default AddMember;
