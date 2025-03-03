import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import AuthProvider from "@/utils/SessionProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ManageModalUIProvider } from "@/components/common/ModalWrapper";
import { ModalProvider } from "@/components/context/ModalContext";
import { NoahFont } from "@/Fonts/Noah/Fonts";
import StoreProvider from "@/components/common/StoreProvider/StoreProvider";
import SocketConnection from "@/components/common/SocketConnection";
config.autoAddCss = false;

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
    <html lang="en">
      <body className={`${NoahFont.className}`} suppressHydrationWarning={true}>
        <StoreProvider>
          <AuthProvider>
            <ModalProvider>
              <ToastContainer />
              <ManageModalUIProvider>
                <SocketConnection />
                <main className="flex-1">{children}</main>
              </ManageModalUIProvider>
            </ModalProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
