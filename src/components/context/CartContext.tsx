"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {
  ICartItemQuantity,
  addOrUpdateCartItems,
  updateCartItem,
  deleteCartItemById,
  IUpdateCartItemArgs,
} from "@/api/user/cart";
import { ICartData, ICartItem, ICartItemDeal } from "@/api/user/types";
import {
  addFloats,
  additiveMultiplication,
  errorMessageParser,
  parseMsg,
} from "@/utils/basicfunctions";

// Define the type for the context value
export interface IAddToCartParameters {
  item: ICartItem;
  quantity: number;
  increment: 0 | 1;
  delay?: number;
}

interface CartContextType {
  cart: ICartData;
  addToCart: (
    params: IAddToCartParameters,
  ) => Promise<{ message: string; error: boolean }>;
  removeFromCart: (
    params: {
      itemId: number;
      item_attributes: string | null;
      cart_item_id: number | null;
    },
    isDeal: boolean,
  ) => void;
  clearCart: () => void;
  currentStep: number;
  incrementCartItemQuantity: (params: ICartUpdateParamsBase) => void;
  decrementCartItemQuantity: (params: ICartUpdateParamsBase) => void;
  setCartItemQuantity: (params: ICartUpdateParamsBase) => void;
  setCurrentStep: (step: number) => void;
  setWholeCart: (newCart: ICartData) => void;
}

export interface ICartUpdateParams extends ICartUpdateParamsBase {
  isIncrement: 0 | 1 | 2;
}

export interface ICartUpdateParamsBase {
  itemId: number;
  isDeal: boolean;
  item_attributes: string | null;
  updateBy: number;
}

export function isDealTypeGuard(item: ICartItem): item is ICartItemDeal {
  return (item as ICartItemDeal)?.deal_id !== null;
}

const defaultCart: ICartData = {
  id: null,
  sub_total: 0,
  total: 0,
  cart_items: [],
  charity: [],
};
// Create a context
export const CartContext = createContext<CartContextType>({
  cart: defaultCart,
  addToCart: async () => {
    return { message: "", error: false };
  },
  removeFromCart: () => {},
  clearCart: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  setCartItemQuantity: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
  setWholeCart: () => {}, // Initialize with an empty function
});

