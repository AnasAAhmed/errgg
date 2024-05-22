// cartLocalStorage.js
const CART_STORAGE_KEY = "cartItems";

// Function to save cart items in localStorage with expiry
export const saveCartItems = (cartItems:any) => {
  const now = new Date();
  const expiryDate = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days from now
  const cartData = {
    items: cartItems,
    expiry: expiryDate.getTime(), // Store expiry date as timestamp
  };
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
};

// Function to retrieve cart items from localStorage
export const getCartItems = () => {
  const cartDataString = localStorage.getItem(CART_STORAGE_KEY);
  if (cartDataString) {
    const cartData = JSON.parse(cartDataString);
    const expiry = cartData.expiry;
    const now = new Date().getTime();
    if (now > expiry) {
      // Cart items have expired, clear localStorage
      clearCartItems();
      return [];
    }
    return cartData.items;
  }
  return [];
};

// Function to clear cart items from localStorage
export const clearCartItems = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
};