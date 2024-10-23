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

  const { data, isLoading, isError } = useProductDetailsQuery({
    slug: params.slug!,
    userId: user?.role === 'admin' ? user._id : ''
  });

  const {
    price,
    cutPrice,
    photos,
    description,
    name,
    stock,
    category,
    collections,
    variants,
  } = data?.product || {
    photos: [""],
    category: "",
    collections: "",
    name: "",
    description: "",
    stock: 0,
    price: 0,
    cutPrice: 0,
    variants: [],
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [cutpriceUpdate, setCutPriceUpdate] = useState<number>(cutPrice);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [descriptionUpdate, setDescriptionUpdate] = useState<string>(description);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [collectionsUpdate, setCollectionsUpdate] = useState<string>(collections);
  const [variantsUpdate, setVariantsUpdate] = useState<Array<{ color: string; size: string; stock: number }>>(variants);
  const [photoUpdates, setPhotoUpdates] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const [load, setLoad] = useState<boolean>(false);
  const [loadDel, setLoadDel] = useState<boolean>(false);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newPhotoUpdates: string[] = [];
      const newPhotoFiles: File[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            newPhotoUpdates.push(reader.result);
            newPhotoFiles.push(file);
            setPhotoUpdates((prev) => [...prev, ...newPhotoUpdates]);
            setPhotoFiles((prev) => [...prev, ...newPhotoFiles]);
          }
        };
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotoUpdates(photoUpdates.filter((_, i) => i !== index));
    setPhotoFiles(photoFiles.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index: number, key: 'color' | 'size' | 'stock', value: string | number) => {
    const newVariants = [...variantsUpdate];
    newVariants[index] = { ...newVariants[index], [key]: value };
    setVariantsUpdate(newVariants);
  };

  const addVariant = () => {
    setVariantsUpdate([...variantsUpdate, { color: "", size: "", stock: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariantsUpdate(variantsUpdate.filter((_, i) => i !== index));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);

    const formData = new FormData();

    formData.set("name", nameUpdate);
    formData.set("description", descriptionUpdate);
    formData.set("price", priceUpdate.toString());
    formData.set("cutPrice", cutpriceUpdate.toString());
    formData.set("stock", stockUpdate.toString());
    formData.set("category", categoryUpdate);
    formData.set("collections", collectionsUpdate);
    variantsUpdate.forEach((v, index) => {
      formData.append(`variants[${index}][color]`, v.color);
      formData.append(`variants[${index}][size]`, v.size);
      formData.append(`variants[${index}][stock]`, v.stock.toString());
    });

    photoFiles.forEach((file) => {
      formData.append("photos", file);
    });

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });
    setLoad(false);

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    setLoadDel(true);
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });
    setLoadDel(false);

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
      setVariantsUpdate(data.product.variants);
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
        <h2 className="heading">Manage Product</h2>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section className="flex flex-wrap justify-between items-center mx-2">
              <strong className="my-3 sm:my-0">
                <CopyText text={data?.product._id} heading={"ProductID -"} />
              </strong>
              {stock > 0 ? (
                stock < 6 ? (
                  <span className="red my-3 sm:my-0">{stock} Low Stock</span>
                ) : (
                  <span className="green my-3 sm:my-0">{stock} Available</span>
                )
              ) : (
                <span className="red my-3 sm:my-0">Not Available</span>
              )}
              <button
                className="bg-red-500 my-3 sm:my-0 w-24 mt-2 h-10 text-white text-lg rounded-md mx-2 font-semibold"
                onClick={deleteHandler}
              >
                {loadDel ? <FaSpinner className="animate-spin text-2xl mx-auto" /> : "Delete"}
              </button>
            </section>
            <article>
              <form onSubmit={submitHandler} className="grid grid-cols-2 gap-2 sm:gap-4 mx-2 mb-12">
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    minLength={30}
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
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
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Cut Price</label>
                  <input
                    type="number"
                    placeholder="Cut Price"
                    value={cutpriceUpdate}
                    onChange={(e) => setCutPriceUpdate(Number(e.target.value))}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Collections</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={collectionsUpdate}
                    onChange={(e) => setCollectionsUpdate(e.target.value)}
                    className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Variants</label>
                  {variantsUpdate.map((variant, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Color"
                        value={variant.color}
                        onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                        className="border border-gray-300 rounded-md w-[30%] px-3 py-2"
                      />
                      <input
                        type="text"
                        placeholder="Size"
                        value={variant.size}
                        onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                        className="border border-gray-300 rounded-md w-[30%] px-3 py-2"
                      />
                      <input
                        type="number"
                        placeholder="Stock"
                        value={variant.stock}
                        onChange={(e) => handleVariantChange(index, 'stock', Number(e.target.value))}
                        className="border border-gray-300 rounded-md w-[30%] px-3 py-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addVariant}
                    className="text-blue-500 mt-2"
                  >
                    Add More
                  </button>
                </div>
                <div>
                  <label className="font-semibold text-sm sm:text-lg block">Update Photo</label>
                  <input type="file" onChange={changeImageHandler} multiple />
                </div>

                <div className="relative flex flex-wrap">
                  {photos.map((photo, index) => (
                    <img key={index} src={`${server}/${photo}`} alt="Product" className="w-24 border-2 h-24 object-cover" />
                  ))}
                  <span className="absolute top-1 bg-blue-500 text-white rounded-full px-2 text-xs">Current</span>
                </div>

                <div className="flex flex-wrap">
                  {photoUpdates.map((photoUpdate, index) => (
                    <div key={index} className="relative m-2">
                      <img
                        src={photoUpdate}
                        alt="New Image"
                        className="w-24 border-2 h-24 object-cover"
                      />
                      <span className="absolute top-1 bg-blue-500 text-white rounded-full px-2 text-xs">New</span>
                      <span
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-4 py-2 text-xs cursor-pointer"
                        onClick={() => removePhoto(index)}
                      >
                        <FaTrash />
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 w-56 h-10 my-11 flex justify-center items-center text-white text-lg rounded-md font-semibold"
                >
                  {load ? <FaSpinner className="animate-spin text-2xl mx-3" /> : "Update"}
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
