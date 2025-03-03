"use client";
import { ApiResponse } from "@/api/apiConfig";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";
import ResendMailModal from "./ResendMailModal";
import { useRouter } from "next/navigation";
import { IResponseWithoutToken } from "@/api/auth/types";

const Confirm = ({
  verficationResponse,
}: {
  verficationResponse: ApiResponse<IResponseWithoutToken> | null;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (verficationResponse) {
      if (verficationResponse.error) {
        toast.error(verficationResponse.data.message);
      } else {
        toast.success(verficationResponse.data.message);
        router.replace("/login");
      }
    }
  }, []);
  const { openModal, closeModal } = useModal();
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">Welcome!</h1>
        {verficationResponse?.error ? (
          <>
            <p className="mb-4 text-gray-600">
              Your email verfiation failed please try again.
            </p>
            <span
              className="ml-1 cursor-pointer text-blue-500 hover:underline"
              onClick={() => {
                openModal({
                  content: (
                    <>
                      <ResendMailModal onClose={closeModal} />
                    </>
                  ),
                });
              }}
            >
              Resend
            </span>
            .
          </>
        ) : (
          <p className="mb-8 text-gray-600">
            Your account has been successfully verified. Welcome to our
            platform!
          </p>
        )}
      </div>
    </div>
  );
};

export default Confirm;
