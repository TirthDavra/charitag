"use client";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "@/lib/utils";
import React from "react";
import { clearCart } from "../Cart/CartOperations";

const LogoutBtn = () => {
  return (
    <div
      className={`cursor-pointer px-5 py-4`}
      onClick={() => {
        clearCart();
        logout();
      }}
    >
      <FontAwesomeIcon icon={faSignOut} className="text-blue-500" />
      <span className="whitespace-nowrap pl-[9px] font-bold">Logout</span>
    </div>
  );
};

export default LogoutBtn;
