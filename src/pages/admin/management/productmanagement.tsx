import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSpinner, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { Skeleton } from "../../../components/loader";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState, server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { CopyText } from "../../../utils/function";

const Productmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { price, cutPrice, photo, description, name, stock, category, collections, size, color } = data?.product || {
    photo: "",
    category: "",
    collections: "",
    name: "",
    description: "",
    stock: 0,
    price: 0,
    cutPrice: 0,
    size: [],
    color: [],
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [cutpriceUpdate, setCutPriceUpdate] = useState<number>(cutPrice);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [collectionsUpdate, setCollectionsUpdate] = useState<string>(collections);
  const [sizeUpdate, setSizeUpdate] = useState<string[]>(size);
  const [colorUpdate, setColorUpdate] = useState<string[]>(color);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [load, setLoad] = useState<boolean>(false);
  const [loadDel, setLoadDel] = useState<boolean>(false);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (descriptionUpdate) formData.set("description", descriptionUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (cutpriceUpdate) formData.set("cutPrice", cutpriceUpdate.toString());
    if (stockUpdate !== undefined) formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);
    if (collectionsUpdate) formData.set("collections", collectionsUpdate);
    if (sizeUpdate.length > 0) {
      sizeUpdate.forEach((s, index) => {
        formData.append(`size[${index}]`, s);
      });
    }
    if (colorUpdate.length > 0) {
      colorUpdate.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    }
    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });
    setLoad(false);

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    setLoadDel(true)
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });
    setLoadDel(false)

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setDescriptionUpdate(data.product.description);
      setPriceUpdate(data.product.price);
      setCutPriceUpdate(data.product.cutPrice);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setCollectionsUpdate(data.product.collections);
      setSizeUpdate(data.product.size);
      setColorUpdate(data.product.color);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="">
        <Link to={"/admin/product"} className="flex items-center text-blue-500 mb-4">
          <FaArrowLeft className="mr-1" /> Back
        </Link>
        <h2 className="heading">Manage-Product</h2>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section className="flex flex-wrap justify-between items-center mx-2">

              <strong className="my-3 sm:my-0"><CopyText text={data?.product._id} heading={"ProductID -"} /></strong>
              {stock > 0 ? (
                <>
                  {stock < 6 ? (
                    <span className="red my-3 sm:my-0">{stock} Low Stock</span>
                  ) : (
                    <span className="green my-3 sm:my-0">{stock} Available</span>
                  )}
                </>) : (
                <span className="red my-3 sm:my-0">Not Available</span>

              )}

              <button className="bg-red-500 my-3 sm:my-0 w-24 mt-2 h-10 text-white text-lg rounded-md mx-2 font-semibold" onClick={deleteHandler}>
              {loadDel ? <FaSpinner className='animate-spin text-2xl mx-auto ' /> : "Delete"}
              </button>
            </section>
            <article>
              <form onSubmit={submitHandler} className="grid grid-cols-2 gap-2 sm:gap-4 mx-2 mb-12">

                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Description</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Description"
                    value={descriptionUpdate}
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Cut Price</label>
                  <input
                    type="number"
                    placeholder="Cut Price"
                    value={cutpriceUpdate}
                    onChange={(e) => setCutPriceUpdate(Number(e.target.value))}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
                  />
                </div>
                <div>
                  <label>collections</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={collectionsUpdate}
                    onChange={(e) => setCollectionsUpdate(e.target.value)}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Size (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="eg. 0(stock),S(size),0(stock), M(size),0(stock), L(size)"
                    value={sizeUpdate.join(",")}
                    onChange={(e) => setSizeUpdate(e.target.value.split(",").map(item => item.trim()))}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Color (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="eg. 0(stock),Red(color),0(stock), Blue(color),0(stock), Green(color),0(stock) or hex: #000000(color)"
                    value={colorUpdate.join(",")}
                    onChange={(e) => setColorUpdate(e.target.value.split(",").map(item => item.trim()))}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Update Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>

                <div className="relative">
                  <img src={`${server}/${photo}`} alt="New Image" className="w-24 border-2 h-24 object-cover" />
                  <span className="absolute top-1  bg-blue-500 text-white rounded-full px-2 text-xs">Old</span>
                </div>

                <div className="relative">
                  <img src={photoUpdate ? photoUpdate : "https://raw.githubusercontent.com/AnasAAhmed/Imagerator/main/frontend/src/assets/preview.png"} alt="New Image" className="w-24 border-2 sm:ml-6 h-24 object-cover" />
                  <span className="absolute top-1 bg-blue-500 text-white rounded-full px-2 text-xs">New</span>
                  {photoUpdate ? <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-4 py-2 text-xs cursor-pointer" onClick={() => { setPhotoUpdate(""); setPhotoFile(null) }}><FaTrash /></span> : ""}
                </div>
                <button type="submit" className="bg-blue-500 w-56 h-10 my-11 flex justify-center items-center text-white text-lg rounded-md font-semibold">{load ? <FaSpinner className='animate-spin text-2xl mx-3 ' /> : "Update"}</button>

              </form>

            </article>
          </>
        )}
      </main>
    </div >
  );
};

export default Productmanagement;
