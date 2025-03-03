"use client";
import { useAppSelectorMerchant } from "@/lib/Store/hooks";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

const ProfileHeaderImage = ({
  defaultImg,
}: {
  defaultImg: string | StaticImageData;
}) => {
  const profileImage = useAppSelectorMerchant((state) => state.merchantInfo);
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
      <Link href="/merchant/my-account">
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

export default ProfileHeaderImage;
