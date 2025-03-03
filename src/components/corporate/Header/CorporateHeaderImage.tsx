"use client";
import { useAppSelectorCorporation } from "@/lib/Store/hooks";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

const CorporateHeaderImage = ({
  defaultImg,
}: {
  defaultImg: string | StaticImageData;
}) => {
  const profileImage = useAppSelectorCorporation(
    (state) => state.corporateInfo,
  );
  const profileImg =
    profileImage.personalProfile.personalProfileDetails.profile_image;

  const profileImgSrc =
    typeof profileImg === "string"
      ? profileImg
      : profileImg
        ? URL.createObjectURL(profileImg)
        : defaultImg;

  return (
    <div>
      <Link href="/corporation/my-profile">
        <Image
          src={profileImgSrc}
          alt="profile"
          className="h-10 w-10 rounded-full xs:h-[44px] xs:w-[44px]"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
};

export default CorporateHeaderImage;
