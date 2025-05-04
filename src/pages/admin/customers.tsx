import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaEdit, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";
import UserModal from "../../components/UserModal";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/admin/Pagination";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
  details: ReactElement;
}

const columns: Column<DataType>[] = [

  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
  {
    Header: "Details",
    accessor: "details",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [searchParams] = useSearchParams();


  const { isLoading, data, isError, error ,refetch} = useAllUsersQuery({
    id: user!._id,
    key: searchParams.get("key") || '',
    query: searchParams.get("query") || '',
    page: searchParams.get("page") || '',
  });

  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [rows, setRows] = useState<DataType[]>([]);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user completely?");
    if (confirmed) {
      setLoading(true);
      const res = await deleteUser({ userId, adminUserId: user?._id! });
      responseToast(res, null, "");
      setLoading(false);
    }
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }



  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={i.photo}
              alt={i.name}
            />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (

            <button onClick={() => deleteHandler(i._id)}>
              {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaTrash />}
            </button>
          ),
          details: (
            <UserModal user={i} heading={<FaEdit />} />
          )
        }))
      );
      setTotalPages(data.totalPages);
      setTotalItems(data.totalUsers);
    }
  }, [data]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    isLoading,
    totalItems,
    true,
    refetch
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {Table}
        <Pagination totalPages={totalPages} />
        </main>
    </div>
  );
};

export default Customers;



