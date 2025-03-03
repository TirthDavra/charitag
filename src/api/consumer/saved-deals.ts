import { clientCustomFetch } from "../apiConfig";

export const deleteAllWishlist = async (id: string) => {
  const response = await clientCustomFetch<{
    status: boolean;
    message: any;
  }>({
    url: `/wishlist/all/${id}`,
    method: "DELETE",
  });
  return response;
};
