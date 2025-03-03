import CorporateHeader from "@/components/corporate/Header";
import CorporateSidebar from "@/components/corporate/Sidebar";
import AddMedia from "@/components/merchant/Products/addProduct/AddMedia";
import AddMediaContextProvider from "@/components/merchant/store/AddMediaContext";
import { cn } from "@/lib/utils";
import { getLastEndpoint } from "@/utils/basicfunctions";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Corporate",
  description: "Corporate",
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-popins",
});

const layout = ({ children }: { children: React.ReactNode }) => {
  const headersList = headers();
  const PageName = getLastEndpoint(headersList.get("referer") || "");

  return (
    <main className={`gap-4 lg:flex ${poppins.className}`}>
      <aside className="sticky top-0 hidden h-full w-[247px] pl-4 lg:block">
        <CorporateSidebar />
      </aside>
      <div className="float-right w-full px-5 lg:w-[calc(100%-267px)]">
        <div className="sticky top-0 z-10">
          <div className="bg-white pb-3 pt-5">
            <CorporateHeader />
          </div>
        </div>
        <AddMediaContextProvider>
          <main className={cn("font p-1", poppins.variable)}>{children}</main>
          <AddMedia />
        </AddMediaContextProvider>
      </div>
    </main>
  );
};

export default layout;
