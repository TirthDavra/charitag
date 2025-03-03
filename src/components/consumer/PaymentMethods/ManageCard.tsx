"use client";
import { deletePaymentsMethods } from "@/api/consumer/paymentsMethods";
import Link from "next/link";
import { toast } from "react-toastify";

const ManageCard = ({ id }: { id: number }) => {
  const handleDelete = async (id: number) => {
    const response = await deletePaymentsMethods(id);
    if (!response.error) {
      toast.success("Payment method deleted successfully.");
    } else {
      toast.error("Failed to delete payment method.");
    }
  };
  const handleEdit = (id: number) => {};
  return (
    <div className="flex items-center gap-4">
      <Link
        href={`/consumer/payments-methods/manage?id=${id}`}
        className="text-sidebar_icon_color underline"
        // onClick={() => handleEdit(id)}
      >
        Edit
      </Link>

      <button
        className="text-sidebar_icon_color underline"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ManageCard;
