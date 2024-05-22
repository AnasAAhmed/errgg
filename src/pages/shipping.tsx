import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/reducer/cartReducer";
import { RootState, server } from "../redux/store";
import Footer from "../components/Footer";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <>
      <div className="flex justify-center min-h-[80vh]">
        <button className="back-btn " onClick={() => navigate("/cart")}>
          <BiArrowBack />
        </button>

        <form onSubmit={submitHandler} className="flex flex-col items-center mt-6 justify-stretch py-8 px-4 w-full max-w-[450px]">
          <h1 className="text-4xl font-semibold mb-8 text-center">Shipping Address</h1>

          <input
            required
            type="text"
            placeholder="Address"
            name="address"
            className="border border-gray-300 rounded-lg py-3 px-4 mb-4 w-full focus:outline-none text-lg"
            value={shippingInfo.address}
            onChange={changeHandler}
          />

          <input
            required
            type="text"
            placeholder="City"
            name="city"
            className="border border-gray-300 rounded-lg py-3 px-4 mb-4 w-full focus:outline-none text-lg"
            value={shippingInfo.city}
            onChange={changeHandler}
          />

          <input
            required
            type="text"
            placeholder="State"
            name="state"
            className="border border-gray-300 rounded-lg py-3 px-4 mb-4 w-full focus:outline-none text-lg"
            value={shippingInfo.state}
            onChange={changeHandler}
          />

          <select
            name="country"
            required
            className="border  border-gray-300 rounded-lg py-3 px-4 mb-4 w-full focus:outline-none text-lg"
            value={shippingInfo.country}
            onChange={changeHandler}
          >
            <option value="">Choose Country</option>
            <option value="pakistan">Pakistan</option>
          </select>

          <input
            required
            type="number"
            placeholder="Pin Code"
            name="pinCode"
            className="border border-gray-300 rounded-lg py-3 px-4 mb-4 w-full focus:outline-none text-lg"
            value={shippingInfo.pinCode}
            onChange={changeHandler}
          />

          <button type="submit" className="py-3 px-6 rounded-lg uppercase text-lg font-semibold bg-blue-500 text-white shadow-md transition duration-300 ease-in-out hover:opacity-80">Pay Now</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
