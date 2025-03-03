"use client";
import { IMercahntRoles } from "@/api/merchant/types";
import { ColumnDef } from "@tanstack/react-table";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import Image from "next/image";
import Link from "next/link";
import CustomTable from "@/components/merchant/Custom/Tables/CustomTable";
import { useEffect, useState } from "react";
import { deleteMerchantRole } from "@/api/merchant/merchantManageStaff";
import { produce } from "immer";
import { toast } from "react-toastify";
import { useModal } from "@/components/context/ModalContext";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";

const CorporateRolesTable = ({ roles }: { roles: IMercahntRoles[] }) => {
  const [newData, setNewData] = useState(roles);
  const { openModal, closeModal } = useModal();
  useEffect(() => {
    setNewData(roles);
  }, [roles]);

  const handelDelete = async (id: string, index: number) => {
    openModal({
      content: (
        <ActionContent
          cancelLabel="cancel"
          confirmLabel="confirm"
          message="Are you sure you want to delete this role? Once it's gone, all associated data will be lost forever."
          type="question"
          onCancel={closeModal}
          onOk={async () => {
            const response = await deleteMerchantRole(id);
            if (!response.error) {
              setNewData(
                produce((draft) => {
                  draft.splice(index, 1);
                }),
              );
              toast.success("Role deleted successfully.");
            } else {
              toast.error("Role deleted failed.");
            }
            closeModal();
          }}
        />
      ),
    });
  };

  const RolesColumndef: ColumnDef<IMercahntRoles>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div className="flex items-center text-merchant_text_color_blue">
            Roles
            <Image
              alt=""
              src={ArrowUpDown}
              className="ml-2 h-4 w-4 cursor-pointer"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            />
          </div>
        );
      },
    },
    {
      id: "action",
      header: "Action",
      cell: ({ cell }) => {
        return (
          <div className="flex ">
            <button
              className="text-merchant_text_color_blue"
              type="button"
            >
              Permissions /
            </button>
            <Link
              href={`manage-staff/add-roles?rolesId=${cell.row.original.id}`}
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
      <CustomTable columns={RolesColumndef} data={newData} />
    </div>
  );
};

export default CorporateRolesTable;
