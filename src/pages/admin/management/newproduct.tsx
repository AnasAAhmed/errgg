import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";




const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [collections, SetCollections] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [cutPrice, setCutPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [size, setSize] = useState<string[]>(["s","m","l","xl","xxl"]);
  const [color, setColor] = useState<string[]>([]);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();
  const [load, setLoad] = useState<boolean>(false);

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);
    if (!name || !price || stock < 0 || !category || !photo || !description ||!collections) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("cutPrice", cutPrice.toString());
    formData.set("description", description);
    formData.set("stock", stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);
    formData.set("collections", collections);
    size.forEach((s, index) => {
      formData.append(`size[${index}]`, s);
    });
    color.forEach((c, index) => {
      formData.append(`color[${index}]`, c);
    });

    const res = await newProduct({ id: user?._id!, formData });
    setLoad(false);

    responseToast(res, navigate, "/admin/product");
  };
 
  
  return (
    <div className="admin-container">
  <AdminSidebar />
  <main >
    <Link to={"/admin/product"} className="flex items-center text-blue-500 mb-4">
      <FaArrowLeft className="mr-1" /> Back
    </Link>
    <article >
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
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
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
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
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
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
          />
        </div>
        <div>
          <label htmlFor="cutPrice" className="font-semibold text-sm sm:text-lg block">Cut Price</label>
          <input
            id="cutPrice"
            required
            type="number"
            placeholder="Cut Price"
            value={cutPrice}
            onChange={(e) => setCutPrice(Number(e.target.value))}
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
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
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
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
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
          />
        </div>
        <div>
          <label htmlFor="collections" className="font-semibold text-sm sm:text-lg block">Collections</label>
          <input
            id="collections"
            required
            type="text"
            placeholder="eg. Electronic, Crocrey, Wearables etc."
            value={collections}
            onChange={(e) => SetCollections(e.target.value)}
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
          />
        </div>
        <div>
          <label htmlFor="size" className="font-semibold text-sm sm:text-lg block">Size (comma-separated)</label>
          <input
            id="size"
            type="text"
            placeholder="eg. 0(stock),S(size),0(stock), M(size),0(stock), L(size)"
            value={size.join(",")} // Join array elements with commas
            onChange={(e) => setSize(e.target.value.split(",").map(item => item.trim()))} // Split input string by comma
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
          />
        </div>
        <div>
          <label htmlFor="color" className="font-semibold text-sm sm:text-lg block">Color (comma-separated)</label>
          <input
            id="color"
            type="text"
            placeholder="eg. 0(stock),Red(color),0(stock), Blue(color),0(stock), Green(color),0(stock) or hex: #000000(color)"
            value={color.join(",")}
            onChange={(e) => setColor(e.target.value.split(",").map(item => item.trim()))}
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
          />
        </div>
        <div>
          <label htmlFor="photo" className="font-semibold text-sm sm:text-lg block">Photo</label>
          <input 
            id="photo"
            required 
            type="file" 
            onChange={changeImageHandler} 
            className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
          />
        </div>
         <img src={photoPrev?photoPrev:"https://raw.githubusercontent.com/AnasAAhmed/Imagerator/main/frontend/src/assets/preview.png"} alt="New Image" className="w-24 h-24 object-cover" />
        <button type="submit" className="bg-blue-500 w-56 h-10 mb-24 text-white text-lg rounded-md font-semibold flex justify-center items-center">{load ? <FaSpinner className='animate-spin text-2xl mx-3' /> : "Create"}</button>
      </form>
    </article>
  </main>
</div>
  );
};

export default NewProduct;
