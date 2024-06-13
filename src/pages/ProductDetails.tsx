// import { Navigate, useParams } from "react-router-dom";
// import { ProductDetailsSkeleton } from "../components/loader";
// import RelatedProducts from "../components/RelatedProducts";
// import { useDispatch } from "react-redux";
// import {
//   useProductDetailsQuery,
// } from "../redux/api/productAPI";
// import { server } from "../redux/store";
// import { CartItem, LoadingBarProps } from "../types/types";
// import { addToCart } from "../redux/reducer/cartReducer";
// import toast from "react-hot-toast";
// import { useEffect, useState, useRef } from "react";
// import ProductReview from "../components/ProductReviews";
// import StarRatings from "../components/StarsRatings";
// import Footer from "../components/Footer";

// const ProductDetails = ({ setLoadingBar }: LoadingBarProps) => {

//   const [size, setSize] = useState("");
//   const [color, setColor] = useState("");
//   const [colorStock, setColorStock] = useState("");
//   const [sizeStock, setSizeStock] = useState("");
//   const [mainImage, setMainImage] = useState("");

//   const params = useParams();
//   const { data, isLoading, isError } = useProductDetailsQuery(params.id!);
//   const { _id: productId, price, cutPrice, description, photos, ratings, numOfReviews, name, stock, category, size: sizes, color: colors } = data?.product || {
//     _id: "",
//     photos: [],
//     category: "",
//     description: "",
//     name: "",
//     stock: 0,
//     price: 0,
//     ratings: 0,
//     numOfReviews: 0,
//     cutPrice: 0,
//     size: [],
//     color: []
//   };
//   const dispatch = useDispatch();



//   const addToCartHandler = (cartItem: CartItem) => {
//     if (cartItem.stock < 1) return toast.error("Out of Stock");
//     dispatch(addToCart(cartItem));
//     toast.success("Added to cart");
//   };

//   const stockSizeHandler = (index: number) => {
//     if (size !== "") setSizeStock(sizesStockValues[index])
//   }
//   const stockColorHandler = (index: number) => {
//     if (color !== "") setColorStock(colorsStockValues[index])
//   }

//   useEffect(() => {
//     setLoadingBar(20);
//     setLoadingBar(70);
//   }, [params.id])

//   useEffect(() => {
//     setLoadingBar(100);
//     setMainImage(photos[0])
//     window.scroll(0, 0);
//   }, [data])

//   if (isError) return <Navigate to={"/404"} />;


//   return (
//     <>
//       <div className="">
//         <main className="flex flex-col md:flex-row  lsg:w-[70%] px-6 md:px-3 justify-center mt-8">
//           {isLoading ? (
//             <ProductDetailsSkeleton />
//           ) : (
//             <>
//               <section className="sec1 flex-1 flex-col md:flex-row flex flex-shrink-0 w-full md:w-72 mr-10 mb-10">
//                 <div className="flex justify-center flex-col gap-3 w-full">
//                 <ImageZoom src={`${server}/${mainImage}`} alt={name} />
//                   <div className="flex gap-2 overflow-auto ">
//                     {photos?.map((photo, index) => (
//                       <img
//                         key={index}
//                         src={`${server}/${photo}`}
//                         height={200}
//                         width={200}
//                         alt={name}
//                         className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${mainImage === photo ? "border-2 border-black" : ""}`}
//                         onClick={() => setMainImage(photo)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </section>
//               <article className="sec2 flex-1 w-full  md:w-96">
//                 <p className="min-h-16 text-2xl font-semibold mb-4">{name}</p>
//                 {sizesValues.length > 1 &&
//                   <div className="flex mb-4">
//                     {sizesValues.map((item, index) => (
//                       <button
//                         key={index}
//                         className={`${size === item ? "bg-black text-white" : "bg-white text-gray-800"} border border-black text-gray-800 px-2 py-1 mr-2 rounded-md`}
//                         onClick={() => { setSize(item); stockSizeHandler(index) }}
//                       >{item}</button>
//                     ))}
//                     {sizeStock === "0" && <span className="text-red-500">Not Available</span>}
//                   </div>
//                 }
//                 {colorValues.length > 1 &&
//                   <div className="flex mb-4">
//                     {colorValues.map((item, index) => (
//                       <button
//                         key={index}
//                         className={`${color === item ? "ring-4" : ""} border-gray-500 border rounded-full h-6 w-6 mx-1`}
//                         style={{ backgroundColor: item }}
//                         onClick={() => { setColor(item); stockColorHandler(index) }}
//                       ></button>
//                     ))}
//                     {colorStock === "0" && <span className="text-red-500">Not Available</span>}
//                   </div>
//                 }
//                 <span className="text-lg flex flex-row">
//                   <StarRatings rating={ratings} /> Reviews ({numOfReviews})
//                 </span>


