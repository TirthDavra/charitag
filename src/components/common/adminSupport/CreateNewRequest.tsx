"use client";
import React, { ChangeEvent, useState } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import { createNewSupport } from "@/api/charity/charitysupportCounts";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateNewRequest = ({
  userType,
  redirectUrl,
}: {
  userType: string;
  redirectUrl: string;
}) => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState({ title: "", description: "" });
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateRequest = async () => {
    let hasError = false;
    let newErrors = { title: "", description: "" };

    if (formData.title.trim() === "") {
      newErrors.title = "Title is required.";
      hasError = true;
    }

    if (formData.description.trim() === "") {
      newErrors.description = "Description is required.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      const response = await createNewSupport({
        data: { ...formData },
      });
      if (!response.error) {
        toast.success("Request created successfully");
        router.push(redirectUrl);
        router.refresh();
      } else {
        toast.error(response.data.message);
      }
      // Handle the submission logic here
    }
  };

  return (
    <div className="pt-5">
      <div className="grid grid-cols-1 gap-y-3 md:grid-cols-[170px,1fr] md:gap-y-5">
        <div>
          <span className="text-sm font-medium text-merchant_sidebar_text">
            Enter Title
          </span>
        </div>
        <div>
          <CustomInputField
            inputPlaceholder="Enter title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
            styleInput={{ resize: "none" }}
            classNameWrapper="pt-[5px]"
            className="!py-2 !text-[13px]"
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
        </div>

        <div>
          <span className="text-sm font-medium text-merchant_sidebar_text">
            Enter Description
          </span>
        </div>
        <div>
          <CustomInputField
            inputPlaceholder="Enter description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            classNameContainer="max-w-[457px] rounded-sm border-merchant_border"
            styleInput={{ resize: "none" }}
            classNameWrapper="pt-[5px]"
            className="!py-2 !text-[13px]"
            textArea={true}
            textAreaRows={2}
            textPlaceholder="!text-[13px]"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>
        <div />
        <ButtonPrimary
          label="Send"
          className="my-5 flex justify-center rounded-sm py-2"
          classNameLabel="text-[13px] font-normal"
          onClick={handleCreateRequest}
        />
      </div>
    </div>
  );
};

export default CreateNewRequest;
