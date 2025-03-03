import Animate from "@/components/common/Animate";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import ScrollFixHeaderWrapper from "@/components/common/Header/ScrollFixHeaderWrapper";
import ScrollContainer from "@/components/common/ScrollContainer";
import CartProvider from "@/components/context/CartContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Charitag Home",
  description: "Home page of charitag",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col justify-between">
        <main className="flex flex-1 flex-col overflow-x-clip">
          {/* <ScrollFixHeaderWrapper> */}
          <ScrollContainer className="left-0 right-0 z-[10] bg-[#f9fafe]/40">
            <Header className="container" />
            {/* <Header className="container absolute left-0 right-0 top-0 z-[5]" /> */}
          </ScrollContainer>
          {/* </ScrollFixHeaderWrapper> */}
          <Animate className="flex h-full flex-1 flex-col">{children}</Animate>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