//                 <br />
//                 <div>
//                   Overall Stock:{"\n"}
//                   {stock > 0 ? (
//                     stock < 6 ? (
//                       <span className="text-red-500">Low Stock</span>
//                     ) : (
//                       <span className="text-green-500"> Available</span>
//                     )
//                   ) : (
//                     <span className="text-red-500">Not Available</span>
//                   )}
//                 </div>
//                 <br />
//                 <h3 className="text-lg font-semibold my-2">Description:</h3>
//                 <p >{description}</p>
//                 <h3 className="text-2xl">
//                   ${price}
//                   <span className="text-lg line-through text-red-500">{cutPrice > 0 ? `$${cutPrice}` : ""}</span>
//                 </h3>
//                 <button
//                   disabled={stock === 0 || colorStock === "0" || sizeStock === "0"}
//                   className='cart-button w-full mt-4 px-4 py-2 bg-yellow-500 rounded-md text-white text-lg font-semibold transition duration-300 ease-in-out hover:bg-yellow-600'
//                   onClick={() =>
//                     addToCartHandler({ productId, size, color, price, cutPrice, name, photo: photos![0], stock, quantity: 1 })
//                   }
//                 >
//                   {stock === 0 || colorStock === "0" || sizeStock === "0" ? "Not Available" : "Add to Cart"}
//                 </button>
//               </article>
//             </>
//           )}
//         </main>
//         <div>
//           <ProductReview numOfReviews={numOfReviews} productId={productId} />
//         </div>
//         <div className="flex justify-center items-center">
//           <RelatedProducts filteredProductId={productId} category={category} heading="Related Products" />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ProductDetails;

// interface ImageZoomProps {
//   src: string;
//   alt: string;
// }

// const ImageZoom = ({ src, alt }: ImageZoomProps) => {
//   const [isZoomed, setIsZoomed] = useState(false);
//   const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
//   const imgRef = useRef<HTMLImageElement>(null);

//   const handleMouseEnter = () => setIsZoomed(true);
//   const handleMouseLeave = () => setIsZoomed(false);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (imgRef.current && isZoomed) {
//       const { left, top, width, height } = imgRef.current.getBoundingClientRect();
//       const x = ((e.clientX - left) / width) * 100;
//       const y = ((e.clientY - top) / height) * 100;
//       setBackgroundPosition(`${x}% ${y}%`);
//     }
//   };

//   const formattedSrc = src.replace(/\\/g, '/');

//   return (
//     <>
//       <div
//         className="relative w-full h-[500px] max-md:hidden"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         onMouseMove={handleMouseMove}
//       >
//         {isZoomed && (
//           <div
//             className="absolute top-0 left-0 w-full h-full bg-no-repeat transition-transform duration-300"
//             style={{
//               backgroundImage: `url(${formattedSrc})`,
//               backgroundPosition: backgroundPosition,
//               backgroundSize: '200%', // Adjust this value to control the zoom level
//             }}
//           />
//         )}
//         <img
//           ref={imgRef}
//           src={formattedSrc}
//           alt={alt}
//           className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
//         />
//       </div>
//       <img src={src} alt={alt} className="w-full shadow-md md:hidden md:h-[500px] h-[300px] object-cover" />
//     </>
//   );
// };





