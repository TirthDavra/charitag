"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { updateOrderStatus } from "@/api/merchant/merchantOrder";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const SelectOrderStatus = ({ status, id }: { status: number; id: number }) => {
  const [selectedStatus, setSelectedStatus] = useState(status.toString());
  const router = useRouter();
  const handleSaveChanges = async () => {
    const response = await updateOrderStatus({
      body: { order_id: id, status: Number(selectedStatus) },
    });
    if (!response.error) {
      toast.success(response.data.message);
      router.refresh();
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-[10px]">
      <Select
        value={selectedStatus}
        onValueChange={(value) => setSelectedStatus(value)}
      >
        <SelectTrigger
          classNameIcon="!text-black font-bold"
          className="h-[34px] max-w-fit rounded-md border-[1px] border-[#d9e2f9] text-[13px] text-[#828282] outline-none"
        >
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Completed</SelectItem>
          <SelectItem value="2">Processing</SelectItem>
          <SelectItem value="3">Pending payment</SelectItem>
          <SelectItem value="4">On hold</SelectItem>
          <SelectItem value="5">Refunded</SelectItem>
          <SelectItem value="6">Failed</SelectItem>
        </SelectContent>
      </Select>
      <ButtonPrimary
        label="Save Changes"
        className="rounded-md px-[13px] py-2 !shadow-none"
        classNameLabel="text-[12px] font-normal"
        onClick={handleSaveChanges}
      />
    </div>
  );
};

export default SelectOrderStatus;
