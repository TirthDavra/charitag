"use client";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ArrowUpDown from "@images/svg/ArrowUpDown.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { IProductslist } from "@/app/merchant/products/all/types";
import productImg from "@images/productDefault.jpg";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { colorsForInventoryStatus, colorsForProductStatus } from "../constants";
import {
  deleteProduct,
  setActiveStatus,
} from "@/api/merchant/merchantProducts";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomRowRender from "../Custom/Tables/CustomRowRender";
import { produce } from "immer";
import { toast } from "react-toastify";
import { useModal } from "@/components/context/ModalContext";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { convertUTCtoLocalISO } from "@/utils/basicfunctions";

interface DataTableProps {
  data: IProductslist[];
  className?: string;
  tableHeaders?: boolean;
}
const AllProductsTable = React.memo(
  ({ data, className, tableHeaders = true }: DataTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
      pageSize: 5,
      pageIndex: 0,
    });

    const [newData, setNewData] = useState(data);
    useEffect(() => {
      setNewData(data);
    }, [data]);
    const { openModal, closeModal } = useModal();
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
    const productsColumn: ColumnDef<IProductslist, any>[] = [
      {
        accessorKey: "feature_image",
        header: () => {
          return (
            <div>
              <FontAwesomeIcon icon={faImage} />
            </div>
          );
        },
        cell: ({ cell }) => {
          return (
            <div className="min-w-[50px]">
              <Image
                src={
                  cell.row.original.feature_image
                    ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                      cell.row.original.feature_image.thumbnail_path
                    : productImg
                }
                alt=""
                className="h-[50px] w-[50px]"
                width={500}
                height={500}
              />
            </div>
          );
        },
      },

      {
        id: "product_name",
        // accessorKey: "product_name",
        sortingFn: "alphanumeric",
        header: ({ column }) => {
          return (
            <div className="flex min-w-[300px] max-w-[300px]">
              <span className="font-normal text-merchant_text_color_blue">
                Name
              </span>
              <span className="text-merchant_text_color_blue">
                <Image
                  alt=""
                  src={ArrowUpDown}
                  className="ml-2 h-4 w-4 cursor-pointer"
                  onClick={() => column.toggleSorting()}
                />
              </span>
            </div>
          );
        },
        cell: ({ cell, row }) => {
          return (
            <div className="min-w-[300px] max-w-[300px]">
              <div>
                <span className="line-clamp-2 text-merchant_text_color_blue">
                  {cell.row.original.product_name}
                </span>
              </div>
              <div className=" mt-1 text-xs capitalize leading-4 text-red-500">
                <Link
                  href={`/shop/${cell.row.original.slug}?preview=true`}
                  className="text-zinc-500"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View preview{" "}
                </Link>
                <Link
                  href={`/merchant/products/manage/${cell.row.original.slug}`}
                  className="text-merchant_blue"
                  // rel="noopener noreferrer"
                  // target="_blank"
                >
                  / Edit /{" "}
                </Link>
                <button
                  className="text-red-500"
                  onClick={async () => {
                    openModal({
                      content: (
                        <ActionContent
                          type="info"
                          message="Are you sure you want to delete this product? Once it's gone, all associated data will be lost forever."
                          confirmLabel="Confirm"
                          cancelLabel="Cancel"
                          onCancel={closeModal}
                          onOk={async () => {
                            const response = await deleteProduct(
                              cell.row.original.id,
                            );
                            if (!response.error) {
                              setNewData(
                                produce((draft) => {
                                  draft.splice(row.index, 1);
                                }),
                              );
                              toast.success("Product deleted successfully.");
                            } else {
                              toast.error("Product deleted failed.");
                            }
                            closeModal();
                          }}
                        />
                      ),
                    });
                  }}
                >
                  {" "}
                  Delete
                </button>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "inventory.sku",
        header: ({ column }) => {
          return (
            <div className="flex">
              <span className="font-normal text-merchant_text_color_blue">
                SKU
              </span>
              <Image
                alt=""
                src={ArrowUpDown}
                className="ml-2 h-4 w-4 cursor-pointer"
                onClick={() => column.toggleSorting()}
              />
            </div>
          );
        },
      },
      {
        accessorKey: "stock_quantity",
        header: "Stock",
        cell: ({ cell }) => {
          return (
            <div>
              <span className="text-merchant_sidebar_text">
                {colorsForInventoryStatus[cell.row.original.stock_status].value}{" "}
              </span>
            </div>
          );
        },
      },

      {
        accessorKey: "price.regular_price",
        header: ({ column }) => {
          return (
            <div className="flex">
              <span className="font-normal text-merchant_text_color_blue">
                Price
              </span>
              <Image
                alt=""
                src={ArrowUpDown}
                className="ml-2 h-4 w-4 cursor-pointer"
                onClick={() => column.toggleSorting()}
              />
            </div>
          );
        },
      },
      {
        header: "Categories",
        cell: ({ cell }) => {
          return (
            <div>
              <span className="text-merchant_sidebar_text">
                {cell.row.original.category?.name || "-"}
              </span>
            </div>
          );
        },
      },

      {
        accessorKey: "created_at",
        header: ({ column }) => {
          return (
            <div className="flex min-w-[100px]">
              <span className="font-normal text-merchant_text_color_blue">
                Date
              </span>
              <Image
                alt=""
                src={ArrowUpDown}
                className="ml-2 h-4 w-4 cursor-pointer"
                onClick={() => {
                  column.toggleSorting();
                }}
              />
            </div>
          );
        },
        cell: ({ cell }) => {
          const newDate = convertUTCtoLocalISO(cell.row.original.created_at);
          return (
            <div>
              {/* <div>Published</div> */}
              <div>
                <div>{newDate.slice(0, 10)}</div>
                <div>{newDate.slice(11, 19)}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "is_visible",
        header: () => {
          return <div className="min-w-[100px]">Is Active</div>;
        },
        cell: ({ cell, row }) => {
          return (
            <Switch
              id={cell.id}
              checked={cell.row.original.is_visible === 1}
              onCheckedChange={async () => {
                openModal({
                  content: (
                    <ActionContent
                      type="question"
                      message="Are you sure you want to update this product? Once it's gone, all associated data will be updated."
                      confirmLabel="Confirm"
                      cancelLabel="Cancel"
                      onCancel={closeModal}
                      onOk={async () => {
                        const response = await setActiveStatus(
                          cell.row.original.id,
                          cell.row.original.is_visible === 1 ? 0 : 1,
                        );
                        if (!response.error) {
                          setNewData(
                            produce((draft) => {
                              draft[row.index] = {
                                ...draft[row.index],
                                is_visible:
                                  cell.row.original.is_visible === 1 ? 0 : 1,
                              };
                            }),
                          );
                          toast.success("Successfully updated the status");
                        } else {
                          toast.error(
                            "Failed to update the status. Please try again later!",
                          );
                        }
                        closeModal();
                      }}
                    />
                  ),
                });
              }}
              disabled={!row.getCanSelect()}
            />
          );
        },
      },
      {
        accessorKey: "status",
        header: () => {
          return <div className="flex">Status</div>;
        },
        cell: ({ cell }) => {
          const color = colorsForProductStatus[cell.row.original.status].color;

          return (
            <div
              className={`flex justify-center rounded-sm px-4 py-[7.5px] text-[11px]`}
              style={{ color: color, backgroundColor: `${color}25` }}
            >
              {colorsForProductStatus[cell.row.original.status].value}
            </div>
          );
        },
      },
    ];

    const table = useReactTable({
      data: newData,
      columns: productsColumn,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onPaginationChange: setPagination,
      manualPagination: true,
      manualSorting: true,
      enableRowSelection: true,
      // sortDescFirst: true,
      enableSortingRemoval: false,
      state: {
        sorting,
        pagination,
      },
    });

    return (
      <CustomRowRender
        columns={productsColumn}
        table={table}
        className={className}
        tableHeaders={tableHeaders}
      />
    );
  },
);

AllProductsTable.displayName = "AllProductsTable";
export default AllProductsTable;
