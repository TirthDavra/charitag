"use client";
import React from "react";
import { Button } from "../../ButtonPrimary";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/utils";

const LogoutButton = () => {
  const router = useRouter();
  return (
    <Button
      type="submit"
      className="flex w-full justify-between !px-0 !py-0 text-start font-normal"
      onClick={() => {
        logout({ redirect: false });
        router.push("/");
      }}
      label="Log out"
    />
  );
};

export default LogoutButton;
