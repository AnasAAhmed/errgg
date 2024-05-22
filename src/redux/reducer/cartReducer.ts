import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const CART_ITEMS_KEY = "cartItems";
const CART_TIMESTAMP_KEY = "cartTimestamp";
const CART_EXPIRATION_DAYS = 15;

const loadCartItems = (): CartItem[] => {
  try {
    const serializedCartItems = localStorage.getItem(CART_ITEMS_KEY);
    const timestamp = localStorage.getItem(CART_TIMESTAMP_KEY);
    if (serializedCartItems && timestamp) {
      const cartTimestamp = new Date(JSON.parse(timestamp));
      const now = new Date();
      const differenceInDays = (now.getTime() - cartTimestamp.getTime()) / (1000 * 3600 * 24);
      if (differenceInDays < CART_EXPIRATION_DAYS) {
        return JSON.parse(serializedCartItems);
      }
    }
    return [];
  } catch (error) {
    console.error("Could not load cart items from localStorage:", error);
    return [];
  }
};

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: loadCartItems(),
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

const saveCartItems = (cartItems: CartItem[]) => {
  try {
    const serializedCartItems = JSON.stringify(cartItems);
    const timestamp = JSON.stringify(new Date().toISOString());
    localStorage.setItem(CART_ITEMS_KEY, serializedCartItems);
    localStorage.setItem(CART_TIMESTAMP_KEY, timestamp);
  } catch (error) {
    console.error("Could not save cart items to localStorage:", error);
  }
};

const clearCartItems = () => {
  localStorage.removeItem(CART_ITEMS_KEY);
  localStorage.removeItem(CART_TIMESTAMP_KEY);
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload;
      else state.cartItems.push(action.payload);
      saveCartItems(state.cartItems);
      state.loading = false;
    },

    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      saveCartItems(state.cartItems);
      state.loading = false;
    },

    calculatePrice: (state) => {
      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 20 ? 0 : 50;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.tax + state.shippingCharges - state.discount;
    },

    discountApplied: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => {
      clearCartItems();
      return { ...initialState, cartItems: [] };
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;
