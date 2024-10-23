import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";
import Pagination from "../components/admin/Pagination";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [searchParams] = useSearchParams();

  const { isLoading, data, isError, error } = useMyOrdersQuery({
    userId: user?._id!, page: searchParams.get("page") || '',
  });

  const [rows, setRows] = useState<DataType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                    ? "green"
                    : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link className="text-md font-medium py-1 px-2 rounded-md bg-blue-200 hover:bg-blue-300" to={`/order/${i._id}`}>Details</Link>,
        }))
      );
      setTotalPages(data.totalPages);
      setTotalItems(data.totalOrders);
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "My Orders",
    isLoading,
    totalItems,

  )();
  return (
    <div className="min-h-[90vh] mx-24">
     <main>{Table}
        <Pagination totalPages={totalPages} />

      </main>
    </div>
  );
};

export default Orders;
