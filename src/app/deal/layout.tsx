import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import NavOne from "@/components/common/Header/NavOne";
import NavThree from "@/components/common/Header/Navs/NavThree";
import NavTwo from "@/components/common/Header/Navs/NavTwo";
import ScrollContainer from "@/components/common/ScrollContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All deals",
  description: "All deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="layout_flex">
      <div className="sticky left-0 right-0 top-0 z-[5] bg-transparent bg-gradient-to-br from-[#dde3fa] sm:bg-gradient-to-r sm:from-[#dde3fa] sm:from-10% sm:via-[#bfc8f6] sm:via-20% sm:to-[#f9fafe] sm:to-40%">
        <ScrollContainer className="left-0 right-0 z-[10] bg-[#f9fafe]/40">
          <div className={`z-1 container my-1 flex flex-col justify-center`}>
            <Header />
          </div>
        </ScrollContainer>
        <div className="border-b-[1px] border-[#ecf0fc]" />
      </div>
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </main>
  );
}
