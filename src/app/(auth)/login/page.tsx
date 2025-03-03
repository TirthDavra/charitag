import Login from "@/components/auth/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Charitag Signup Page",
};
/**
 * This page represents the login page for the application.
 */
const LoginPage = ({ searchParams }: { searchParams: { error: string } }) => {
  return (
    <div className="justify-center max-sm:mx-4 md:flex">
      <Login searchParams={searchParams} className="!mt-10" />
    </div>
  );
};

export default LoginPage;
