"use client";
import { IMerchantShipping } from "@/api/merchant/types";
import { useModal } from "@/components/context/ModalContext";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CustomTable from "../../Custom/Tables/CustomTable";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { deleteShippingZone } from "@/api/merchant/merchantShipping";
import { produce } from "immer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ShippingZoneTable = ({ shipping }: { shipping: IMerchantShipping[] }) => {
  const [newData, setNewData] = useState(shipping);
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  useEffect(() => {
    setNewData(shipping);
  }, [shipping]);

  const handelDelete = async (id: string, index: number) => {
    openModal({
      content: (
        <ActionContent
          cancelLabel="cancel"
          confirmLabel="confirm"
          message="Are you sure you want to delete this zone? Once it's gone, all associated data will be lost forever."
          type="question"
          onCancel={closeModal}
          onOk={async () => {
            const response = await deleteShippingZone(id);
            if (!response.error) {
              setNewData(
                produce((draft) => {
                  draft.splice(index, 1);
                }),
              );
              toast.success("Zone deleted successfully.");
              router.refresh();
            } else {
              toast.error("Zone deleted failed.");
            }
            closeModal();
          }}
        />
      ),
    });
  };

  const ShippingColumnDef: ColumnDef<IMerchantShipping>[] = [
    {
      accessorKey: "name",
      header: "Zone Name",
    },
    {
      accessorKey: "regions",
      header: "Region(S)",
    },
    {
      header: "Shipping Method(S)",
      cell: ({ cell }) => {
        return (
          <div className="flex gap-[10px]">
            {cell.row.original.is_shipping_free_shipping === 1 && (
              <div className="rounded-sm bg-merchant_Shipping_bg px-3 py-2">
                <span className="text-[11px] text-merchat_icon2">
                  {cell.row.original.is_shipping_free_shipping === 1
                    ? "Free Shipping"
                    : ""}
                </span>
              </div>
            )}
            {cell.row.original.is_shipping_flat_rate === 1 && (
              <div className="rounded-sm bg-merchant_Shipping_bg px-3 py-2">
                <span className="text-[11px] text-merchat_icon2">
                  {cell.row.original.is_shipping_flat_rate === 1
                    ? "Flate Rate"
                    : ""}
                </span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ cell }) => {
        return (
          <div className="flex gap-1">
            <Link
              href={`shipping/manage-zone?zoneId=${cell.row.original.id}`}
              className="text-merchant_text_color_blue"
              type="button"
            >
              Edit /
            </Link>
            <button
              className="text-merchant_notification"
              type="button"
              onClick={() =>
                handelDelete(cell.row.original.id.toString(), cell.row.index)
              }
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <CustomTable columns={ShippingColumnDef} data={newData} />
    </div>
  );
};

export default ShippingZoneTable;
