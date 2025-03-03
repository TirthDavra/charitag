import { getAllCategories } from "@/api/common/products";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import ScrollContainer from "@/components/common/ScrollContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Products",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="layout_flex">
      {/* <div className="sticky left-0 right-0 top-0 z-[5] bg-transparent bg-gradient-to-br from-[#dde3fa] sm:bg-gradient-to-r sm:from-[#dde3fa] sm:from-10% sm:via-[#bfc8f6] sm:via-20% sm:to-[#f9fafe] sm:to-40%"> */}
      <ScrollContainer className="left-0 right-0 z-[10] bg-transparent bg-gradient-to-br from-[#dde3fa] backdrop-filter-none sm:bg-gradient-to-r sm:from-[#dde3fa] sm:from-10% sm:via-[#bfc8f6] sm:via-20% sm:to-[#f9fafe] sm:to-40%">
        <div className={`z-1 container my-1 flex flex-col justify-center`}>
          <Header classNameSearch="!w-[90%] md:w-full" />
        </div>
      </ScrollContainer>
      <div className="border-b-[1px] border-[#ecf0fc]" />
      {/* </div> */}
      <main className="mt-[102px] flex-1">{children}</main>
      <Footer />
    </main>
  );
}
