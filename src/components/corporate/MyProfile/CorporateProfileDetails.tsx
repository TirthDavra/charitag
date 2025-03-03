"use client";
import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconProfileEdit } from "@/components/svgIcons";
import { toast } from "react-toastify";
import {
  getPersonalProfile,
  uploadProfilePhoto,
} from "@/api/merchant/merchantAccount";
import { useSession } from "next-auth/react";
import defaultImg from "@images/user_default_img.jpg";

import {
  setCorporateProfileImage,
  updateCorporateProfileImage,
} from "@/lib/Store/slices/corporationFeatures/corporateInfoSlice";
import Loader from "@/components/common/Loader";
import { useAppDispatch, useAppSelectorCorporation } from "@/lib/Store/hooks";

const CorporateProfileDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const profileImage = useAppSelectorCorporation(
    (state) => state.corporateInfo,
  );

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      dispatch(
        updateCorporateProfileImage(URL.createObjectURL(acceptedFiles[0])),
      );
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getPersonalProfile();
        const imageUrl = response.data.user?.profile_image?.medium_path
          ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
            encodeURIComponent(
              response.data.user?.profile_image?.medium_path ?? "",
            )
          : null;
        dispatch(
          setCorporateProfileImage({ profileImg: imageUrl, init: true }),
        );
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });

  return (
    <div className="flex h-[277px] w-[326px] flex-col items-center justify-center rounded-md bg-merchant_header shadow-[4px_4px_4px_0_rgba(202,202,202,0.21)]">
      <div className="relative flex justify-center">
        {loading ? (
          <div className="flex h-[130px] w-[130px] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <Image
            alt=""
            src={
              (profileImage.profileImage.profileImg &&
                profileImage.profileImage.profileImg) ||
              defaultImg
            }
            className="h-[130px] w-[130px] rounded-full bg-white p-1"
            width={300}
            height={300}
          />
        )}
        <div
          className="absolute bottom-0 right-0 cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="h-[34px] w-[34px] rounded-full bg-white p-[10px]">
            <IconProfileEdit />
          </p>
        </div>
      </div>
      <div className="pt-5 text-center">
        <span className="tetx-[15px] font-medium text-merchant_sidebar_text">
          {session?.user?.userDetails?.first_name || ""}{" "}
          {session?.user?.userDetails?.last_name || ""}
        </span>
        <div>
          <span className="text-[13px] text-merchant_placeholder">
            {session?.user?.userDetails?.email || ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CorporateProfileDetails;
