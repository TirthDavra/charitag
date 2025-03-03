import { clientCustomFetch } from "../apiConfig";
import { ICartRelatedProducts } from "./types";

export const getSliderProduct = async ({
  pId = "",
  dId = "",
}: {
  pId?: number | string | null;
  dId?: number | string | null;
}) => {
  const response = await clientCustomFetch<ICartRelatedProducts>({
    url: `/cart/linked_items/?product_id=${pId}&deal_id=${dId}`,
  });
  return response;
};