// Create a context provider component
const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<ICartData>(defaultCart);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { data: session } = useSession();
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const parsedCart = JSON.parse(cart) as ICartData;
      setCart({
        id: parsedCart?.id || null,
        cart_items: parsedCart?.cart_items || [],
        sub_total: parsedCart?.sub_total || 0,
        total: parsedCart?.total || 0,
        charity: parsedCart?.charity || [],
      });
    }
  }, []);
  const saveCart = (cart: ICartData) => {
    setCart(cart);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  /**
   * Find the index of a cart item based on the provided parameters.
   *
   * @param {boolean} isDeal - Indicates if the item is a deal.
   * @param {number | null} id - The ID of the item.
   * @param {string | null} item_attributes - The attributes of the item.
   * @return {number} The index of the cart item if found, otherwise -1.
   */
  const findIndexOfCartItem = (
    isDeal: boolean,
    id: number | null,
    item_attributes: string | null,
  ) => {
    if (id === null) return -1;
    return isDeal
      ? cart.cart_items.findIndex((_item) => _item.deal_id === id)
      : cart.cart_items.findIndex(
          (_item) =>
            _item.product_id === id &&
            _item?.item_attributes === item_attributes,
        );
  };
  const addToCart = async ({
    item,
    quantity,
    increment,
  }: IAddToCartParameters) => {
    const isItemDeal = isDealTypeGuard(item);

    const existingItemIndex = findIndexOfCartItem(
      isItemDeal,
      item.id,
      item.item_attributes,
    );

    const currentQuantity =
      existingItemIndex !== -1
        ? cart.cart_items[existingItemIndex].quantity
        : 0;

    const cartItem: ICartItemQuantity = {
      product_id: item.id,
      quantity: increment
        ? currentQuantity + quantity
        : Math.max(0, currentQuantity - quantity),
      item_attributes: item.item_attributes,
    };

    if (session?.user.token) {
      const response = await addOrUpdateCartItems([cartItem]);
      if (!response.error) {
        saveCart({
          id: response.data.data.id,
          sub_total: Number(response.data.data.sub_total),
          total: Number(response.data.data.total),
          cart_items: response.data.data.cart_items,
          charity: response.data.data.charity,
        });
      }
      return {
        message: parseMsg(response.data.message) || "",
        error: response.error,
      };
    }
    // if the item already exists in the cart, update the quantity
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cart.cart_items];
      updatedCartItems[existingItemIndex].quantity = cartItem.quantity;
      const updatedCart = {
        ...cart,
        sub_total: isItemDeal
          ? addFloats(
              Number(cart.sub_total),
              additiveMultiplication(quantity, Number(item.price)),
            )
          : addFloats(
              Number(cart.sub_total),
              additiveMultiplication(quantity, Number(item.price.sale_price)),
            ),
        total: isItemDeal
          ? addFloats(
              Number(cart.sub_total),
              additiveMultiplication(quantity, Number(item.price)),
            )
          : addFloats(
              Number(cart.sub_total),
              additiveMultiplication(quantity, Number(item.price.sale_price)),
            ),
        cart_items: updatedCartItems,
      };
      saveCart(updatedCart);
      return { message: "Item successfully added to your cart!", error: false };
    } else {
      const updatedCart: ICartData = {
        ...cart,
        sub_total: addFloats(
          Number(cart.sub_total),
          Number(item?.price?.sale_price) || 0,
        ),
        total: addFloats(
          Number(cart.sub_total),
          Number(item?.price?.sale_price) || 0,
        ),
        cart_items: [
          ...cart.cart_items,
          { ...item, quantity: cartItem.quantity },
        ],
      };

      saveCart(updatedCart);
      return { message: "Item successfully added to your cart!", error: false };
    }
  };

  const updateCartItemQuantity = ({
    itemId,
    isDeal,
    item_attributes,
    updateBy,
    isIncrement, // 0 = increment, 1 = decrement, 2 = set quantity
  }: ICartUpdateParams) => {
    const updatedCart = { ...cart };

    const itemIndex = findIndexOfCartItem(isDeal, itemId, item_attributes);

    if (itemIndex !== -1) {
      const itemInCart = updatedCart.cart_items[itemIndex];
      const currentQuantity = itemInCart.quantity;
      let newQuantity;
      let quantityDifference;

      if (isIncrement === 0) {
        newQuantity = currentQuantity + updateBy;
        quantityDifference = updateBy;
      } else if (isIncrement === 1) {
        newQuantity = Math.max(currentQuantity - updateBy, 0);
        quantityDifference = -updateBy;
      } else {
        newQuantity = Math.max(updateBy, 0);
        quantityDifference = newQuantity - currentQuantity;
      }

      updatedCart.cart_items[itemIndex].quantity = newQuantity;
      updatedCart.sub_total = addFloats(
        Number(updatedCart.sub_total),
        additiveMultiplication(
          quantityDifference,
          Number(itemInCart?.price?.sale_price) || 0,
        ),
      );
      updatedCart.total = updatedCart.sub_total;

      saveCart(updatedCart);
      if (session?.user.token) {
        const debouncedUpdateCartItem = debounce(
          async (cartItem: IUpdateCartItemArgs) => {
            const response = await updateCartItem(cartItem);
            if (response.error) {
              toast.error("Failed to update cart item");
            }
          },
          500,
        );
        debouncedUpdateCartItem({
          cart_id: itemInCart.id,
          quantity: newQuantity,
        });
      }
    }
  };

  const removeFromCart = (
    {
      itemId,
      item_attributes,
      cart_item_id,
    }: {
      itemId: number;
      item_attributes: string | null;
      cart_item_id: number | null;
    },
    isDeal: boolean,
  ) => {
    const updatedCart = { ...cart };
    const itemIndex = findIndexOfCartItem(isDeal, itemId, item_attributes);

    if (itemIndex !== -1) {
      const itemToRemove = updatedCart.cart_items[itemIndex];
      updatedCart.cart_items.splice(itemIndex, 1);

      const itemPrice = Number(itemToRemove?.price?.sale_price);

      updatedCart.sub_total = addFloats(
        Number(updatedCart.sub_total),
        -additiveMultiplication(Number(itemToRemove.quantity), itemPrice),
      );
      updatedCart.total = updatedCart.sub_total;

      saveCart(updatedCart);
      if (session?.user.token) {
        const debouncedRemoveCartItem = debounce(
          async (cartItemId: number | null) => {
            const response = await deleteCartItemById({
              cart_item_id: cartItemId,
            });
            if (response.error) {
              toast.error("Failed to remove item from cart");
            }
          },
          500,
        );
        debouncedRemoveCartItem(cart_item_id);
      }
    }
  };

  const clearCart = () => {
    saveCart(defaultCart);
  };

  const setCartItemQuantity = ({
    itemId,
    isDeal,
    item_attributes,
    updateBy,
  }: ICartUpdateParamsBase) => {
    updateCartItemQuantity({
      itemId,
      isDeal,
      item_attributes,
      updateBy,
      isIncrement: 2,
    });
  };

  const incrementCartItemQuantity = ({
    itemId,
    isDeal,
    item_attributes,
    updateBy,
  }: ICartUpdateParamsBase) => {
    updateCartItemQuantity({
      itemId,
      isDeal,
      item_attributes,
      updateBy,
      isIncrement: 0,
    });
  };

  const decrementCartItemQuantity = ({
    itemId,
    isDeal,
    item_attributes,
    updateBy,
  }: ICartUpdateParamsBase) => {
    updateCartItemQuantity({
      itemId,
      isDeal,
      item_attributes,
      updateBy,
      isIncrement: 1,
    });
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    currentStep,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    setCartItemQuantity,
    setCurrentStep,
    setWholeCart: saveCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
