"use client";
import {
  deleteCharityAddress,
  getCharityAddressById,
  makeDefaultCharityAddress,
} from "@/api/charity/charityProfile";
import { ICharityAddresses } from "@/api/charity/types";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { useModal } from "@/components/context/ModalContext";
import RadioButton from "@/components/merchant/Custom/RadioButton";
import CustomRowRender from "@/components/merchant/Custom/Tables/CustomRowRender";
import { useAppDispatch, useAppSelectorCharity } from "@/lib/Store/hooks";
import {
  deleteAddress,
  makeCharityLocationDefault,
  setCharityLocations,
  setCharityLocationsById,
  setStep,
} from "@/lib/Store/slices/charityFeatures/charityProfile/charityInfoSlice";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface DataTableProps {
  data: ICharityAddresses[];
  className?: string;
  tableHeaders?: boolean;
}

const CharityLcationstable = React.memo(
  ({ data, className, tableHeaders = true }: DataTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
      pageSize: 5,
      pageIndex: 0,
    });

    const { openModal, closeModal, updateSharedState } = useModal();

    const dispatch = useAppDispatch();

    const allLocationsInfo = useAppSelectorCharity(
      (state) => state.charityInfo,
    );

    const loactions = allLocationsInfo.charityLocations.locations;

    useEffect(() => {
      if (!allLocationsInfo.charityLocations.init) {
        dispatch(
          setCharityLocations({
            locations: data,
            init: true,
            managaeState: {
              address: "",
              city: "",
              country_id: null,
              country: "",
              id: 0,
              is_default: false,
              postal_code: "",
              state_id: null,
              state: "",
              user_id: 0,
              address2: "",
            },
            step: 1,
          }),
        );
      }
    }, [dispatch]);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
      if (sorting.length > 0) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort_field", sorting[0].id);
        params.set("sort_order", sorting[0].desc ? "desc" : "asc");
        router.push(pathname + "?" + params.toString());
      }
    }, [sorting]);

    const LocationsColumn: ColumnDef<ICharityAddresses>[] = [
      {
        accessorKey: "id",
        header: "set primary",
        cell: ({ cell }) => {
          const locationId = cell.row.original.id;
          return (
            <RadioButton
              value={locationId || ""}
              checked={cell.row.original.is_default}
              onChange={async (value) => {
                const response = await makeDefaultCharityAddress(Number(value));
                if (!response.error) {
                  dispatch(makeCharityLocationDefault({ id: Number(value) }));
                }
              }}
              classNameContaine="cursor-pointer"
            />
          );
        },
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "postal_code",
        header: "Postal Code",
      },
      {
        accessorKey: "country",
        header: "Country",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ cell }) => {
          const locationId = cell.row.original.id;
          return (
            <div className="flex cursor-pointer items-center gap-2">
              <div
                className="text-blue-600"
                onClick={async () => {
                  dispatch(setStep(2));
                  if (typeof locationId === "number") {
                    const response = await getCharityAddressById(locationId);
                    if (!response.error) {
                      const data = response.data.data;
                      dispatch(
                        setCharityLocationsById({
                          id: data.id,
                          address: data.address,
                          city: data.city,
                          postal_code: data.postal_code,
                          address2: data?.address2 || "",
                          state: data.state.id.toString(),
                          country_id: {
                            label: data.countries.name,
                            value: data.countries.id.toString(),
                          },
                          state_id: {
                            label: data.state.name,
                            value: data.state.id.toString(),
                          },
                        }),
                      );
                    }
                  }
                }}
              >
                Edit /
              </div>
              <div
                className="text-red-600"
                onClick={async () => {
                  openModal({
                    content: (
                      <ActionContent
                        type="question"
                        message="Are you sure you want to delete this address? Once it's gone, all associated data will be lost forever."
                        confirmLabel="Confirm"
                        cancelLabel="Cancel"
                        onCancel={closeModal}
                        onOk={async () => {
                          updateSharedState({
                            disabled: true,
                          });
                          const response = await deleteCharityAddress(
                            cell.row.original?.id || 0,
                          );
                          if (!response.error) {
                            toast.success("address deleted successfully.");
                            dispatch(deleteAddress(cell.row.original?.id || 0));
                          } else {
                            toast.error("address deleted failed.");
                          }
                          updateSharedState({
                            disabled: false,
                          });
                          closeModal();
                        }}
                      />
                    ),
                  });
                }}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ];

    const table = useReactTable({
      data: loactions,
      columns: LocationsColumn,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onPaginationChange: setPagination,
      manualPagination: true,
      manualSorting: true,
      enableRowSelection: true,
      state: {
        sorting,
        pagination,
      },
    });

    return (
      <div>
        <CustomRowRender
          columns={LocationsColumn}
          table={table}
          className={className}
          tableHeaders={tableHeaders}
        />
      </div>
    );
  },
);

CharityLcationstable.displayName = "CharityLcationstable";
export default CharityLcationstable;
