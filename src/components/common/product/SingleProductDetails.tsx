"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import ButtonPrimary from "../ButtonPrimary";
import {
  Attribute,
  IAtrrValues,
  IColorAtrrValues,
  ISingleProduct,
  IValObj,
} from "@/api/common/productTypes";
import { produce } from "immer";
import {
  discountCalculator,
  generateOrderIndependentHash,
} from "@/utils/basicfunctions";
import ProductImageCarousel from "./ProductImageCarousel";
import parse from "html-react-parser";
import { useModal } from "@/components/context/ModalContext";
import ShowCartModal from "@/components/consumer/Cart/ShowCartModal";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@/lib/userRoles";
import Image from "next/image";
import logo from "@images/blue_charitag_logo.svg";
import { useRouter } from "next/navigation";
import { addToCart } from "@/components/consumer/Cart/CartOperations";

const SingleProductDetails = ({ product }: { product: ISingleProduct }) => {
  const [selectedAttributes, setSelectedAttributes] = useState<number[]>(
    Array.from({ length: product.attributes.length }, () => 0),
  );
  const [selectedAttributesName, setSelectedAttributesName] = useState<
    string[]
  >(product.attributes.map((attribute) => attribute.values[0].name));
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const { data: session } = useSession();
  const variationKeys = Object.keys(product.variations);
  const initialHash =
    variationKeys.length > 0
      ? product.variations[variationKeys[0]].hashcode
      : "";
  const [variationHash, setVariationHash] = useState<string>(initialHash);

  const defaultProductRef = useRef({
    stock_status: product?.is_stock_status !== 0,
    product_description: product?.short_description || "",
    product_discount_percentage: discountCalculator(
      Number(product.price?.sale_price || 0),
      Number(product.price?.regular_price || 0),
    ),
    product_regular_price: product.price?.regular_price || 0,
    product_sale_price: product.price?.sale_price || 0,
    product_images: product.feature_image
      ? [product.feature_image, ...product.gallery]
      : product.gallery,
    product_donation_amount: product?.price?.donation_amount || 0,
  });

  const getProductDetails = useCallback(
    (hash: string) => {
      if (product.product_type === 2 && product.variations[hash]) {
        const variation = product.variations[hash];
        return {
          stock_status: variation.is_stock_status !== 0,
          product_description: variation.description || "",
          product_discount_percentage: discountCalculator(
            Number(variation.price.sale_price),
            Number(variation.price.regular_price),
          ),
          product_regular_price: variation.price.regular_price,
          product_sale_price: variation.price.sale_price,
          product_images: variation.image
            ? [variation.image, ...product.gallery]
            : product.gallery,
          product_donation_amount: variation.price.donation_amount,
        };
      }
      return defaultProductRef.current;
    },
    [product],
  );

  const [definedProduct, setDefinedProduct] = useState(
    getProductDetails(initialHash),
  );

  const handleAttributeSelectionChange = useCallback(
    async (
      attributeIndex: number,
      attributeValue: number,
      attributeName: string,
    ) => {
      setSelectedAttributes((prev) =>
        produce(prev, (draft) => {
          draft[attributeIndex] = attributeValue;
        }),
      );

      setSelectedAttributesName((prev) => {
        const updatedAttributesName = [...prev];
        updatedAttributesName[attributeIndex] = attributeName;
        return updatedAttributesName;
      });

      const hashCode = generateOrderIndependentHash(selectedAttributesName);
      setVariationHash(hashCode);
      setDefinedProduct(getProductDetails(hashCode));
    },
    [selectedAttributesName, getProductDetails],
  );

  const addToCartHandler = useCallback(
    async (isBuyNow: boolean) => {
      const hashCode = await generateOrderIndependentHash(
        selectedAttributesName,
      );

      if (!session || session?.user?.role === USER_ROLES.CONSUMER) {
        const variation =
          product.product_type === 2 ? product.variations[hashCode] : null;

        const itemAttributes = product.attributes
          .map(
            (attr, index) => attr.values[selectedAttributes[index]]?.id ?? "",
          )
          .join("|");

        const itemDetails = variation
          ? {
              id: variation.product_id,
              product_id: variation.product_id,
              feature_image: variation.image,
              price: variation.price,
              product_name: `${product.product_name} ${
                variation.variation_combination.length > 0
                  ? `(${variation.variation_combination.join(" | ")})`
                  : ""
              }`,
              item_attributes: null,
              slug: product.slug,
            }
          : {
              id: product.id,
              product_id: product.id,
              feature_image: product.feature_image,
              price: product.price,
              product_name: `${product.product_name}${
                selectedAttributesName.length > 0
                  ? ` (${selectedAttributesName.join(" | ")})`
                  : ""
              }`,
              item_attributes: itemAttributes,
              slug: product.slug,
            };

        const response = await addToCart({
          item: {
            cart_id: null,
            deal_id: null,
            ...itemDetails,
            product_slug: product.slug,
            quantity: 1,
          },
          quantity: 1,
          increment: 1,
          delay: 0,
          authorized: !!session?.user?.token,
        });

        if (response.error) {
          toast.error(response.message);
          return;
        }

        if (isBuyNow) {
          router.push("/cart/checkout");
        } else {
          openModal({
            content: (
              <ShowCartModal
                item={{
                  id: itemDetails.product_id,
                  donation_percentage:
                    itemDetails.price.discount_percentage || "0",
                  image: itemDetails.feature_image?.medium_path || "",
                  name: itemDetails.product_name,
                  r_price: itemDetails.price.regular_price || 0,
                  s_price: itemDetails.price.sale_price || 0,
                  donation_amount: itemDetails.price.donation_amount || 0,
                  isDeal: false,
                  slug: itemDetails.slug,
                }}
                onClose={closeModal}
              />
            ),
            crossMarkRight: true,
            classNameBtn: "text-merchant_text_color_blue",
            classNameCrossIcon: "h-5 w-5",
          });
        }
      } else {
        toast.error("This functionality is only allowed for consumers");
      }
    },
    [
      session,
      selectedAttributes,
      selectedAttributesName,
      product,
      router,
      openModal,
      closeModal,
    ],
  );

  const handleBuyNow = useCallback(
    () => addToCartHandler(true),
    [addToCartHandler],
  );
  const handleAddToCart = useCallback(
    () => addToCartHandler(false),
    [addToCartHandler],
  );

  const isIValObj = (obj: any): obj is IValObj => {
    return (
      typeof obj === "object" && obj !== null && "name" in obj && "value" in obj
    );
  };

  return (
    <div className="mt-[56px] grid grid-cols-1 gap-[20px] md:grid-cols-[minmax(400px,1fr),1fr] xl:grid-cols-[minmax(786px,1fr),1fr]">
      <ProductImageCarousel
        images={definedProduct.product_images}
        className="max-w-[766px]"
      />
      <div>
        <div className="border-b border-merchant_border pb-[15px]">
          <span className="text-[25px] font-medium text-merchant_sidebar_text">
            {product.product_name}
          </span>
          <div className="my-1 flex flex-col gap-4 gap-y-2 lg:flex-row">
            <div className="flex flex-wrap items-center gap-4 whitespace-nowrap">
              <div>
                {definedProduct.product_regular_price !==
                  definedProduct.product_sale_price && (
                  <span className="text-gray-400">
                    <span className="line-through">
                      $
                      {Number(definedProduct.product_regular_price)
                        .toFixed(2)
                        .replace(/\.00$/, "")}
                    </span>{" "}
                  </span>
                )}
                <span className="text-[18px] font-bold text-[#F85C36]">
                  $
                  {Number(definedProduct.product_sale_price)
                    .toFixed(2)
                    .replace(/\.00$/, "")}
                </span>
              </div>
              {definedProduct.product_regular_price !==
                definedProduct.product_sale_price && (
                <div className="rounded-full bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] px-3 font-semibold text-white lg:mx-0">
                  {`${definedProduct.product_discount_percentage}% OFF`}
                </div>
              )}
            </div>
            <div>
              <p className="flex items-center gap-1 font-bold text-gradient_color_2">
                <span className="h-[18px] w-[12px]">
                  <Image src={logo} alt="" className="h-full object-cover" />
                </span>
                <span>{`Donations: $${Number(definedProduct.product_donation_amount).toFixed(2).replace(/\.00$/, "")}`}</span>
              </p>
            </div>
          </div>
          <span className="text-[15px] text-merchant_placeholder">
            {parse(product.short_description)}
          </span>
        </div>
        <div>
          {product.attributes.length > 0 &&
            product.attributes.map((attr, mainIndex) => {
              let attrValues = attr.values[selectedAttributes[mainIndex]].name;

              return (
                <div
                  className="border-b border-merchant_border pb-[15px] pt-[15px]"
                  key={attr.id}
                >
                  <div className="text-merchant_sidebar_text">
                    {attr.name}: {attrValues}
                    {attr.name === "Color" ? (
                      // If the attribute is of type "Color"
                      <div className="flex gap-2">
                        {(attr.values as IColorAtrrValues[]).map(
                          (attrVal, index) => {
                            console.log(
                              " mainIndex, index,attrVal.values,",
                              mainIndex,
                              index,
                              attrVal.name,
                            );

                            return (
                              <div
                                key={attrVal.id}
                                className="flex cursor-pointer items-center justify-center"
                                onClick={() =>
                                  handleAttributeSelectionChange(
                                    mainIndex,
                                    index,
                                    attrVal.name,
                                  )
                                }
                              >
                                {attrVal.values.startsWith("#") ? (
                                  <div
                                    className={`h-8 w-8 rounded-full border border-merchant_border p-1 ${
                                      selectedAttributes[mainIndex] === index
                                        ? "border-2 !border-slate-500"
                                        : ""
                                    }`}
                                  >
                                    <div
                                      className="h-full w-full rounded-full border border-merchant_border/70"
                                      style={{
                                        backgroundColor: attrVal.values ?? "",
                                      }}
                                    ></div>
                                  </div>
                                ) : (
                                  <div
                                    className={`rounded-sm border border-merchant_border p-1 ${
                                      selectedAttributes[mainIndex] === index
                                        ? "border-2 !border-slate-500"
                                        : ""
                                    }`}
                                  >
                                    <Image
                                      src={
                                        process.env
                                          .NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                                        attrVal.values
                                      }
                                      alt=""
                                      height={50}
                                      width={50}
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          },
                        )}
                      </div>
                    ) : (
                      // If the attribute is not of type "Color"
                      <div className="flex gap-2">
                        {(attr.values as IAtrrValues[]).map(
                          (attrVal, index) => (
                            <div
                              key={attrVal.id}
                              onClick={() =>
                                handleAttributeSelectionChange(
                                  mainIndex,
                                  index,
                                  attrVal.values,
                                )
                              }
                              className={`flex cursor-pointer border border-merchant_border px-[14px] py-2 ${
                                selectedAttributes[mainIndex] === index
                                  ? "border-2 !border-slate-500"
                                  : ""
                              }`}
                            >
                              <span className="text-lg text-merchant_sidebar_text">
                                {typeof attrVal.values === "string" &&
                                  attrVal.values}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {definedProduct.stock_status ? (
          <div className="flex items-center gap-[10px] pt-4">
            <ButtonPrimary
              label="Add To Cart"
              className="rounded-sm px-[12px] py-2 !shadow-none"
              classNameLabel="text-[13px] font-normal"
              onClick={handleAddToCart}
            />
            <button
              onClick={handleBuyNow}
              className="rounded border border-solid border-merchant_border bg-buttonGradient px-[10px] py-[6px] text-[13px] font-medium text-merchant_text_color_blue"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <div className="pt-4">
            <span className="inline-block rounded bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
              Product is out of stock
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductDetails;
