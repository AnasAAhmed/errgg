import { Link, Navigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/loader";
import {
  useOrderDetailsQuery,
} from "../redux/api/orderAPI";
import {
  RootState,
  server
} from "../redux/store";
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
};

const OrderDetails = () => {

  const params = useParams();
  //   const navigate = useNavigate();
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
    <div className="user-container ">
      <Link to={"/orders"} className="flex items-center text-blue-500 mb-4">
        <FaArrowLeft className="mr-1" /> Back
      </Link>

      <main className="flex flex-col items-start">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <section className="w-full px-2 md:px-8 ">
              <h2 className="text-2xl font-bold mb-4">Order Items</h2>
              <div className="">
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

            <article className="p-8">
              <h1 className="text-2xl font-bold mb-4">Order Info</h1>
              <h5 className="font-bold mb-2">User Info</h5>
              <p>Name: {name}</p>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
              <p>
                Address: {`${address}, city: ${city}, state: ${state}, country: ${country} pinCode: ${pinCode}`}
              </p>
              <h5 className="font-bold mt-4">Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p className="font-bold mt-4">Total: {total}</p>
              <h5 className="font-bold mt-4">Status Info</h5>
              <p className={status === "Delivered" ? "text-purple-500" : status === "Shipped" ? "text-green-500" : "text-red-500"}>
                Status: {status}
              </p>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

const OrderProductCard = ({
  name,
  photo,
  price,
  quantity,
  productId,
  size,
  color,
}: OrderItem) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (



    <div className="flex flex-col xsm:flex-row justify-between items-center border-b">
      <img src={photo} className="w-16 h-16 rounded-md mr-1 xsm:w-24 xsm:h-24" alt={name} />
      <Link to={`/product/${slugify(name)}?id=${productId}`} className="line-clamp-2 max-xsm:text-center w-[60%]">{name}</Link>
      <span>
        ${price} X {quantity} =${price * quantity}
      </span>
      <div className="flex flex-wrap justify-between items-center ml-2">
        {size !== undefined && <span className="text-gray-500 mr-1">Size: {size}</span>}

        {color !== undefined && <span className="text-gray-500 ">Color:<span className="rounded-full ml-2 px-[11px] py-[0.5px] " style={{ backgroundColor: color }}></span></span>}

      </div>
      <div >
        <ReviewForm user={user} productId={productId} />
        <Link to={`/product/${slugify(name)}?id=${productId}`} className="text-sm text-gray-500 mb-4 hover:text-blue-500">Go to Product details to edit review</Link>
      </div>

    </div>
  );
};
export default OrderDetails