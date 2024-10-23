import { Link, Navigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/loader";
import { useOrderDetailsQuery } from "../redux/api/orderAPI";
import { RootState, server } from "../redux/store";
import { Order, OrderItem } from "../types/types";
import { FaArrowLeft } from "react-icons/fa";
import ReviewForm from "../components/ReviewForm";
import { useSelector } from "react-redux";
import { slugify } from "../utils/features";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "", email: "", phone: 0 },
  _id: "",
  createdAt: new Date()
};

const OrderDetails = () => {
  const params = useParams();
  const { isLoading, data, isError } = useOrderDetailsQuery(params.id!);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name, email, phone },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="user-container px-4 lg:px-0 py-8">
      <Link to={"/orders"} className="flex items-center text-blue-600 mb-8 hover:underline">
        <FaArrowLeft className="mr-2" /> Back to Orders
      </Link>

      <main className="flex flex-col items-start space-y-12">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <section className="w-full">
              <h2 className="text-3xl font-semibold mb-6">Order Items</h2>
              <div className="space-y-6">
                {orderItems.map((i) => (
                  <OrderProductCard
                    key={i._id}
                    name={i.name}
                    photo={`${server}/${i.photo}`}
                    productId={i.productId}
                    _id={i._id}
                    quantity={i.quantity}
                    price={i.price}
                    cutPrice={i.cutPrice}
                    size={i.size}
                    color={i.color}
                  />
                ))}
              </div>
            </section>

            <section className="w-full bg-gray-50 p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-semibold mb-4">Order Info</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold mb-2">User Info</h5>
                  <p className="text-gray-600">Name: {name}</p>
                  <p className="text-gray-600">Email: {email}</p>
                  <p className="text-gray-600">Phone: {phone}</p>
                  <p className="text-gray-600">
                    Address: {`${address}, ${city}, ${state}, ${country} - ${pinCode}`}
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Amount Info</h5>
                  <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
                  <p className="text-gray-600">Shipping Charges: ${shippingCharges.toFixed(2)}</p>
                  <p className="text-gray-600">Tax: ${tax.toFixed(2)}</p>
                  <p className="text-gray-600">Discount: ${discount.toFixed(2)}</p>
                  <p className="font-semibold text-lg mt-4">Total: ${total.toFixed(2)}</p>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Status Info</h5>
                  <p
                    className={`text-lg ${status === "Delivered"
                        ? "text-green-500"
                        : status === "Shipped"
                          ? "text-blue-500"
                          : "text-red-500"
                      }`}
                  >
                    Status: {status}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

const OrderProductCard = ({ name, photo, price, quantity, productId, size, color }: OrderItem) => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between border-b py-4">
      <img
        src={photo}
        className="w-20 h-20 rounded-md object-cover mb-4 md:mb-0"
        alt={name}
      />
      <Link
        to={`/product/${slugify(name)}?id=${productId}`}
        className="flex-1 text-gray-700 hover:text-blue-600 transition w-full md:w-auto md:pl-4"
      >
        {name}
      </Link>
      <span className="text-gray-700 font-medium">
        ${price} x {quantity} = <span className="font-semibold">${(price * quantity).toFixed(2)}</span>
      </span>
      <div className="flex flex-col md:flex-row items-center space-x-4">
        {size && <span className="text-sm text-gray-500">Size: {size}</span>}
        {color && (
          <span className="flex items-center text-sm text-gray-500">
            Color: <span className="w-4 h-4 ml-2 rounded-full" style={{ backgroundColor: color }}></span>
          </span>
        )}
      </div>
      <div className="mt-4 md:mt-0">
        <ReviewForm user={user} productId={productId} />
        <Link
          to={`/product/${slugify(name)}?id=${productId}`}
          className="text-xs text-gray-500 hover:text-blue-500"
        >
          Edit Review
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails;
