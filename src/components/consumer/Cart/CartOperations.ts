import {
  addOrUpdateCartItems,
  deleteCartItemById,
  ICartItemQuantity,
  updateCartItem,
} from "@/api/user/cart";
import { ICartData, ICartItem, ICartItemDeal } from "@/api/user/types";
import {
  incrementCurrentStepAction,
  removeFromCartAction,
  setCurrentStepAction,
  setWholeCart,
  updateCartItemQuantity,
} from "@/lib/Store/slices/consumerFeatures/cart/cartSlice";
import { getStore } from "@/lib/Store/store";
import {
  addFloats,
  additiveMultiplication,
  parseMsg,
} from "@/utils/basicfunctions";
import { debounce } from "lodash";
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";

export interface IAddToCartParameters {
  item: ICartItem;
  quantity: number;
  increment: 0 | 1;
  delay?: number;
  authorized: boolean;
}

export interface ICartUpdateParams extends ICartUpdateParamsBase {
  isIncrement: 0 | 1 | 2;
}

export interface ICartUpdateParamsBase {
  itemId: number;
  isDeal: boolean;
  item_attributes: string | null;
  updateBy: number;
  authorized: boolean;
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
const store = getStore();

const findIndexOfCartItem = (
  isDeal: boolean,
  id: number | null,
  item_attributes: string | null,
) => {
  if (id === null) return -1;
  const cart = store.getState().consumer.cart.cart;
  return isDeal
    ? cart.cart_items.findIndex((_item) => _item.deal_id === id)
    : cart.cart_items.findIndex(
        (_item) =>
          _item.product_id === id && _item?.item_attributes === item_attributes,
      );
};
export const addToCart = async ({
  item,
  quantity,
  increment,
  authorized,
}: IAddToCartParameters) => {
  const cart = store.getState().consumer.cart.cart;
  const isItemDeal = isDealTypeGuard(item);
  const existingItemIndex = findIndexOfCartItem(
    isItemDeal,
    item.id,
    item.item_attributes,
  );

  const currentQuantity =
    existingItemIndex !== -1 ? cart.cart_items[existingItemIndex].quantity : 0;

  const cartItem: ICartItemQuantity = {
    product_id: item.id,
    quantity: increment
      ? currentQuantity + quantity
      : Math.max(0, currentQuantity - quantity),
    item_attributes: item.item_attributes,
  };
  const session = await getSession();
  if (session?.user.token) {
    const response = await addOrUpdateCartItems([cartItem]);
    if (!response.error) {
      store.dispatch(
        setWholeCart({
          id: response.data.data.id,
          sub_total: Number(response.data.data.sub_total),
          total: Number(response.data.data.total),
          cart_items: response.data.data.cart_items,
          charity: response.data.data.charity,
        }),
      );
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
    store.dispatch(setWholeCart(updatedCart));
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

    store.dispatch(setWholeCart(updatedCart));
    return { message: "Item successfully added to your cart!", error: false };
  }
};

export interface IUpdateCartItemArgs {
  cart_id: number | null;
  quantity: number;
}
const _updateCartItemQuantity = async ({
  itemId,
  isDeal,
  item_attributes,
  updateBy,
  isIncrement, // 0 = increment, 1 = decrement, 2 = set quantity
  authorized,
}: ICartUpdateParams) => {
  const cart = store.getState().consumer.cart.cart;

  store.dispatch(
    updateCartItemQuantity({
      itemId,
      isDeal,
      item_attributes,
      updateBy,
      isIncrement,
    }),
  );

  const itemIndex = findIndexOfCartItem(isDeal, itemId, item_attributes);

  if (itemIndex !== -1) {
    const itemInCart = cart.cart_items[itemIndex];
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

    if (authorized) {
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

export const removeFromCart = async (
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
  const itemIndex = findIndexOfCartItem(isDeal, itemId, item_attributes);
  store.dispatch(removeFromCartAction({ itemId, item_attributes, isDeal }));
  if (itemIndex !== -1) {
    const session = await getSession();
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

export const clearCart = () => {
  store.dispatch(setWholeCart(defaultCart));
};

export const setCartItemQuantity = ({
  itemId,
  isDeal,
  item_attributes,
  updateBy,
  authorized,
}: ICartUpdateParamsBase) => {
  _updateCartItemQuantity({
    itemId,
    isDeal,
    item_attributes,
    updateBy,
    isIncrement: 2,
    authorized,
  });
};

export const incrementCartItemQuantity = ({
  itemId,
  isDeal,
  item_attributes,
  updateBy,
  authorized,
}: ICartUpdateParamsBase) => {
  _updateCartItemQuantity({
    itemId,
    isDeal,
    item_attributes,
    updateBy,
    isIncrement: 0,
    authorized,
  });
};

export const decrementCartItemQuantity = ({
  itemId,
  isDeal,
  item_attributes,
  updateBy,
  authorized,
}: ICartUpdateParamsBase) => {
  _updateCartItemQuantity({
    itemId,
    isDeal,
    item_attributes,
    updateBy,
    isIncrement: 1,
    authorized,
  });
};

export const setCurrentStep = (step: number) => {
  store.dispatch(setCurrentStepAction(step));
};

export const incrementCurrentStep = () => {
  store.dispatch(incrementCurrentStepAction());
};
