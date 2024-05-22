import { Navigate, useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "../components/loader";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch } from "react-redux";
import {
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { server } from "../redux/store";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import ProductReview from "../components/ProductReviews";
import StarRatings from "../components/StarsRatings";
import Footer from "../components/Footer";
import ImageZoom from "../components/ImageZoom";

const ProductDetails = () => {
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [colorStock, setColorStock] = useState("");
  const [sizeStock, setSizeStock] = useState("");

  const params = useParams();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);
  const { _id: productId, price, cutPrice, description, photo, ratings, numOfReviews, name, stock, category, size: sizes, color: colors } = data?.product || {
    _id: "",
    photo: "",
    category: "",
    description: "",
    name: "",
    stock: 0,
    price: 0,
    ratings: 0,
    numOfReviews: 0,
    cutPrice: 0,
    size: [],
    color: []
  };
  const dispatch = useDispatch();



  const sizesValues = sizes.filter((_, index) => index % 2 === 1);
  const sizesStockValues = sizes.filter((_, index) => index % 2 === 0);
  const colorValues = colors.filter((_, index) => index % 2 === 1);
  const colorsStockValues = colors.filter((_, index) => index % 2 === 0);

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const stockSizeHandler = (index: number) => {
    if (size !== "") setSizeStock(sizesStockValues[index])
  }
  const stockColorHandler = (index: number) => {
    if (color !== "") setColorStock(colorsStockValues[index])
  }

  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
  }, [params.id])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 400)
    setSizeStock(sizesStockValues[0])
    setColorStock(colorsStockValues[0])
    setSize(sizesValues[0]);
    setColor(colorValues[0]);
  }, [data])

  if (isError) return <Navigate to={"/404"} />;


  return (
    <>
      <div>
        <main className="product-details flex flex-col md:flex-row px-6 md:px-3  justify-center mt-8">
          {isLoading || loading ? (
            <ProductDetailsSkeleton />
          ) : (
            <>
              <section className="sec1 flex-1 flex-shrink-0 w-full md:w-72 mr-10 mb-10">
                <img src={`${server}/${photo}`} alt={name} className="w-full shadow-md md:hidden md:h-[400px] h-[250px] object-cover" />
                <ImageZoom src={`${server}/${photo}`} alt={name} />
              </section>
              <article className="sec2 flex-1 w-full  md:w-96">
                <p className="min-h-16 text-2xl font-semibold mb-4">{name}</p>
                {sizesValues.length > 1 &&
                  <div className="flex mb-4">
                    {sizesValues.map((item, index) => (
                      <>
                        <button
                          key={index}
                          className={`${size === item ? "bg-black text-white" : "bg-white text-gray-800"} border border-black text-gray-800 px-2 py-1 mr-2 rounded-md`}
                          onClick={() => { setSize(item); stockSizeHandler(index) }}
                        >{item}</button>
                      </>
                    ))}
                    {sizeStock==="0"&&<span className="text-red-500">Not Available</span>}
                  </div>
                }
                {colorValues.length > 1 &&
                  <div className="flex mb-4">
                    {colorValues.map((item, index) => (
                      <>
                        <button
                          key={index}
                          className={`${color === item ? "ring-4" : ""} rounded-full h-6 w-6 mx-1`}
                          style={{ backgroundColor: item }}
                          onClick={() => { setColor(item); stockColorHandler(index) }}
                        ></button>
                      </>
                    ))}
                    {colorStock==="0"&&<span className="text-red-500">Not Available</span>}
                  </div>
                }
                <span className="text-lg flex flex-row">
                  <StarRatings rating={ratings} /> Reviews ({numOfReviews})
                </span>


                <br />
                <div>
                  Overall Stock:
                  {stock > 0 ? (
                    <>
                      {stock < 6 ? (
                        <span className="text-red-500">Low Stock</span>
                      ) : (
                        <span className="text-green-500"> Available</span>
                      )}
                    </>
                  ) : (
                    <span className="text-red-500">Not Available</span>
                  )}
                </div>
                <br />
                <h3 className="text-lg font-semibold my-2">Description:</h3>
                <p >{description}</p>
                <h3 className="text-2xl">
                  ${price}
                  <span className="text-lg line-through text-red-500">{cutPrice > 0 ? `$${cutPrice}` : ""}</span>
                </h3>
                <button
                  disabled={stock === 0 || colorStock === "0" || sizeStock === "0"}
                  className='cart-button w-full mt-4 px-4 py-2 bg-yellow-500 rounded-md text-white text-lg font-semibold transition duration-300 ease-in-out hover:bg-yellow-600'
                  onClick={() =>
                    addToCartHandler({ productId, size, color, price, cutPrice, name, photo, stock, quantity: 1 })
                  }
                >
                  {stock === 0 || colorStock === "0" || sizeStock === "0" ? "Not Available" : "Add to Cart"}
                </button>
              </article>
            </>
          )}
        </main>
        <div>
          <ProductReview numOfReviews={numOfReviews} productId={productId} />
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





