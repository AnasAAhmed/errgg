import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/cart-item";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
  resetCart,
} from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import { CartItem } from "../types/types";
import { toast } from "react-hot-toast";
import Footer from "../components/Footer";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return toast.error("Out of Stock");

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  // Clear cart if expired
  useEffect(() => {
    const timestamp = localStorage.getItem("cartTimestamp");
    if (timestamp) {
      const cartTimestamp = new Date(JSON.parse(timestamp));
      const now = new Date();
      const differenceInDays = (now.getTime() - cartTimestamp.getTime()) / (1000 * 3600 * 24);
      if (differenceInDays >= 15) {
        dispatch(resetCart());
      }
    }
  }, [dispatch]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-8 mx-auto max-w-7xl px-4">
        <main className="lg:col-span-2 min-h-[80vh]">
          {cartItems.length > 0 ? (
            cartItems.map((i, idx) => (
              <CartItemCard
                incrementHandler={incrementHandler}
                decrementHandler={decrementHandler}
                removeHandler={removeHandler}
                key={idx}
                cartItem={i}
              />
            ))
          ) : (
            <h1 className="text-2xl font-bold text-gray-800">No Items Added</h1>
          )}
        </main>
        <aside>
          <div className="bg-white p-6 rounded-lg shadow-lg lg:fixed">
            <p className="text-lg font-semibold text-gray-800">Order Summary</p>
            <p className="mt-4">Subtotal: <span className="font-semibold">${subtotal}</span></p>
            <p>Shipping Charges: <span className="font-semibold">${shippingCharges}</span></p>
            <p>Tax: <span className="font-semibold">${tax}</span></p>
            <p>Discount: <span className="font-semibold text-red-500">-${discount}</span></p>
            <p className="mt-4"><b>Total: <span className="font-semibold">${total}</span></b></p>

            <div className="flex flex-row justify-center items-center">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="h-11 px-2 border border-gray-300 rounded-lg"
              />
              {couponCode && (
                isValidCouponCode ? (
                  <span className="text-green-500 mt-2 block">-${discount} off using the <code>{couponCode}</code></span>
                ) : (
                  <span className="text-red-500 mt-2 block">Invalid Coupon <VscError /></span>
                )
              )}
              <Link to={`${cartItems.length > 0 ? "/shipping" : "/cart"}`} className={`${cartItems.length > 0 ? "" : "cursor-not-allowed"} my-6 mx-2 inline-blockbg-indigo-500 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500`}>Checkout</Link>
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
