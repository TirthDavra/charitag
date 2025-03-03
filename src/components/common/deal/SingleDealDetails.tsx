"use client";
import React, { useState } from "react";
import ButtonPrimary from "../ButtonPrimary";
import { ISingleDealResponse } from "@/api/common/productTypes";
import { discountCalculator } from "@/utils/basicfunctions";
import { useModal } from "@/components/context/ModalContext";
import ShowCartModal from "@/components/consumer/Cart/ShowCartModal";
import { toast } from "react-toastify";
import ProductImageCarousel from "../product/ProductImageCarousel";
import Image from "next/image";
import logo from "@images/blue_charitag_logo.svg";
import DealTimer from "../DealTimer";
import { useSession } from "next-auth/react";
import { USER_ROLES } from "@/lib/userRoles";
import { addToCart } from "@/components/consumer/Cart/CartOperations";

const SingleDealDetails = ({ deal }: { deal: ISingleDealResponse }) => {
  const { openModal, closeModal } = useModal();
  const { data: session } = useSession();
  const [qty, setQty] = useState(1);
  const [definedProduct] = useState({
    name: deal.data?.deal.title || "",
    description: deal.data?.deal.short_description || "",
    discount_percentage: deal.data?.deal.discount || 0,
    price: deal.data?.deal.price || 0,
    images: deal.data?.deal.feature_image
      ? [deal.data?.deal.feature_image, ...deal.data?.deal.gallery]
      : deal.data?.deal.gallery,
    regular_price: deal.data.deal.regular_price || "",
    sale_price: deal.data.deal.sale_price || "",
    donation_amount: deal.data.deal.donation_amount || 0,
  });

  const handleQtyChange = (qty: number) => {
    if (qty > 0) {
      setQty(qty);
    }
  };

  async function handleAddtoCart() {
    if (session?.user?.role === USER_ROLES.CONSUMER || !session) {
      const response = await addToCart({
        item: {
          cart_id: null,
          deal_id: deal.data.deal.product_id,
          feature_image: deal.data.deal.feature_image,
          id: deal.data.deal.product_id,
          item_attributes: null,
          price: {
            regular_price: deal.data.deal.regular_price,
            sale_price: deal.data.deal.sale_price,
            donation_amount: deal.data.deal.donation_amount,
            donation_percentage: deal.data.deal.discount,
            discount_percentage: deal.data.deal.discount,
          },
          product_id: null,
          product_name: deal.data.deal.title,
          product_slug: deal.data.deal.slug,
          quantity: qty,
        },
        quantity: qty,
        increment: 1,
        delay: 0,
        authorized: !!session?.user?.token,
      });

      if (response.error) {
        toast.error(response.message);
        return;
      }

      openModal({
        content: (
          <ShowCartModal
            item={{
              id: deal.data.deal.id,
              donation_percentage: deal.data.deal.discount,
              image: deal.data.deal.feature_image?.medium_path || "",
              name: deal.data.deal.title,
              r_price: deal.data.deal.regular_price,
              s_price: deal.data.deal.sale_price,
              donation_amount: deal.data.deal.donation_amount,
              isDeal: true,
              slug: deal.data.deal.slug,
            }}
            onClose={closeModal}
          />
        ),
        crossMarkRight: true,
        classNameBtn: "text-merchant_text_color_blue",
        classNameCrossIcon: "h-5 w-5",
      });
    } else {
      toast.error("This functionality is only allowed for consumers");
    }
  }

  const isDealExpired =
    deal.data.deal.deals_expiry_on === 1
      ? deal.data.deal.qty < 1
      : new Date(deal.data.deal.end_date) <= new Date();
  return (
    <div className="mt-[56px] grid grid-cols-1 gap-[20px] md:grid-cols-[minmax(400px,1fr),1fr] xl:grid-cols-[minmax(786px,1fr),1fr]">
      <ProductImageCarousel
        images={definedProduct.images}
        className="max-w-[766px]"
      />
      <div>
        <div className="mt-4 rounded-lg p-4 shadow-equally_distributed_bluish shadow-blue-50">
          <div className="pb-2 text-[20px] font-medium">
            {definedProduct.name}
          </div>
          <div>
            <div className="flex flex-col gap-2 lg:flex-row">
              <div className="flex flex-wrap items-center gap-4 whitespace-nowrap md:gap-2">
                <div>
                  {definedProduct.regular_price !==
                    definedProduct.sale_price && (
                    <span className="text-lg text-homepage_card_text line-through opacity-[50%]">
                      $
                      {Number(definedProduct?.regular_price)
                        .toFixed(2)
                        .replace(/\.00$/, "") ?? "0.00"}
                    </span>
                  )}{" "}
                  <span className="text-lg font-bold text-[#F85C36]">
                    ${Number(definedProduct?.sale_price || 0).toFixed(2)}
                  </span>
                </div>
                {definedProduct.regular_price !== definedProduct.sale_price && (
                  <span className="rounded-full bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] px-[10px] py-[2px] text-[14px] font-bold text-white shadow-[0_6px_10px_0_rgba(248,92,54,0.2)]">
                    {discountCalculator(
                      Number(definedProduct?.sale_price || 0),
                      Number(definedProduct?.regular_price || 0),
                    )}
                    % OFF
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 py-1 font-bold text-gradient_color_2">
                <span className="h-[18px] w-[12px]">
                  <Image src={logo} alt="" className="h-full object-cover" />
                </span>
                <span>{`Donations: $${definedProduct.donation_amount || 0}`}</span>
              </div>
            </div>
          </div>
          {!isDealExpired && (
            <>
              <div className="mt-3 flex max-w-fit items-center space-x-2 rounded-full border-2">
                <button
                  className="rounded-l border-r-2 px-2"
                  onClick={() => handleQtyChange(qty - 1)}
                >
                  -
                </button>
                <div className="px-1 text-lg font-semibold">{qty}</div>
                <button
                  className="rounded-r border-l-2 px-2"
                  onClick={() => handleQtyChange(qty + 1)}
                >
                  +
                </button>
              </div>
              <div className="mt-6 flex gap-3">
                <ButtonPrimary
                  label="Add To Cart"
                  className="rounded-full px-[12px] py-2 !shadow-none"
                  classNameLabel="text-[13px] font-semibold"
                  onClick={handleAddtoCart}
                />
                <button className="rounded-full border border-solid border-merchant_border bg-buttonGradient px-[10px] py-[6px] text-[13px] font-semibold text-merchant_text_color_blue">
                  Buy Now
                </button>
              </div>
            </>
          )}

          <div>
            {deal.data.deal.deals_expiry_on === 1 ? (
              <div
                className={`mt-10 flex justify-center rounded-md border border-merchant_text_color_blue/50 py-2 font-semibold text-merchant_text_color_blue `}
              >
                {`Deal is only valid for ${deal.data.deal.qty}`}
              </div>
            ) : isDealExpired ? (
              <div
                className={`mt-10 flex justify-center rounded-md border border-merchant_text_color_blue/50 py-2 font-semibold text-merchant_text_color_blue `}
              >
                Deal is expired
              </div>
            ) : (
              <DealTimer
                countDown={new Date(deal.data.deal.end_date)}
                className="mt-10"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDealDetails;
