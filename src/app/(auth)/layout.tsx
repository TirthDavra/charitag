import Animate from "@/components/common/Animate";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import { Metadata } from "next";
import "@axa-fr/react-toolkit-form-steps/dist/af-step-form-new.css";
import "rc-steps/assets/index.css";

export const metadata: Metadata = {
  title: "Charitag",
  description: "Charitag Login and Signup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#fafbfe]">
      <main className="flex flex-1 flex-col overflow-x-clip">
        <Header className="container" />
        <Animate className="relative flex flex-1 flex-col">{children}</Animate>
      </main>
      <Footer />
    </div>
  );
}
