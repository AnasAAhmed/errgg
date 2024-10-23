import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { RootState, server } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { CopyText } from "../../utils/function";
import { slugify } from "../../utils/features";
import Pagination from "../../components/admin/Pagination";

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
  const [searchParams] = useSearchParams();

  const { isLoading, isError, error, data } = useAllProductsQuery({
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
        data.products.map((i) => ({
          photo: <img src={`${server}/${i.photos[0]}`} />,
          name: <Link to={`/product/${slugify(i.name)}`} className="text-md font-medium line-clamp-2 max-w-80 hover:text-indigo-500">{i.name}</Link>,
          productId: <div className="truncate w-24"><CopyText text={i._id} />...</div>,
          price: i.price,
          stock: i.stock,
          action: <Link className="text-md font-medium py-1 px-2 rounded-md bg-blue-200 hover:bg-blue-300" to={`/admin/product/${slugify(i.name)}`}>Manage</Link>,
        }))
      );
      setTotalPages(data.totalPages);
      setTotalItems(data.totalProducts);
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    isLoading,
    totalItems,
    true
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main >
        {Table}
        <Pagination totalPages={totalPages} />
      </main>
      <Link to="/admin/product/new" className="fixed right-8 top-20 w-24 gap-2 h-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:opacity-80">
        Create <FaPlus />
      </Link>
    </div>
  );
};

export default Products;

