import MerchantHeader from "@/components/merchant/Header/";
import MerchantSidebar from "@/components/merchant/Sidebar/";
import { Poppins } from "next/font/google";

import React from "react";
import { headers } from "next/headers";
import { getLastEndpoint } from "@/utils/basicfunctions";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import AddMediaContextProvider from "@/components/merchant/store/AddMediaContext";
import AddMedia from "@/components/merchant/Products/addProduct/AddMedia";
import SocketConnection from "@/components/common/SocketConnection";

export const metadata: Metadata = {
  title: "Merchant",
  description: "merchant",
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
        <MerchantSidebar />
      </aside>
      <div className="float-right w-full px-5 lg:w-[calc(100%-267px)]">
        <div className="sticky top-0 z-10">
          <div className="bg-white pb-3 pt-5">
            <MerchantHeader className="" />
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
