import { getAllCategories } from "@/api/common/products";
import {
  getDealDetails,
  getProductsVariations,
} from "@/api/merchant/merchantDeals";
import AddOrEditDeals, {
  IInitState,
} from "@/components/merchant/Deals/AddOrEditDeals";
import React from "react";

const page = async ({ searchParams }: { searchParams: { dealId: string } }) => {
  let initialstate: IInitState = {
    id: null,
    title: "",
    short_description: "",
    long_description: "",
    deals_expiry_on: 1,
    price: null,
    qty: 50,
    start_date: null,
    end_date: null,
    feature_image: null,
    gallery: [],
    deal_category_ids: [],
    deal_sub_category_ids: [],
    product_id: null,
    product_variation_id: null,
    discount: 0,
    product_type: 1,
    variations: [],
  };

  const productCategories = await getAllCategories();
  const response = await getProductsVariations();
  const productWithVariations = response.data;

  if (searchParams?.dealId) {
    const dealDetails = await getDealDetails(Number(searchParams.dealId));

    const selectedVariation = dealDetails.data.data?.product?.variations?.find(
      (item) => item.product_id === dealDetails.data.data.product_id,
    );

    if (!dealDetails.error) {
      initialstate = {
        id: dealDetails.data.data.id,
        title: dealDetails.data.data.title,
        short_description: dealDetails.data.data.short_description,
        long_description: dealDetails.data.data.long_description,
        feature_image: dealDetails.data.data.feature_image,
        discount: dealDetails.data.data.discount,
        deals_expiry_on: dealDetails.data.data.deals_expiry_on,
        qty: dealDetails.data.data.qty,
        start_date: dealDetails.data.data.start_date,
        end_date: dealDetails.data.data.end_date,

        deal_category_ids:
          dealDetails?.data?.data?.category.map((item) => ({
            label: item.name,
            value: item.id.toString(),
          })) || [],
        deal_sub_category_ids:
          dealDetails?.data?.data?.subcategory.map((item,index) => ({
            label: item.name,
            value: item.id.toString(),
            parentCatId: dealDetails.data.data.category[index].id.toString(),
          })) || [],
        price: Number(
          dealDetails.data.data.product.product_type === 1
            ? dealDetails.data.data.product.price.sale_price
            : selectedVariation?.price.sale_price,
        ),
        gallery: dealDetails.data.data.gallery,
        product_id: {
          label: dealDetails.data.data.product.product_name,
          value: dealDetails.data.data.product_id.toString(),
        },

        product_variation_id: selectedVariation
          ? {
              label: selectedVariation.product.product_name,
              value: selectedVariation.product_id.toString(),
            }
          : null,
        product_type: dealDetails.data.data.product.product_type,
        variations:
          dealDetails.data.data.product.product_type === 2
            ? dealDetails.data.data.product.variations.map((item) => ({
                id: item.id,
                price: item.price,
                product_name: item.product.product_name,
              }))
            : [],
      };
    }
  }

  return (
    <div>
      <AddOrEditDeals
        dealCategory={productCategories.data}
        initialState={initialstate}
        productWithVariations={productWithVariations}
      />
    </div>
  );
};

export default page;
