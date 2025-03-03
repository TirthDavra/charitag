"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/utils";
import { ChevronDown, User, LogOut } from "lucide-react";
import Link from "next/link";

const MerchantMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <button className="hover:text-merchant_secondary flex items-center text-merchant_primary transition-colors">
          <ChevronDown className="text-merchant_primary" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-lg border border-gray-200 bg-white font-medium shadow-lg">
        <DropdownMenuItem className="flex items-center p-3 transition-colors hover:bg-gray-100">
          <User className="mr-2 text-merchant_primary" />
          <Link href="/merchant/my-account">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center p-3 transition-colors hover:bg-gray-100"
          onClick={() =>
            logout({
              callbackUrl: "/",
              redirect: true,
            })
          }
        >
          <LogOut className="mr-2 text-merchant_primary" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MerchantMenu;
