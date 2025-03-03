import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { IShippingMethod } from ".";

export const ShippingZoneColumnDef: ColumnDef<IShippingMethod>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ cell }) => {
      return (
        <div className="text-sm text-merchant_text_color_blue">
          {cell.row.original.title}
        </div>
      );
    },
  },
  {
    accessorKey: "enabled",
    header: () => {
      return (
        <div className="text-sm text-merchant_text_color_blue">Enabled</div>
      );
    },
    cell: ({ row, cell }) => {
      return (
        <div>
          <Switch
            id={cell.id}
            checked={row.getIsSelected()}
            onCheckedChange={row.getToggleSelectedHandler()}
            disabled={!row.getCanSelect()}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => {
      return (
        <div className="text-sm text-merchant_text_color_blue">
          Description
        </div>
      );
    },
  },
];
