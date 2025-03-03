import Title from "@/components/merchant/Title";
import Link from "next/link";
import Tax from "./@tax/page";
import Duties from "./@duties/page";

const page = (context: { searchParams: { tax: string } }) => {
  return (
    <div className="pb-10">
      <Title label="Setting" />
      <div className="py-4">
        <div className="flex gap-[10px] divide-x divide-[#2F2F35] pb-[35px]">
          <Link href={"?tax=true"}>
            <div
              className={`text-sm font-normal ${context.searchParams.tax === "false" ? "text-merchant_text_color_blue " : "text-merchant_sidebar_text"}`}
            >
              Tax
            </div>
          </Link>
          <Link href={"?tax=false"}>
            <div
              className={`pl-[10px] text-sm font-normal ${context.searchParams.tax === "false" ? "text-merchant_sidebar_text" : "text-merchant_text_color_blue"} `}
            >
              Duties
            </div>
          </Link>
        </div>
      </div>
      {context.searchParams.tax === "false" ? <Duties /> : <Tax />}
    </div>
  );
};

export default page;
