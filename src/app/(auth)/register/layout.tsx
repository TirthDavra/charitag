import type { Metadata } from "next";
import charitagLogo from "@images/bluish_logo.svg";

import { config } from "@fortawesome/fontawesome-svg-core";
import BeginCharitagJourneyText from "@/components/auth/RegisterComponents/BegingCharitagJourneyText";
import Image from "next/image";
import Animate from "@/components/common/Animate";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Signup",
  description: "Charitag Signup Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container">
      <div className="relative grid min-h-[calc(100vh-102px)] grid-cols-12 py-10">
        <div className="col-span-12 lg:col-span-4">
          <div className="relative z-[1]">
            <BeginCharitagJourneyText className="max-w-[438px] max-h-[450px] max-lg:pb-4 lg:h-0" />
          </div>
          <div className="absolute left-[-160px] top-12 z-0">
            <Image
              src={charitagLogo}
              alt="LogoImg"
              className="h-full"
              height={500}
              width={580}
            />
            {/* <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-white/55 "></div> */}

            {/* <div className="bg- absolute bottom-0 z-0 h-[150px] w-full" /> */}
          </div>
        </div>
        <Animate className="z-[2] col-span-12 h-full lg:col-span-8">
          {children}
        </Animate>
      </div>
    </main>
  );
}
