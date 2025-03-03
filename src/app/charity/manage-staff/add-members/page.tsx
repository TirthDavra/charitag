import {
  getCharityMembersById,
  getCharityRoles,
} from "@/api/charity/charityManageStaff";
import AddOrEditCharityMembers from "@/components/charity/ManageStaff/ManageCharityMembers/AddOrEditCharityMembers";
import Title from "@/components/merchant/Title";
import Link from "next/link";

const AddMembers = async (context: {
  searchParams: {
    roles?: string;
    membersId?: string;
    search?: string;
    sort_field?: string;
    sort_order?: string;
    page?: string;
    per_page?: string;
  };
}) => {
  const roles = await getCharityRoles({
    search: context.searchParams?.search || "",
    sort_field: context.searchParams?.sort_field || "",
    sort_order: context.searchParams?.sort_order || "",
    page: Number(context.searchParams.page) || 0,
    per_page: 10,
  });

  const response = await getCharityMembersById(
    context.searchParams.membersId ?? "",
  );

  const members = response.data.data || {};
  const rolesIds = members.roles ? members.roles.map((item) => item.id) : [];
  const selectedId = rolesIds.length > 0 ? rolesIds[0] : "";

  return (
    <div>
      <Title label="Manage staff" />
      <div className="pt-4">
        <div className="flex gap-[10px] divide-x divide-[#2F2F35] pb-[35px]">
          <Link href={"/charity/manage-staff/?roles=true"}>
            <div
              className={`text-sm font-normal ${context.searchParams.roles === "false" ? "text-merchant_text_color_blue " : "text-merchant_sidebar_text"}`}
            >
              Roles
            </div>
          </Link>
          <Link href={"/charity/manage-staff/?roles=false"}>
            <div
              className={`pl-[10px] text-sm font-normal ${context.searchParams.roles === "false" ? "text-merchant_sidebar_text" : "text-merchant_text_color_blue"} `}
            >
              Members
            </div>
          </Link>
        </div>
      </div>
      <AddOrEditCharityMembers
        initialState={{
          first_name: members.first_name || "",
          last_name: members.last_name || "",
          email: members.email || "",
          phone: members.phone || "",
          role_id: selectedId || "",
          password: "",
          id: context.searchParams.membersId || "",
        }}
        roles={roles.data}
      />
    </div>
  );
};

export default AddMembers;
