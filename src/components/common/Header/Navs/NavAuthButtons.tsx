"use client";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "../../ButtonPrimary";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CustomTooltip from "../../Tooltip";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ShowWishListNavHeart } from "./NavItemsContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { USER_ROLES } from "@/lib/userRoles";
import { getUserDetails } from "@/api/auth/auth";
import { logout } from "@/lib/utils";
import ConsumerNotificationsBell from "../ConsumerNotificationsBell";
const NavAuthButtons = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(false);

  const updateSession = async () => {
    if (session?.user?.userDetails?.account_status !== 1) {
      const response = await getUserDetails();
      if (!response.error) {
        const _updatedSession = { ...session, user: { ...session?.user } };

        if (_updatedSession.user?.userDetails) {
          _updatedSession.user.userDetails = {
            ..._updatedSession.user.userDetails,
            account_status: Number(response.data.data.account_status),
          };
          // Update session
          const newSession = await update(_updatedSession);
          return newSession;
        }
      }
      return session;
    }
    return session;
  };

  // useEffect(() => {
  //   const visibilityHandler = () => {
  //     if (document.visibilityState === "visible") {
  //       update();
  //     }
  //   };
  //   window.addEventListener("visibilitychange", visibilityHandler);
  //   return () => {
  //     window.removeEventListener("visibilitychange", visibilityHandler);
  //   };
  // }, [update]);
  return (
    <div className="hidden md:block">
      {session && (session?.user?.token || session?.user?.name) ? (
        // <Link
        //   href={`${session.user.role ? `/${session.user.role}/dashboard` : "/"}`}
        // >
        <CustomTooltip message="Dashboard">
          <button
            onClick={async () => {
              setDisabled(true); // Disable button
              try {
                const updatedSession = await updateSession();
                if (updatedSession?.user?.userDetails?.account_status === 2) {
                  toast.info(
                    "Your account is in review. Please wait for admin approval.",
                  );
                  router.push(`/register/${updatedSession?.user?.role}`);
                } else if (
                  updatedSession?.user?.userDetails?.account_status === 3
                ) {
                  toast.info("Please send your profile for admin review.");
                  router.push(`/register/${updatedSession?.user?.role}`);
                } else if (
                  updatedSession?.user?.userDetails?.account_status === 4
                ) {
                  toast.error(
                    "Please verify your email. Verification mail had been sent to your e-mail.",
                  );
                } else if (
                  updatedSession?.user?.userDetails?.account_status === 5
                ) {
                  toast.error(
                    "Your account has been rejected. Please contact admin.",
                  );
                } else if (
                  updatedSession?.user?.userDetails?.account_status === 6
                ) {
                  toast.info(
                    "Your account has been blocked. Please contact admin.",
                  );
                } else {
                  router.push(
                    updatedSession?.user?.role
                      ? `/${updatedSession.user.role}/dashboard`
                      : "/",
                  );
                }
              } finally {
                setDisabled(false); // Re-enable button after response is handled
              }
            }}
            className={`rounded-full bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 px-5 py-2 font-bold capitalize text-white shadow-sm shadow-gradient_color_2 xl:px-6 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
          >{`Hello, ${session?.user.userDetails ? session?.user.userDetails?.first_name : session.user.name}`}</button>
        </CustomTooltip>
      ) : (
        // </Link>
        <div className="flex items-center gap-5">
          <Link href="/login" className="hidden lg:block">
            <button className="whitespace-nowrap font-bold hover:underline">
              Sign in
            </button>
          </Link>
          <Link href="/register">
            <ButtonPrimary
              label="Join Charitag"
              className="h-[35px] rounded-full py-1"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavAuthButtons;

export const NavgationButton = () => {
  const { data: session, update } = useSession();
  if (!session?.user?.token || session?.user?.role === USER_ROLES.CONSUMER) {
    return (
      <>
        <ShowWishListNavHeart />
        {/* <ConsumerNotificationsBell /> */}

        <Link href="/cart/checkout" className="mt-2">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-2xl font-thin text-sidebar_icon_color"
          />
        </Link>
      </>
    );
  }
  return (
    <button
      className="cursor-pointer text-sidebar_icon_color hover:underline"
      onClick={() => {
        logout({ callbackUrl: "/login" });
      }}
      type="button"
    >
      Logout
    </button>
  );
};
