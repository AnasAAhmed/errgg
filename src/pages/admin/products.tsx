import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { RootState, server } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import {CopyText} from "../../utils/function";

interface DataType {
  photo: ReactElement;
  name: ReactElement;
  productId: ReactElement;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "ID",
    accessor: "productId",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, isError, error, data } = useAllProductsQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} />,
          name: <Link to={`/product/${i._id}`} className="text-md font-medium line-clamp-2 hover:text-indigo-500">{i.name}</Link>,
          productId: <div className="line-clamp-2"><CopyText text={i._id}/>...</div>,
          price: i.price,
          stock: i.stock,
          action: <Link className="text-md font-medium py-1 px-2 rounded-md hover:bg-black hover:text-white" to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main >{isLoading ? <FaSpinner className="animate-spin  my-44 mx-auto h-44 w-44 text-gray-500" /> : Table}</main>
      <Link to="/admin/product/new" className="fixed right-8 top-20 w-24 gap-2 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:opacity-80">
        Create <FaPlus />
      </Link>
    </div>
  );
};

export default Products;

