"use client";
import React, { useEffect, useCallback, useMemo } from "react";
import ItemCard from "./ItemCard";
import Heading from "@/components/common/Heading";
import { Session } from "next-auth";
import Link from "next/link";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {
  decrementCartItemQuantity,
  incrementCartItemQuantity,
  removeFromCart,
  setCartItemQuantity,
} from "./CartOperations";
import { useSession } from "next-auth/react";
import { useAppSelectorConsumer } from "@/lib/Store/hooks";

interface CartSummaryProps {
  showTotal?: boolean;
  showQuantityAdjuster?: boolean;
  className?: string;
  session: Session | null;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  showTotal,
  showQuantityAdjuster,
  className,
}) => {
  const { data: session } = useSession();
  const cart = useAppSelectorConsumer((state) => state.cart.cart);
  const handleQuantityChange = (
    cartItemId: number,
    qty: number,
    isDeal: boolean,
    itemAttributes: string | null,
    increment: number,
  ) => {
    if (Boolean(increment)) {
      incrementCartItemQuantity({
        itemId: cartItemId,
        updateBy: qty,
        isDeal,
        item_attributes: itemAttributes,
        authorized: !!session?.user?.token,
      });
    } else {
      decrementCartItemQuantity({
        itemId: cartItemId,
        updateBy: qty,
        isDeal,
        item_attributes: itemAttributes,
        authorized: !!session?.user?.token,
      });
    }
    // setCartItemQuantity({
    //   itemId: cartItemId,
    //   updateBy: qty,
    //   isDeal,
    //   item_attributes: itemAttributes,
    // });
  };

  const handleRemoveItem = useCallback(
    (
      itemId: number,
      isDeal: boolean,
      itemAttributes: string,
      cartItemId: number | null,
    ) => {
      removeFromCart(
        {
          itemId,
          item_attributes: itemAttributes,
          cart_item_id: cartItemId,
        },
        isDeal,
      );
    },
    [removeFromCart],
  );

  return (
    <div className={className}>
      <Heading varient={"xl"} content={"Cart Summary"} />
      <div className="mt-5 w-full border-b border-blue-200"></div>
      <div className="max-h-[300px] overflow-y-auto scrollbar">
        {cart.cart_items.length > 0 ? (
          cart.cart_items.map((cartItem, index) => {
            return (
              <ItemCard
                key={index}
                showQuantityAdjuster={showQuantityAdjuster}
                product={{
                  id:
                    cartItem.deal_id !== null
                      ? cartItem.deal_id
                      : cartItem.product_id,
                  donation_percentage:
                    cartItem.price?.discount_percentage || "0",
                  image: cartItem.feature_image?.medium_path || "",
                  name: cartItem.product_name,
                  r_price: cartItem?.price?.regular_price || 0,
                  s_price: cartItem?.price?.sale_price || 0,
                  donation_amount: cartItem?.price?.donation_amount,
                  isDeal: cartItem?.deal_id !== null ? true : false,
                  slug: cartItem.product_slug,
                }}
                quantity={cartItem.quantity}
                onQuantityChange={async (qty: number) => {
                  setCartItemQuantity({
                    itemId:
                      cartItem?.deal_id !== null
                        ? cartItem.deal_id
                        : cartItem.product_id || -1,
                    updateBy: qty,
                    isDeal: cartItem?.deal_id !== null ? true : false,
                    item_attributes: cartItem.item_attributes,
                    authorized: !!session?.user?.token,
                  });
                }}
                handleRemoveItem={() => {
                  removeFromCart(
                    {
                      itemId:
                        cartItem.deal_id !== null
                          ? cartItem.deal_id
                          : cartItem.product_id,
                      item_attributes: cartItem.item_attributes,
                      cart_item_id: cartItem.id,
                    },
                    cartItem?.deal_id ? true : false,
                  );
                }}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p className="mt-5 text-center">
              Your cart is empty. Explore our amazing products and add them to
              your cart!
            </p>
            <div className="mt-4">
              <Link href="/shop">
                <ButtonPrimary label="Return to shop" className="rounded-lg" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 w-full border-b border-blue-200"></div>

      <div className="mt-5 flex justify-between">
        <span>Subtotal:</span>
        <span className="font-bold">
          $<span>{Number(cart.sub_total)}</span>
        </span>
      </div>

      <div className="mt-5 w-full border-b border-blue-200"></div>
      {showTotal && (
        <div className="mt-5 flex justify-between font-bold ">
          <div>TOTAL</div>
          <div>${Number(cart.total)}</div>
        </div>
      )}
    </div>
  );
};

export default React.memo(CartSummary);
