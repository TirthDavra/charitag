"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import charitagLogo from "@images/bluish_logo.svg";
import { useSession } from "next-auth/react";

const menuItems = [
  { title: "Shop", href: "/shop" },
  { title: "Our Merchants", href: "/our-merchants" },
  { title: "Our Charities", href: "/our-charities" },
  { title: "Corporate Fundraisers", href: "/corporate-fundraisers" },
];

const NavRespsiveModal = () => {
  const { data: session } = useSession();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <FontAwesomeIcon
            icon={faBars}
            className="ml-[2px] mt-[9px] w-[24px] cursor-pointer text-2xl font-thin text-[#3969E0] xl:!hidden"
          />
        </SheetTrigger>
        <SheetContent
          className="h-full w-[max-content] !border-none p-4 focus:border-none xl:!hidden"
          overlayClassName="xl:hidden"
        >
          <SheetClose className="focus:ring-0" />
          <SheetHeader>
            <div className="items-cente flex p-4">
              <div className="relative">
                <div className="absolute left-[-30px] top-[230px] z-[-5] ">
                  <div className="relative h-[500px] w-[300px]">
                    <Image
                      src={charitagLogo}
                      alt=""
                      className="object-cover"
                      fill={true}
                    />
                  </div>
                </div>
              </div>
              <Link
                href="/"
                className="flex h-[45px] min-w-[180px] cursor-pointer pr-4 md:pr-0"
              >
                <div>
                  <Image
                    src={"/images/charitag_new_logo.webp"}
                    width={195}
                    height={45}
                    alt="Logo"
                  />
                </div>
              </Link>
            </div>
          </SheetHeader>
          <ul className="p-4 text-center">
            {!session?.user.token ? (
              <>
                <li className="py-2">
                  <Link
                    href={"/login"}
                    className="font-medium hover:font-bold hover:text-links_color hover:underline lg:hidden"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="py-2 md:py-0">
                  <Link
                    href={"/register"}
                    className="font-medium hover:font-bold hover:text-links_color hover:underline md:hidden"
                  >
                    Join Charitag
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li
                  className={`${
                    session?.user.token ? "max-sm:py-2" : ""
                  } hover:rounded-lg`}
                >
                  <Link
                    href={`/${session.user.role}/dashboard`}
                    className="font-medium hover:font-bold hover:text-links_color hover:underline md:hidden"
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
            {menuItems.map((item, index) => (
              <li key={index} className="py-2">
                <Link
                  href={item.href}
                  className="font-medium hover:font-bold hover:text-links_color hover:underline"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavRespsiveModal;
