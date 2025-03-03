"use client";
import Login from "@/components/auth/Login";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import WelcomeBack, { CampaignOption } from "./WelcomeBack";
import Checkout from "./Checkout";
import { useSearchParams } from "next/navigation";
import CartSummary from "./CartSummary";
import BottomCard from "./BottomCard";
import { ICharityOnlyName } from "@/api/charity/types";
import { addOrUpdateCartItems, getCartClient } from "@/api/user/cart";
import { getSession, useSession } from "next-auth/react";
import { Option } from "@/components/ui/multiple-selector";
import { toast } from "react-toastify";
import { clearCart } from "./CartOperations";
import {
  setCartSlice,
  setWholeCart,
} from "@/lib/Store/slices/consumerFeatures/cart/cartSlice";
import { useAppDispatch, useAppSelectorConsumer } from "@/lib/Store/hooks";
interface BillingDetails {
  first_name: string;
  last_name: string;
  street: string;
  apartment: string;
  city: string;
  province: string;
  postal_code: string;
  phone_number: string;
}

export interface ICheckoutDetails {
  charity_ids: Option[];
  campaign_ids: CampaignOption[];
  contact_email: string;
  email_consent: boolean;
  address_id: number;
  token: string;
}

const Cart = ({
  // session,
  charities,
}: {
  session: Session | null;
  charities: ICharityOnlyName[];
  initCharity: Option[];
}) => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const wholeCart = useAppSelectorConsumer((state) => state.cart);
  const dispatch = useAppDispatch();
  let campaigns: CampaignOption[] = [];
  useEffect(() => {
    const setCart = async () => {
      const session = await getSession();
      if (session?.user?.token) {
        const response = await getCartClient();

        const cartItemsRes = {
          id: response.data?.data?.id || null,
          cart_items: response.data?.data?.cart_items || [],
          sub_total: response.data?.data?.sub_total || 0,
          total: response.data?.data?.total || 0,
          charity: response.data?.data?.charity || [],
        };
        if (response.statusCode === 404) {
          clearCart();
        }
        if (response.error && response.statusCode !== 404) {
          toast.error("Cart sync failed");
        }
        if (response.data.status) {
          dispatch(
            setCartSlice({
              cart: {
                id: cartItemsRes.id,
                sub_total: Number(cartItemsRes.sub_total),
                total: Number(cartItemsRes.total),
                cart_items: cartItemsRes.cart_items,
                charity: cartItemsRes.charity,
              },
              currentStep: 0,
            }),
          );
        }
      }
    };

    setCart();
  }, []);
  const [checkoutDetails, setCheckoutDetails] = useState<ICheckoutDetails>({
    charity_ids:
      wholeCart.cart.charity.map((item) => ({
        label: item.charity_name,
        value: item.id.toString(),
      })) || [],
    campaign_ids: campaigns || [],
    contact_email: "",
    email_consent: true,
    address_id: 69,
    token: "",
  });

  const { data: session } = useSession();

  useEffect(() => {
    // Screenshot detection and prevention logic
    const handleKeyDown = (event: KeyboardEvent) => {
      // Detect Ctrl+S, Ctrl+P, PrintScreen, and SysRq
      if (
        (event.ctrlKey &&
          (event.key === "s" ||
            event.key === "S" ||
            event.key === "p" ||
            event.key === "P")) ||
        event.key === "PrintScreen" ||
        event.key === "SysRq" ||
        event.key === "PrtScn"
      ) {
        alert(
          "Screenshot detected! Please do not take screenshots of this page.",
        );
        event.preventDefault(); // Prevent default action
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault(); // Disable right-click context menu
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <div className="container mt-[130px] grid grid-cols-1 md:justify-center lg:grid-cols-2 lg:gap-x-[100px] xl:gap-x-[200px]">
      {session?.user.token ? (
        wholeCart.currentStep === 0 ? (
          <WelcomeBack
            className="w-full md:w-[555px] lg:w-full "
            user={session?.user.userDetails}
            charities={
              charities?.length > 0
                ? charities.map((charity) => ({
                    value: charity.id.toString(),
                    label: charity.charity_name,
                  }))
                : []
            }
            checkoutDetails={checkoutDetails}
            setCheckoutDetails={setCheckoutDetails}
            cart_items={wholeCart.cart.cart_items}
          />
        ) : (
          <Checkout
            checkoutDetails={checkoutDetails}
            setCheckoutDetails={setCheckoutDetails}
          />
        )
      ) : (
        <div className="md:mx-auto md:flex">
          <Login
            searchParams={{ error: error === null ? undefined : error }}
            afterLogin={async () => {
              const response = await addOrUpdateCartItems(
                wholeCart.cart.cart_items.map((item) => ({
                  product_id: item.id,
                  quantity: item.quantity,
                  item_attributes: item.item_attributes,
                })),
              );
              if (response.error) {
                toast.error(response.data.message);
              }
              setWholeCart({
                cart_items: response.data?.data?.cart_items,
                charity: response.data?.data?.charity,
                id: response.data?.data?.id,
                sub_total: response.data?.data?.sub_total,
                total: response.data?.data?.total,
              });
            }}
            loginNotCheck={true}
            className="shadow-[0_6px_24px_0_rgba(57,105,224,0.15) !mt-5 md:w-[555px] lg:w-[50vw]"
          />
        </div>
      )}

      <div className="z-50 mt-10 rounded-lg bg-[#FFFFFF] p-4 md:mx-auto md:flex md:w-[555px] md:flex-col lg:z-0 lg:w-auto xl:w-[555px]">
        {/* TODO: Fixed the total issue  */}
        <CartSummary
          showQuantityAdjuster={wholeCart.currentStep === 0}
          showTotal={wholeCart.currentStep === 1}
          session={session}
        />
        <BottomCard
          className={`${wholeCart.cart?.cart_items?.length > 0 ? "" : "mt-[10rem]"}`}
        />
      </div>
    </div>
  );
};

export default Cart;
