import React from "react";
import Title from "@/components/merchant/Title";
import { getAllCategories, getProductBySlugV2 } from "@/api/common/products";
import { IProduct, IVariationFinal, initialProduct } from "../initVal";
import ProductAddContainer from "@/components/merchant/Products/addProduct";
import FailedToLoadPage from "@/components/FailedToLoad";
import ProductContextProvider from "@/components/merchant/store/ProductContext";

const AddProduct = async ({ params }: { params: { slug: string } }) => {
  if (!params?.slug) {
    return <FailedToLoadPage />;
  }
  const response = await getProductBySlugV2({
    slug: params.slug,
    preview: "true",
  });
  if (response.error) {
    return <FailedToLoadPage />;
  }
  const product = response.data.data;
  const initVal: IProduct = {
    remove_attributes: [],
    remove_variations: [],
    product_name: product.product_name,
    is_draft: true,
    is_active: product.is_active,
    short_description: product.short_description,
    long_description: product.long_description,
    store_id: product.store_id,
    product_category_ids:
      product.category.map((item) => ({
        label: item?.name || "",
        value: item?.id.toString() || "",
      })) || [],
    feature_image: product?.feature_image?.id || null,
    main_image: product.feature_image,
    product_type: product.product_type,
    which_policies: product.which_policies,
    product_sub_category_ids:
      product.subcategory.map((item, index) => ({
        label: item?.name || "",
        value: item?.id.toString() || "",
        parentCatId: product.category[index]?.id.toString() || "",
      })) || [],
    photo_gallery: product.gallery && product.gallery.map((image) => image.id),
    init_Image_gallery: product.gallery,
    product_id: product.id,
    product_slug: product.slug,
    price: product.price
      ? {
          regular_price: product.price.regular_price.toString(),
          sale_price: product.price.sale_price.toString(),
        }
      : {
          regular_price: "0",
          sale_price: "0",
        },
    inventory: {
      sku: product.inventory?.sku || "",
      stock_quantity: product.inventory.stock_quantity?.toString() || "0",
      stock_status: product.inventory.stock_status || 0,
      is_stock_management: product.inventory.is_stock_management || 0,
      low_stock_threshold:
        product.inventory.low_stock_threshold?.toString() || "0",
      backorders_status: product.inventory.backorders_status || 1,
    },
    shipping: {
      weight: product.shipping.weight.toString(),
      length: product.shipping.length.toString(),
      width: product.shipping.width.toString(),
      height: product.shipping.height.toString(),
      shipping_class: product.shipping.shipping_class,
    },
    attributes: response.data.data.attributes.map((attr) => ({
      ...attr,
      values:
        attr.values.length > 0
          ? attr.name === "Color"
            ? JSON.stringify(
                attr.values.map((item) => ({
                  name: item.name,
                  value: item.values,
                })),
              )
            : attr.values.map((val) => val.values).join("|")
          : "",
      arrayValues:
        attr.name === "Color"
          ? attr.values.map((item) => item.name)
          : attr.values.map((val) =>
              typeof val.values === "string" ? val.values : val.name,
            ),
    })),

    variations: product.variations.reduce((acc: IVariationFinal, variation) => {
      acc[variation.hashcode] = {
        id: variation.id,
        product_id: variation.product_id,
        sku: variation.inventory.sku,
        stock_quantity: variation.inventory.stock_quantity,
        stock_status: variation.inventory.stock_status || 0,
        low_stock_threshold: variation.inventory.low_stock_threshold,
        backorders_status: variation.inventory.backorders_status,
        weight: variation.shipping.weight.toString(),
        length: variation.shipping.length.toString(),
        width: variation.shipping.width.toString(),
        height: variation.shipping.height.toString(),
        shipping_class: variation.shipping.shipping_class,
        regular_price: variation.price.regular_price.toString(),
        sale_price: variation.price.sale_price.toString(),
        variation_combination: variation.variation_combination,
        description: variation.description,
        image: variation?.image?.id.toString() || "",
        init_image: variation?.image || null,
        is_manage_stock_enabled: variation.is_manage_stock_enabled,
        hashcode: variation.hashcode,
        is_stock_management: variation.inventory.is_stock_management,
      };
      return acc;
    }, {}),
    linked_products: {
      cross_sells: product?.linked_product?.cross_sells
        ? product.linked_product.cross_sells.map((item) => ({
            label: item.product_name,
            value: item.id.toString(),
          }))
        : [],
      up_sells: product?.linked_product?.up_sells
        ? product.linked_product.up_sells.map((item) => ({
            label: item.product_name,
            value: item.id.toString(),
          }))
        : [],
    },
  };

  const productCategories = await getAllCategories();
  return (
    <ProductContextProvider initProduct={initVal} key={params.slug}>
      <Title label="Edit Product" />
      <ProductAddContainer productCategories={productCategories} />
    </ProductContextProvider>
  );
};

export default AddProduct;
