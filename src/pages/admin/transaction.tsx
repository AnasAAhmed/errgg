import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { DropDownAdmin } from "../../components/DropDown";
import Pagination from "../../components/admin/Pagination";

interface DataType {
  user: ReactElement;
  amount: number;
  discount: number;
  quantity: number;
  createdAt: string;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "CreatedAt",
    accessor: "createdAt",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [searchParams] = useSearchParams();

  const { isLoading, data, isError, error,refetch } = useAllOrdersQuery({
    id: user!._id,
    key: searchParams.get("key") || '',
    query: searchParams.get("query") || '',
    page: searchParams.get("page") || '',
  });

  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          user: <DropDownAdmin options={[{
            key: "name",
            value: i.user?.name
          },
          {
            key: "email",
            value: i.user?.email
          },
          {
            key: "phone",
            value: i.user?.phone
          },
          {
            key: "_id",
            value: i.user?._id
          },
          ]} />,

          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          createdAt: new Date(i.createdAt).toLocaleDateString(),
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
          action: <Link className="text-md font-medium py-1 px-2 rounded-md bg-blue-200 hover:bg-blue-300" to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
      setTotalPages(data.totalPages);
      setTotalItems(data.totalOrders);
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    isLoading,
    totalItems,
    true,
    refetch
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}
        <Pagination totalPages={totalPages} />

      </main>
    </div>
  );
};

export default Transaction;
