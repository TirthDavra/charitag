import Title from "@/components/merchant/Title";
import Link from "next/link";
import CharityRoles from "@/components/charity/ManageStaff/ManageCharityRoles/CharityRoles";
import CharityMembers from "@/components/charity/ManageStaff/ManageCharityMembers/CharityMembers";

const page = ({
  searchParams,
}: {
  searchParams: {
    roles: string;
    search: string;
    sort_field: string;
    sort_order: string;
    page: string;
    per_page: string;
  };
}) => {
  return (
    <div>
      <Title label="Manage staff" />
      <div className="pt-4">
        <div className="flex gap-[10px] divide-x divide-[#2F2F35] pb-[35px]">
          <Link href={"?roles=true"}>
            <div
              className={`text-sm font-normal ${searchParams.roles === "false" ? "text-merchant_text_color_blue " : "text-merchant_sidebar_text"}`}
            >
              Roles
            </div>
          </Link>
          <Link href={"?roles=false"}>
            <div
              className={`pl-[10px] text-sm font-normal ${searchParams.roles === "false" ? "text-merchant_sidebar_text" : "text-merchant_text_color_blue"} `}
            >
              Members
            </div>
          </Link>
        </div>
      </div>
      {searchParams.roles === "false" ? (
        <CharityMembers searchParams={searchParams} />
      ) : (
        <CharityRoles searchParams={searchParams} />
      )}
    </div>
  );
};

export default page;
