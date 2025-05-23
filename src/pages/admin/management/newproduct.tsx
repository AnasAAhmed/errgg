import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { onlyResponseToast, responseToast } from "../../../utils/features";
import { FaArrowLeft, FaSpinner, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [collections, SetCollections] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [cutPrice, setCutPrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0.3);
  const [dimensions, setDimensions] = useState<{ length: number; width: number; height: number } | null>(null);
  const [description, setDescription] = useState<string>('');
  const [stock, setStock] = useState<number>(1);
  const [variants, setVariants] = useState<Array<{ color: string; size: string; stock: number }>>([]);
  const [photoPrevs, setPhotoPrevs] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [noRedirect, setNoRedirect] = useState<boolean>(false);

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newPhotoPrevs: string[] = [];
      const newPhotos: File[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            newPhotoPrevs.push(reader.result);
            newPhotos.push(file);
            setPhotoPrevs([...photoPrevs, ...newPhotoPrevs]);
            setPhotos([...photos, ...newPhotos]);
          }
        };
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotoPrevs(photoPrevs.filter((_, i) => i !== index));
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index: number, key: 'color' | 'size' | 'stock', value: string | number) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [key]: value };
    setVariants(newVariants);
  };
  const handleDimensionsChange = (key: 'width' | 'length' | 'height', value: number) => {
    setDimensions((prev) => {
      const base = prev ?? { length: 0, width: 0, height: 0 };
      return {
        ...base,
        [key]: value,
      };
    });
  };
  const addVariant = () => {
    setVariants([...variants, { color: "", size: "", stock: 0 }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);

    const totalVariantsStock = variants.reduce((acc, variant) => acc + variant.stock, 0);

    if (totalVariantsStock > stock) {
      toast.error("Variants Total stock cannot be more than Overall stock");
      setLoad(false);
      return;
    }

    if (!name || !price || stock < 0 || !category || !photos || !description) {
      toast.error("Validation failed OR Something is missing");
      setLoad(false);
      return;
    }

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("cutPrice", cutPrice.toString());
    formData.set("description", description);
    formData.set("stock", stock.toString());
    formData.set("weight", weight.toString());
    formData.set("dimensions", JSON.stringify(dimensions));
    formData.set("category", category);
    formData.set("collections", collections);
    photos.forEach((file) => {
      formData.append("photos", file);
    });
    variants.forEach((variant, index) => {
      formData.append(`variants[${index}][size]`, variant.size);
      formData.append(`variants[${index}][color]`, variant.color);
      formData.append(`variants[${index}][stock]`, variant.stock.toString());
    });

    const res = await newProduct({ id: user?._id!, formData });
    setLoad(false);
    noRedirect ? onlyResponseToast(res) : responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <div className="flex justify-between items-center mx-3">
          <Link to={"/admin/product"} className="flex items-center text-blue-500 mb-4">
            <FaArrowLeft className="mr-1" /> Back
          </Link>
          <div className="flex items-center">
            <label htmlFor="NoRedirect" className="cursor-pointer mx-2">No-Redirect</label>
            <input id='NoRedirect' type="checkbox" onChange={() => setNoRedirect(!noRedirect)} />
          </div>
        </div>
        <article>
          <h2 className="heading">New Product</h2>
          <form onSubmit={submitHandler} className="grid grid-cols-2 gap-2 sm:gap-4 mx-2">
            <div>
              <label htmlFor="name" className="font-semibold text-sm sm:text-lg block">Name</label>
              <input
                id="name"
                required
                type="text"
                placeholder="Name"
                value={name}
                minLength={30}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
              />
            </div>
            <div>
              <label htmlFor="description" className="font-semibold text-sm sm:text-lg block">Description</label>
              <textarea
                id="description"
                required
                rows={2}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
              />
            </div>
            <div>
              <label htmlFor="price" className="font-semibold text-sm sm:text-lg block">Price</label>
              <input
                id="price"
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
              />
            </div>
            <div>
              <label htmlFor="cutPrice" className="font-semibold text-sm sm:text-lg block">Cut Price</label>
              <input
                id="cutPrice"
                type="number"
                placeholder="Cut Price"
                value={cutPrice}
                onChange={(e) => setCutPrice(Number(e.target.value))}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
              />
            </div>
            <div>
              <label htmlFor="stock" className="font-semibold text-sm sm:text-lg block">Stock</label>
              <input
                id="stock"
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
              />
            </div>
            <div>
              <label htmlFor="category" className="font-semibold text-sm sm:text-lg block">Category</label>
              <input
                id="category"
                required
                type="text"
                placeholder="eg. Laptop, Camera etc."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
              />
            </div>
            <div>
              <label htmlFor="collections" className="font-semibold text-sm sm:text-lg block">Collections</label>
              <input
                id="collections"
                type="text"
                placeholder="eg. Electronic, Crockery, Wearables etc."
                value={collections}
                onChange={(e) => SetCollections(e.target.value)}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
              />
            </div>
            <div>
              <label className="font-semibold text-sm sm:text-lg block">Variants</label>
              {variants.map((variant, index) => (
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
                    className="border border-gray-300 rounded-md w-[20%] px-3 py-2"
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
              <label className="font-semibold text-sm sm:text-lg block">Dimensions</label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  placeholder="height"
                  value={dimensions?.height}
                  onChange={(e) => handleDimensionsChange('height', Number(e.target.value))}
                  className="border border-gray-300 rounded-md w-[30%] px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="length"
                  value={dimensions?.length}
                  onChange={(e) => handleDimensionsChange('length', Number(e.target.value))}
                  className="border border-gray-300 rounded-md w-[30%] px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="width"
                  value={dimensions?.width}
                  onChange={(e) => handleDimensionsChange('width', Number(e.target.value))}
                  className="border border-gray-300 rounded-md w-[20%] px-3 py-2"
                />
              </div>

            </div>
            <div>
              <label htmlFor="weight" className="font-semibold text-sm sm:text-lg block">Weight</label>
              <input
                id="weight"
                type="text"
                placeholder="Product estimated weight"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
              />
            </div>
            <div>
              <label className="font-semibold text-sm sm:text-lg block">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={changeImageHandler}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-2"
              />
              <div className="flex gap-2 mt-2">
                {photoPrevs.map((photo, index) => (
                  <div key={index} className="relative">
                    <img src={photo} alt="Preview" className="w-24 h-24 object-cover rounded-md" />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={load}
              className="bg-blue-500 w-56 h-10 my-11 flex justify-center items-center text-white text-lg rounded-md font-semibold"
            >
              {load ? <FaSpinner className="animate-spin my-1" /> : "Create Product"}
            </button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
