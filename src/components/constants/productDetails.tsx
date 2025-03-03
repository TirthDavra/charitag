import Attributes from "../merchant/Products/addProduct/Attributes";
import General from "../merchant/Products/addProduct/General";
import Inventory from "../merchant/Products/addProduct/Inventory";
import LinkedProduct from "../merchant/Products/addProduct/LinkedProduct";
import Shipping from "../merchant/Products/addProduct/Shipping";
import { IconAttribute, IconGeneral } from "../svgIcons";
import { IconLink } from "../svgIcons/build/Icon-Linked";
import { IconInventoryProduct } from "../svgIcons/build/icon-Inventory";
import { IconShipping } from "../svgIcons/build/icon-Shipping";

export interface IProductDetailsTabs {
  tab: number;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}
export const PRODUCT_DETAILS_TABS: IProductDetailsTabs[] = [
  {
    tab: 1,
    label: "General",
    icon: <IconGeneral className="text-merchant_text_color_blue -mr-[1px]" />,
    component: <General />,
  },
  {
    tab: 2,
    label: "Inventory",
    icon: <IconInventoryProduct className="text-merchant_text_color_blue mr-[1px]" />,

    component: <Inventory />,
  },
  {
    tab: 3,
    label: "Shipping",
    icon: <IconShipping className="text-merchant_text_color_blue" />,

    component: <Shipping />,
  },
  {
    tab: 4,
    label: "Linked Product",
    icon: <IconLink className="min-w-4 text-merchant_text_color_blue" />,

    component: <LinkedProduct />,
  },
  {
    tab: 5,
    label: "Attributes",
    icon: <IconAttribute className="text-merchant_text_color_blue" />,

    component: <Attributes />,
  },
];
