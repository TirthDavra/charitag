import Image from "next/image";
import SearchInput from "@/components/common/SearchInput";
import NavItems from "./NavItems";
import NavAuthButtons, { NavgationButton } from "./NavAuthButtons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NavResponsive from "./NavResponsive";
import { Suspense } from "react";
import ResponsiveProdoctFillter from "../../ProductFilter/ResponsiveProdoctFillter";
import { headers } from "next/headers";
import { auth } from "auth";
import { USER_ROLES } from "@/lib/userRoles";
import { ShowWishListNavHeart } from "./NavItemsContent";
const NavTwo = async ({
  className,
  classNameSearch,
}: {
  className?: string;
  classNameSearch?: string;
}) => {
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  const session = await auth();

  return (
    <nav className={`mt-[15px] ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="items-cente flex">
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
          <Suspense>
            <SearchInput
              redirectPath={`/shop`}
              classNameInput="placeholder:!text-black"
              searchParamKey="m_search"
              styles="md:flex hidden md:max-w-[250px] lg:max-w-full !border-[rgba(57,105,224,0.25)]"
            />
          </Suspense>
        </div>
        <div className="flex items-center gap-4">
          <NavItems />
          <NavAuthButtons />

          <NavgationButton />

          <NavResponsive />
        </div>
      </div>
      <Suspense>
        <SearchInput
          redirectPath={`/shop`}
          searchParamKey="m_search"
          classNameInput="placeholder:!text-black"
          styles={`md:hidden mt-[15px] w-full !border-[rgba(57,105,224,0.25)] ${classNameSearch}`}
        />
      </Suspense>
    </nav>
  );
};

export default NavTwo;