import { Navigate, useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "../components/loader";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch } from "react-redux";
import {
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { server } from "../redux/store";
import { CartItem, LoadingBarProps } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import ProductReview from "../components/ProductReviews";
import StarRatings from "../components/StarsRatings";
import Footer from "../components/Footer";

const ProductDetails = ({ setLoadingBar }: LoadingBarProps) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [colorStock, setColorStock] = useState<number>(0);
  const [sizeStock, setSizeStock] = useState<number>(0);
  const [mainImage, setMainImage] = useState("");

  const params = useParams();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);
  const {
    _id: productId,
    price,
    cutPrice,
    description,
    photos,
    ratings,
    numOfReviews,
    name,
    stock,
    category,
    sizes,
    colors,
    reviews,
  } = data?.product || {
    _id: "",
    photos: [],
    category: "",
    description: "",
    name: "",
    stock: 0,
    price: 0,
    ratings: 0,
    numOfReviews: 0,
    cutPrice: 0,
    sizes: [],
    colors: [],
    reviews: []
  };

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const stockSizeHandler = (index: number) => {
    if (sizes && sizes[index]) setSizeStock(sizes[index].stock);
  };

  const stockColorHandler = (index: number) => {
    if (colors && colors[index]) setColorStock(colors[index].stock);
  };

  useEffect(() => {
    setLoadingBar(20);
    setLoadingBar(70);
  }, [params.id]);

  useEffect(() => {
    setLoadingBar(99);
    setTimeout(() => {
      setLoadingBar(100);
    }, 50)
    if (photos && photos.length > 0) {
      setMainImage(photos[0]);
    }
    const availableColor = colors.find(color => color.stock > 0);
    if (availableColor) {
      setColor(availableColor.color);
      setColorStock(availableColor.stock);
    }// Find the first size with quantity > 0
    const availableSize = sizes.find(size => size.stock > 0);
    if (availableSize) {
      setSize(availableSize.size);
      setSizeStock(availableSize.stock);
    }
    window.scroll(0, 0);
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <>
      <div >
        <main className="flex flex-col md:flex-row px-6 md:px-24 lg:px-44 justify-center mt-8">
          {isLoading ? (
            <ProductDetailsSkeleton />
          ) : (
            <>
              <section className="sec1 flex-1 flex-col md:flex-row flex flex-shrink-0 w-full md:w-72 mr-10 mb-10">
                <div className="flex justify-center flex-col gap-3 w-full">
                  <ImageZoom src={`${server}/${mainImage}`} alt={name} />
                  <div className="flex gap-2 overflow-auto">
                    {photos?.map((photo, index) => (
                      <img
                        key={index}
                        src={`${server}/${photo}`}
                        height={200}
                        width={200}
                        alt={name}
                        className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${mainImage === photo ? "border-2 border-black" : ""}`}
                        onClick={() => setMainImage(photo)}
                      />
                    ))}
                  </div>
                </div>
              </section>
              <article className="sec2 flex-1 w-full md:w-96">
                <p className="min-h-16 text-2xl font-semibold mb-4">{name}</p>
                {sizes?.length > 1 &&
                  <div className="flex mb-4">
                    {sizes.map((item, index) => (
                      <button
                        key={index}
                        className={`${size === item.size ? "bg-black text-white" : "bg-white text-gray-800"} border border-black text-gray-800 px-2 py-1 mr-2 rounded-md`}
                        onClick={() => { setSize(item.size); stockSizeHandler(index); }}
                      >{item.size}</button>
                    ))}
                    {sizeStock === 0 && <span className="text-red-500">Not Available</span>}
                  </div>
                }
                {colors?.length > 1 &&
                  <div className="flex mb-4">
                    {colors.map((item, index) => (
                      <button
                        key={index}
                        className={`${color === item.color ? "ring-4" : ""} border-gray-500 border rounded-full h-6 w-6 mx-1`}
                        style={{ backgroundColor: item.color }}
                        onClick={() => { setColor(item.color); stockColorHandler(index); }}
                      ></button>
                    ))}
                    {colorStock === 0 && <span className="text-red-500">Not Available</span>}
                  </div>
                }
                <span className="text-lg flex flex-row">
                  <StarRatings rating={ratings} /> Reviews ({numOfReviews})
                </span>
                <br />
                <div>
                  Overall Stock:{" "}
                  {stock > 0 ? (
                    stock < 6 ? (
                      <span className="text-red-500">Low Stock</span>
                    ) : (
                      <span className="text-green-500">Available</span>
                    )
                  ) : (
                    <span className="text-red-500">Not Available</span>
                  )}
                </div>
                <br />
                <h3 className="text-lg font-semibold my-2">Description:</h3>
                <p>{description}</p>
                <h3 className="text-2xl">
                  ${price}
                  <span className="text-lg line-through text-red-500">{cutPrice > 0 ? `$${cutPrice}` : ""}</span>
                </h3>
                <button
                  disabled={stock < 1 || sizes.length > 0 && sizeStock < 1 || colors.length > 0 && colorStock < 1}
                  className='cart-button w-full mt-4 px-4 py-2 bg-yellow-500 rounded-md text-white text-lg font-semibold transition duration-300 ease-in-out hover:bg-yellow-600'
                  onClick={() =>
                    addToCartHandler({ productId, size, color, price, cutPrice, name, photo: photos![0], stock, quantity: 1 })
                  }
                >
                  {stock < 1 || sizes.length > 0 && sizeStock < 1 || colors.length > 0 && colorStock < 1 ? "Not Available" : "Add to Cart"}
                </button>
              </article>
            </>
          )}
        </main>
        <div>
          <ProductReview reviews={reviews} numOfReviews={numOfReviews} productId={productId} />
        </div>
        <div className="flex justify-center items-center">
          <RelatedProducts filteredProductId={productId} category={category} heading="Related Products" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

interface ImageZoomProps {
  src: string;
  alt: string;
}

const ImageZoom = ({ src, alt }: ImageZoomProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imgRef.current && isZoomed) {
      const { left, top, width, height } = imgRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setBackgroundPosition(`${x}% ${y}%`);
    }
  };

  const formattedSrc = src.replace(/\\/g, '/');

  return (
    <>
      <div
        className="relative w-full h-[400px] max-md:hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {isZoomed && (
          <div
            className="absolute top-0 left-0 w-full h-full bg-no-repeat transition-transform duration-300"
            style={{
              backgroundImage: `url(${formattedSrc})`,
              backgroundPosition: backgroundPosition,
              backgroundSize: '200%', // Adjust this value to control the zoom level
            }}
          />
        )}
        <img
          ref={imgRef}
          src={formattedSrc}
          alt={alt}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
      <img src={src} alt={alt} className="w-full shadow-md md:hidden md:h-[500px] h-[300px] object-cover" />
    </>
  );
};
