"use client";
import React, { useState } from "react";
import CustomInputField from "@/components/common/CustomInputField";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { createNewSupportTicketForOrder } from "@/api/consumer/order";
import { toast } from "react-toastify";
import { parseMsg } from "@/utils/basicfunctions";
import { useRouter, useSearchParams } from "next/navigation";
import { revaldiateApi } from "@/app/action";

const SupportrRequestModal = ({
  onClose,
  order_id,
  product_id,
  request_id,
}: {
  onClose: () => void;
  order_id: string;
  product_id: number;
  request_id?: string;
}) => {
  const [request, setRequest] = useState({
    title: "",
    description: "",
  });
  const [errorMessageCategoryInput, setErrorMessageCategoryInput] =
    useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleCreate = async () => {
    if (request.title.length < 0 || request.title.length > 50) {
      setErrorMessageCategoryInput("Please add a title within a valid range!");
      return;
    } else if (
      request.description.length < 0 ||
      request.description.length > 500
    ) {
      setErrorMessageCategoryInput(
        "Please add a description within a valid range!",
      );
      return;
    }

    const response = await createNewSupportTicketForOrder({
      description: request.description,
      order_id: order_id,
      product_id: product_id,
      title: request.title,
    });
    if (!response.error) {
      toast.success(parseMsg(response.data.message));
      onClose();
      setRequest({
        title: "",
        description: "",
      });
      revaldiateApi(`get-orders-consumer-${searchParams.get("page") || 1}`);
      router.push(`/consumer/orders/${response.data.data}/support`);
    } else {
      toast.error(parseMsg(response.data.message));
    }
  };

  return (
    <div>
      <div className="flex justify-center pt-4">
        <span className="text-2xl font-bold">Create new request </span>
      </div>
      <div className="border-b-2 border-[rgba(57,105,224,0.25)] pt-[18px]" />
      <div className="flex flex-col items-center p-7">
        <CustomInputField
          label="Title"
          className="!pb-3"
          instruction="50 characters maximum"
          classNameInstruction="!mt-3"
          onChange={(value) => setRequest({ ...request, title: value })}
          value={request.title}
          backendError={errorMessageCategoryInput}
          type={""}
        />
        <CustomInputField
          label="Description"
          className="!pb-3"
          instruction="50 characters maximum"
          classNameInstruction="!mt-3"
          onChange={(value) => setRequest({ ...request, description: value })}
          value={request.description}
          backendError={errorMessageCategoryInput}
          type={""}
        />
        <ButtonPrimary
          label={"Create"}
          className={`flex !w-[290px] justify-center rounded-full px-10 py-3 max-md:mt-12`}
          onClick={handleCreate}
          disabled={request.title.length < 1 || request.description.length < 1}
        />
      </div>
    </div>
  );
};

export default SupportrRequestModal;
