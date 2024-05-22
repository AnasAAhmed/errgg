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
import { BsSearch } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

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
    Header: "Avatar",
    accessor: "avatar",
  },
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

  const [searchId, setSearchId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const { isLoading, data, isError, error } = useAllUsersQuery({
    id: user?._id,
    email: email,
    searchId: searchId
  });

  const [rows, setRows] = useState<DataType[]>([]);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user completely?");
    if (confirmed) {
      setLoading(true);
      const res = await deleteUser({ userId, adminUserId: user?._id! });
      responseToast(res, null, "");
      setLoading(false);
    } else {
      // User cancelled the deletion, do nothing
    }
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }



  useEffect(() => {
    if (data)
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
              {loading ? <FaSpinner className="animate-spin mr-2" /> : <FaTrash/>}
            </button>
          ),
          details: (
            <UserModal user={i} heading={<FaEdit />} />
          )
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />

      <main>
        <div className="bar">
          <BsSearch size="2rem" />
          <input type="text"
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Search By id"
          />
          <MdOutlineEmail size="3rem" />
          <input type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Search By email"
          />
        </div>
        {isLoading ? <FaSpinner className="animate-spin h-44 w-44 my-40 mx-auto text-gray-500" /> : Table}
      </main>
    </div>
  );
};

export default Customers;



