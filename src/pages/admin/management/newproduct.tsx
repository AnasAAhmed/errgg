// import { ChangeEvent, FormEvent, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import AdminSidebar from "../../../components/admin/AdminSidebar";
// import { useNewProductMutation } from "../../../redux/api/productAPI";
// import { RootState } from "../../../redux/store";
// import { responseToast } from "../../../utils/features";
// import { FaArrowLeft, FaSpinner, FaTrash } from "react-icons/fa";




// const NewProduct = () => {
//   const { user } = useSelector((state: RootState) => state.userReducer);

//   const [name, setName] = useState<string>("");
//   const [category, setCategory] = useState<string>("");
//   const [collections, SetCollections] = useState<string>("");
//   const [price, setPrice] = useState<number>(1000);
//   const [cutPrice, setCutPrice] = useState<number>(0);
//   const [description, setDescription] = useState<string>("");
//   const [stock, setStock] = useState<number>(1);
//   const [size, setSize] = useState<[{size:string,stock:number}]>([{
//     size:"",
//     stock:0
//   }]);
//   // const [size, setSize] = useState<string[]>(["2","s", "3","m","1","l","2","xl", "0","xxl"]);
//   const [color, setColor] = useState<[{color:string,stock:number}]>([{
//     color:"",
//     stock:0
//   }]);
//   const [photoPrevs, setPhotoPrevs] = useState<string[]>([]);
//   const [photos, setPhotos] = useState<File[]>([]);
//   const [load, setLoad] = useState<boolean>(false);

//   const [newProduct] = useNewProductMutation();
//   const navigate = useNavigate();

//   const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;

//     if (files) {
//       const newPhotoPrevs: string[] = [];
//       const newPhotos: File[] = [];

//       Array.from(files).forEach((file) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//           if (typeof reader.result === "string") {
//             newPhotoPrevs.push(reader.result);
//             newPhotos.push(file);
//             setPhotoPrevs([...photoPrevs, ...newPhotoPrevs]);
//             setPhotos([...photos, ...newPhotos]);
//           }
//         };
//       });
//     }
//   };

//   const removePhoto = (index: number) => {
//     setPhotoPrevs(photoPrevs.filter((_, i) => i !== index));
//     setPhotos(photos.filter((_, i) => i !== index));
//   };
//   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoad(true);
//     if (!name || !price || stock < 0 || !category || !photos || !description || !collections) return;

//     const formData = new FormData();

//     formData.set("name", name);
//     formData.set("price", price.toString());
//     formData.set("cutPrice", cutPrice.toString());
//     formData.set("description", description);
//     formData.set("stock", stock.toString());
//     formData.set("category", category);
//     formData.set("collections", collections);
//     photos.forEach((file) => {
//       formData.append("photos", file);
//     });
//     size.forEach((s, index) => {
//       formData.append(`size[${index}]`, s);
//     });
//     color.forEach((c, index) => {
//       formData.append(`color[${index}]`, c);
//     });

//     const res = await newProduct({ id: user?._id!, formData });
//     setLoad(false);

//     responseToast(res, navigate, "/admin/product");
//   };


//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main >
//         <Link to={"/admin/product"} className="flex items-center text-blue-500 mb-4">
//           <FaArrowLeft className="mr-1" /> Back
//         </Link>
//         <article >
//           <h2 className="heading">New Product</h2>
//           <form onSubmit={submitHandler} className="grid grid-cols-2 gap-2 sm:gap-4 mx-2">
//             <div>
//               <label htmlFor="name" className="font-semibold text-sm sm:text-lg block">Name</label>
//               <input
//                 id="name"
//                 required
//                 type="text"
//                 placeholder="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
//               />
//             </div>
//             <div>
//               <label htmlFor="description" className="font-semibold text-sm sm:text-lg block">Description</label>
//               <textarea
//                 id="description"
//                 required
//                 rows={2}
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
//               />
//             </div>
//             <div>
//               <label htmlFor="price" className="font-semibold text-sm sm:text-lg block">Price</label>
//               <input
//                 id="price"
//                 required
//                 type="number"
//                 placeholder="Price"
//                 value={price}
//                 onChange={(e) => setPrice(Number(e.target.value))}
//                 className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
//               />
//             </div>
//             <div>
//               <label htmlFor="cutPrice" className="font-semibold text-sm sm:text-lg block">Cut Price</label>
//               <input
//                 id="cutPrice"
//                 required
//                 type="number"
//                 placeholder="Cut Price"
//                 value={cutPrice}
//                 onChange={(e) => setCutPrice(Number(e.target.value))}
//                 className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
//               />
//             </div>
//             <div>
//               <label htmlFor="stock" className="font-semibold text-sm sm:text-lg block">Stock</label>
//               <input
//                 id="stock"
//                 required
//                 type="number"
//                 placeholder="Stock"
//                 value={stock}
//                 onChange={(e) => setStock(Number(e.target.value))}
//                 className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
//               />
//             </div>
//             <div>
//               <label htmlFor="category" className="font-semibold text-sm sm:text-lg block">Category</label>
//               <input
//                 id="category"
//                 required
//                 type="text"
//                 placeholder="eg. Laptop, Camera etc."
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
//               />
//             </div>
//             <div>
//               <label htmlFor="collections" className="font-semibold text-sm sm:text-lg block">Collections</label>
//               <input
//                 id="collections"
//                 required
//                 type="text"
//                 placeholder="eg. Electronic, Crocrey, Wearables etc."
//                 value={collections}
//                 onChange={(e) => SetCollections(e.target.value)}
//                 className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
//               />
//             </div>
//             <div>
//               <label htmlFor="size" className="font-semibold text-sm sm:text-lg block">Size (comma-separated)</label>
//               <input
//                 id="size"
//                 type="text"
//                 placeholder="eg. 0(stock),S(size),0(stock), M(size),0(stock), L(size)"
//                 value={size.join(",")} // Join array elements with commas
//                 onChange={(e) => setSize(e.target.value.split(",").map(item => item.trim()))} // Split input string by comma
//                 className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
//               />
//             </div>
//             <div>
//               <label htmlFor="color" className="font-semibold text-sm sm:text-lg block">Color (comma-separated)</label>
//               <input
//                 id="color"
//                 type="text"
//                 placeholder="eg. 0(stock),Red(color),0(stock), Blue(color),0(stock), Green(color),0(stock) or hex: #000000(color)"
//                 value={color.join(",")}
//                 onChange={(e) => setColor(e.target.value.split(",").map(item => item.trim()))}
//                 className="border border-gray-300 rounded-md w-[96%] px-3 py-3 "
//               />
//             </div>
//             <div>
//               <label className="font-semibold text-sm sm:text-lg block">Update Photos</label>
//               <input type="file" multiple onChange={changeImageHandler} />
//             </div>

