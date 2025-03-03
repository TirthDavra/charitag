import Title from "@/components/merchant/Title";
import Link from "next/link";
import CorporateRoles from "@/components/corporate/ManageStaff/ManageCorporateRoles/CorporateRole";
import CorporateMembers from "@/components/corporate/ManageStaff/ManageCorporateMembers/Corporatemembers";

const page = (context: {
  searchParams: {
    roles?: string;
    search?: string;
    sort_field?: string;
    sort_order?: string;
    page?: number;
    per_page?: number;
  };
}) => {
  return (
    <div>
      <Title label="Manage staff" />
      <div className="pt-4">
        <div className="flex gap-[10px] divide-x divide-[#2F2F35] pb-[35px]">
          <Link href={"?roles=true"}>
            <div
              className={`text-sm font-normal ${context.searchParams.roles === "false" ? "text-merchant_text_color_blue " : "text-merchant_sidebar_text"}`}
            >
              Roles
            </div>
          </Link>
          <Link href={"?roles=false"}>
            <div
              className={`pl-[10px] text-sm font-normal ${context.searchParams.roles === "false" ? "text-merchant_sidebar_text" : "text-merchant_text_color_blue"} `}
            >
              Members
            </div>
          </Link>
        </div>
      </div>
      {context.searchParams.roles === "false" ? (
        <CorporateMembers searchParams={context.searchParams} />
      ) : (
        <CorporateRoles searchParams={context.searchParams} />
      )}
    </div>
  );
};

export default page;
