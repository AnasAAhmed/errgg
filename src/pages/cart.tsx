import axios from "axios";
import { useEffect, useState } from "react";
import { VscCheck, VscError } from "react-icons/vsc";
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
import { FaSpinner } from "react-icons/fa";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);
  const [isValidCouponCode, setIsValidCouponCode] = useState<string>('');

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
    if (!couponCode) return;
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    setLoad(true)
    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          setIsValidCouponCode(res.data.message);
          dispatch(discountApplied(res.data.discount));
          dispatch(calculatePrice());
          setLoad(false);
        })
        .catch((res) => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(res.data.message);
          toast.success(res.statusText)
          setLoad(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode('');
      setLoad(false);
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
      if (differenceInDays >= 6) {
        dispatch(resetCart());
      }
    }
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-[80vh] gap-8 my-8 px-4 lg:px-12">
        <main className="flex-1">
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
            <h1 className="text-3xl font-bold text-gray-800 text-center mt-8">No Items Added</h1>
          )}
        </main>

        <aside className="lg:w-1/3 animate-menu">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-xl font-semibold text-gray-800">Order Summary</p>
            <div className="mt-6 space-y-4">
              <p>Subtotal: <span className="font-semibold">${subtotal}</span></p>
              <p>Shipping Charges: <span className="font-semibold">${shippingCharges}</span></p>
              <p>Tax: <span className="font-semibold">${tax}</span></p>
              <p>Discount: <span className="font-semibold text-red-500">-${discount}</span></p>
              <p className="mt-4 text-lg font-bold">Total: <span className="font-semibold">${total}</span></p>
            </div>

            <div className="flex flex-col mt-6 items-center">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="h-12 px-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              {load ? (
                <FaSpinner className="animate-spin my-3 text-indigo-500" />
              ) : couponCode && (
                isValidCouponCode &&
                <span className="self-center mt-3 block" style={{ color: isValidCouponCode === "Invalid Coupon" ? 'red' : 'green' }}>
                  {isValidCouponCode}
                  {isValidCouponCode === "Invalid Coupon" ? <VscError /> : <VscCheck />}
                </span>
              )}

              <Link
                to={`${cartItems.length > 0 ? "/shipping" : "/cart"}`}
                className={`${cartItems.length > 0 ? "" : "cursor-not-allowed"} mt-6 inline-block bg-indigo-600 text-white text-lg font-medium px-6 py-3 rounded-lg hover:bg-indigo-500 transition-all duration-300`}
              >
                Checkout
              </Link>
            </div>
          </div>
        </aside>
      </div>
      <Footer />

    </>
  );
};

export default Cart;
