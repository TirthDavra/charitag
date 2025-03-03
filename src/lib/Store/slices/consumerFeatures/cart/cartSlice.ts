// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartData, ICartItem, ICartItemDeal } from "@/api/user/types";
import { addFloats, additiveMultiplication } from "@/utils/basicfunctions";
import { Option } from "@/components/ui/multiple-selector";

export interface IAddToCartParameters {
  item: ICartItem;
  quantity: number;
  increment: 0 | 1;
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

interface CartState {
  cart: ICartData;
  currentStep: number;
}
const defaultCart: ICartData = {
  id: null,
  sub_total: 0,
  total: 0,
  cart_items: [],
  charity: [],
};

const initialState: CartState = {
  cart: defaultCart,
  currentStep: 0,
};

const findIndexOfCartItem = (
  cart: ICartData,
  isDeal: boolean,
  id: number | null,
  item_attributes: string | null,
) => {
  if (id === null) return -1;
  return isDeal
    ? cart.cart_items.findIndex((_item) => _item.deal_id === id)
    : cart.cart_items.findIndex(
        (_item) =>
          _item.product_id === id && _item?.item_attributes === item_attributes,
      );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCurrentStepAction: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    incrementCurrentStepAction: (state) => {
      state.currentStep = state.currentStep + 1;
    },
    setWholeCart: (state, action: PayloadAction<ICartData>) => {
      state.cart = action.payload;
      state.currentStep = 0;
    },
    setCartSlice: (state, action: PayloadAction<CartState>) => {
      state = action.payload;
      state.currentStep = 0;
    },
    clearCart: (state) => {
      state.cart = defaultCart;
    },
    addToCart: (state, action: PayloadAction<IAddToCartParameters>) => {
      const { item, quantity, increment } = action.payload;
      const isItemDeal = (item: ICartItem): item is ICartItemDeal => {
        return (item as ICartItemDeal)?.deal_id !== null;
      };

      const existingItemIndex = findIndexOfCartItem(
        state.cart,
        isItemDeal(item),
        item.id,
        item.item_attributes,
      );

      const currentQuantity =
        existingItemIndex !== -1
          ? state.cart.cart_items[existingItemIndex].quantity
          : 0;

      const newQuantity = increment
        ? currentQuantity + quantity
        : Math.max(0, currentQuantity - quantity);

      if (existingItemIndex !== -1) {
        state.cart.cart_items[existingItemIndex].quantity = newQuantity;
      } else {
        state.cart.cart_items.push({ ...item, quantity: newQuantity });
      }

      state.cart.sub_total = addFloats(
        state.cart.sub_total,
        additiveMultiplication(quantity, Number(item.price.sale_price)),
      );
      state.cart.total = state.cart.sub_total;

      // if (typeof window !== "undefined") {
      //   localStorage.setItem("cart", JSON.stringify(state.cart));
      // }
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<ICartUpdateParams>,
    ) => {
      const { itemId, isDeal, item_attributes, updateBy, isIncrement } =
        action.payload;

      const itemIndex = findIndexOfCartItem(
        state.cart,
        isDeal,
        itemId,
        item_attributes,
      );

      if (itemIndex !== -1) {
        const itemInCart = state.cart.cart_items[itemIndex];
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

        state.cart.cart_items[itemIndex].quantity = newQuantity;
        state.cart.sub_total = addFloats(
          state.cart.sub_total,
          additiveMultiplication(
            quantityDifference,
            Number(itemInCart.price.sale_price) || 0,
          ),
        );
        state.cart.total = state.cart.sub_total;
      }
    },
    removeFromCartAction: (
      state,
      action: PayloadAction<{
        itemId: number;
        item_attributes: string | null;
        isDeal: boolean;
      }>,
    ) => {
      const { itemId, item_attributes, isDeal } = action.payload;
      const itemIndex = findIndexOfCartItem(
        state.cart,
        isDeal,
        itemId,
        item_attributes,
      );

      if (itemIndex !== -1) {
        const itemToRemove = state.cart.cart_items[itemIndex];
        state.cart.cart_items.splice(itemIndex, 1);

        state.cart.sub_total = addFloats(
          state.cart.sub_total,
          -additiveMultiplication(
            Number(itemToRemove.quantity),
            Number(itemToRemove.price.sale_price),
          ),
        );
        state.cart.total = state.cart.sub_total;

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.cart));
        }
      }
    },
  },
});

export const {
  setCurrentStepAction,
  setWholeCart,
  clearCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCartAction,
  incrementCurrentStepAction,
  setCartSlice,
} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
