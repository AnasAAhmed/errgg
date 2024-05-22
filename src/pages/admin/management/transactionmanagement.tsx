import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderAPI";
import { RootState, server } from "../../../redux/store";
import { Order, OrderItem } from "../../../types/types";
import { responseToast } from "../../../utils/features";
import {CopyText} from "../../../utils/function";

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

const TransactionManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, data, isError } = useOrderDetailsQuery(params.id!);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name, _id, email, phone },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  if (isError) return <Navigate to={"/404"} />;

  return (
   
    <div className="admin-container flex">
  <AdminSidebar />
  <main className="flex flex-col items-start w-full">
    <Link to={"/admin/transaction"} className="flex items-center text-blue-500 mb-4">
      <FaArrowLeft className="mr-1" /> Back
    </Link>
    {isLoading ? (
      <Skeleton />
    ) : (
      <>
        <section className="w-full px-2">
          <h2 className="text-2xl font-bold mb-4">Order Items</h2>
          <button className="text-white bg-black p-2 rounded-full mb-4" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <div className="space-y-4">
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
                style={i.style}
                color={i.color}
              />
            ))}
          </div>
        </section>

        <article className="p-8 w-full bg-gray-100 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Order Info</h1>
          <h5 className="font-bold mb-2">User Info</h5>
          <p>Name: {name}</p>
          <CopyText text={_id} heading={"UserId:"} />
          <p>Email: {email}</p>
          <CopyText text={phone} heading={"Phone:"} />
          <p className="text-gray-700">
            Address: {`${address}, city: ${city}, state: ${state}, country: ${country} pinCode: ${pinCode}`}
          </p>
          <h5 className="font-bold mt-4">Amount Info</h5>
          <p>Subtotal: ${subtotal}</p>
          <p>Shipping Charges: ${shippingCharges}</p>
          <p>Tax: ${tax}</p>
          <p>Discount: ${discount}</p>
          <p className="font-bold mt-4">Total: ${total}</p>
          <h5 className="font-bold mt-4">Status Info</h5>
          <p className={status === "Delivered" ? "text-purple-500" : status === "Shipped" ? "text-green-500" : "text-red-500"}>
            Status: {status}
          </p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={updateHandler}>
            Process Status
          </button>
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
  style,
  color,
}: OrderItem) => (
  <div className="flex flex-row justify-between items-center">
  <img src={photo} className="w-16 h-16 rounded-md mr-1 sm:w-24 sm:h-24" alt={name} />
  <Link to={`/product/${productId}`} className="line-clamp-2 w-full">{name}</Link>
  <span>${price} X {quantity} = ${price * quantity}</span>
  <div className="flex flex-wrap justify-between items-center ml-2">
    {size !== '' && <span className="text-gray-500 mr-2">Size: {size}</span>}
    {color !== '' && (
      <span className="text-gray-500 mr-2">Color:
        <span className="rounded-full ml-1 px-2 py-0.5" style={{ backgroundColor: color }}></span>
      </span>
    )}
    {style !== '' && <span className="text-gray-500">Style: {style}</span>}
  </div>
</div>

);

export default TransactionManagement;