//             <div className="flex flex-wrap">
//               {photoPrevs.map((photoPrev, index) => (
//                 <div key={index} className="relative m-2">
//                   <img
//                     src={photoPrev}
//                     alt="New Image"
//                     className="w-24 border-2 h-24 object-cover"
//                   />
//                   <span className="absolute top-1 bg-blue-500 text-white rounded-full px-2 text-xs">New</span>
//                   <span
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-4 py-2 text-xs cursor-pointer"
//                     onClick={() => removePhoto(index)}
//                   >
//                     <FaTrash />
//                   </span>
//                 </div>
//               ))}
//             </div>
//             <button type="submit" className="bg-blue-500 w-56 h-10 mb-24 text-white text-lg rounded-md font-semibold flex justify-center items-center">{load ? <FaSpinner className='animate-spin text-2xl mx-3' /> : "Create"}</button>
//           </form>
//         </article>
//       </main>
//     </div>
//   );
// };

// export default NewProduct;

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
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [sizes, setSizes] = useState<Array<{ size: string; stock: number }>>([]);
  const [colors, setColors] = useState<Array<{ color: string; stock: number }>>([]);
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

  const handleSizeChange = (index: number, key: 'size' | 'stock', value: string | number) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [key]: value };
    setSizes(newSizes);
  };

  const handleColorChange = (index: number, key: 'color' | 'stock', value: string | number) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], [key]: value };
    setColors(newColors);
  };

  const addSize = () => {
    setSizes([...sizes, { size: "", stock: 0 }]);
  };

  const addColor = () => {
    setColors([...colors, { color: "", stock: 0 }]);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoad(true);

    const totalSizesStock = sizes.reduce((acc, size) => acc + size.stock, 0);
    const totalColorsStock = colors.reduce((acc, color) => acc + color.stock, 0);

    if (totalSizesStock > stock || totalColorsStock > stock) {
      toast.error("Colors/Sizes Total stock cannot be more than Overall stock");
      setLoad(false);
      return;
    }

    if (!name || !price || stock < 0 || !category || !photos || !description || !collections || sizes.length > 5 || colors.length > 5) {
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
    formData.set("category", category);
    formData.set("collections", collections);
    photos.forEach((file) => {
      formData.append("photos", file);
    });
    sizes.forEach((s, index) => {
      formData.append(`sizes[${index}][size]`, s.size);
      formData.append(`sizes[${index}][stock]`, s.stock.toString());
    });
    colors.forEach((c, index) => {
      formData.append(`colors[${index}][color]`, c.color);
      formData.append(`colors[${index}][stock]`, c.stock.toString());
    });

    const res = await newProduct({ id: user?._id!, formData });
    setLoad(false);
    noRedirect ?onlyResponseToast(res) :responseToast(res, navigate, "/admin/product");
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
                required
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
                required
                type="text"
                placeholder="eg. Electronic, Crockery, Wearables etc."
                value={collections}
                onChange={(e) => SetCollections(e.target.value)}
                className="border border-gray-300 rounded-md w-[96%] px-3 py-3"
              />
            </div>
            <div>
              <label className="font-semibold text-sm sm:text-lg block">Sizes</label>
              {sizes.map((size, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Size"
                    value={size.size}
                    onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                    className="border border-gray-300 rounded-md w-[70%] px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={size.stock}
                    onChange={(e) => handleSizeChange(index, 'stock', Number(e.target.value))}
                    className="border border-gray-300 rounded-md w-[20%] px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSize}
                className="text-blue-500 mt-2"
              >
                Add More
              </button>
            </div>
            <div>
              <label className="font-semibold text-sm sm:text-lg block">Colors</label>
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Color"
                    value={color.color}
                    onChange={(e) => handleColorChange(index, 'color', e.target.value)}
                    className="border border-gray-300 rounded-md w-[70%] px-3 py-2"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={color.stock}
                    onChange={(e) => handleColorChange(index, 'stock', Number(e.target.value))}
                    className="border border-gray-300 rounded-md w-[20%] px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addColor}
                className="text-blue-500 mt-2"
              >
                Add More
              </button>
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
              className=" bg-blue-500 text-white flex justify-center rounded-md py-2 mb-4"
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
