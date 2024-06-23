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
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [variantStock, setVariantStock] = useState<number>(0);
  const [mainImage, setMainImage] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

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
    category,
    variants,
    stock,
    sold,
    reviews,
  } = data?.product || {
    _id: "",
    photos: [],
    category: "",
    description: "",
    name: "",
    price: 0,
    ratings: 0,
    sold: 0,
    numOfReviews: 0,
    stock: 0,
    cutPrice: 0,
    variants: [],
    reviews: []
  };

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const colors = variants
      ?.filter(variant => variant.size === size && variant.stock > 0)
      .map(variant => variant.color) || [];
    setAvailableColors(colors);
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
      handleVariantChange(size, colors[0]);
    } else {
      setSelectedColor("");
      setVariantStock(0);
      setSelectedVariantId("");
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    handleVariantChange(selectedSize, color);
  };

  const handleVariantChange = (size: string, color: string) => {
    const variant = variants?.find(v => v.size === size && v.color === color);
    if (variant) {
      setVariantStock(variant.stock);
      setSelectedVariantId(variant._id);
    } else {
      setVariantStock(0);
      setSelectedVariantId("");
    }
  };

  useEffect(() => {
    setLoadingBar(20);
    setLoadingBar(70);
  }, [params.id]);

  useEffect(() => {
    setLoadingBar(99);
    setTimeout(() => {
      setLoadingBar(100);
    }, 50);
    if (photos && photos.length > 0) {
      setMainImage(photos[0]);
    }

    if (variants && variants.length > 0) {
      const availableVariant = variants.find(variant => variant.stock > 0);
      if (availableVariant) {
        setSelectedSize(availableVariant.size);
        handleSizeChange(availableVariant.size);
      }
    } else {
      setSelectedSize("");
      setSelectedColor("");
      setAvailableColors([]);
      setVariantStock(0);
      setSelectedVariantId("");
    }
    window.scroll(0, 0);
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  const uniqueSizes = Array.from(new Set(variants?.map(variant => variant.size) || []));

  return (
    <>
      <div>
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
                <p className="min-h-12 text-2xl font-semibold mb-4">{name}</p>
                <h3 className="text-2xl">
                  ${price}
                  <span className="text-lg line-through text-red-500">{cutPrice > 0 ? `$${cutPrice}` : ""}</span>
                </h3>
                <br />
                <div className="text-lg flex justify-between">
                  <span className="flex items-center"><StarRatings rating={ratings} /><span className="text-sm mx-1"> ({ratings}/5) ({numOfReviews})</span> </span>
                  {sold > 0 && <span className="text-sm">sold({sold})</span>}
                </div>

                <br />
                <h3 className="text-lg font-semibold my-2">Description:</h3>
                <p>{description}</p>
                <br />
                {variants?.length > 0 && (
                  <div>
                    Combination Stock:{" "}
                    {variantStock > 0 ? (
                      variantStock < 6 ? (
                        <span className="text-red-500">Low Stock {variantStock}</span>
                      ) : (
                        <span className="text-green-500">Available</span>
                      )
                    ) : (
                      <span className="text-red-500">Not Available</span>
                    )}
                  </div>
                )}
                <div>
                  Overall Stock:{" "}
                  {stock > 0 ? (
                    stock < 6 ? (
                      <span className="text-red-500">Low Stock {stock}</span>
                    ) : (
                      <span className="text-green-500">Available</span>
                    )
                  ) : (
                    <span className="text-red-500">Not Available</span>
                  )}
                </div>
                <br />
                {variants?.length > 0 && (
                  <>
                    <div className="flex mb-4">
                      {uniqueSizes.length>1 && uniqueSizes.map((size, index) => (
                        <button
                          key={index}
                          className={`${selectedSize === size ? "bg-black text-white" : "bg-white text-gray-800"} border border-black text-gray-800 px-2 py-1 mr-2 rounded-md`}
                          onClick={() => handleSizeChange(size)}
                        >{size}</button>
                      ))}
                    </div>
                    <div className="flex mb-4">
                      {availableColors.length>1 && availableColors.map((color, index) => (
                        <button
                          key={index}
                          className={`${selectedColor === color ? "ring-4" : ""} border-gray-500 border rounded-full h-6 w-6 mx-1`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                        ></button>
                      ))}
                    </div>
                    {variantStock === 0 && <span className="text-red-500">Not Available</span>}
                  </>
                )}
                <button
                  disabled={(variantStock < 1 && variants?.length > 0) || stock < 1}
                  className='cart-button w-full mt-4 px-4 py-2 bg-yellow-500 rounded-md text-white text-lg font-semibold transition duration-300 ease-in-out hover:bg-yellow-600'
                  onClick={() =>
                    addToCartHandler({
                      productId,
                      size: selectedSize,
                      color: selectedColor,
                      price,
                      cutPrice,
                      name,
                      photo: photos![0],
                      stock,
                      quantity: 1,
                      variantId: selectedVariantId
                    })
                  }
                >
                  {(variantStock < 1 && variants?.length > 0) || stock < 1 ? "Not Available" : "Add to Cart"}
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
            className="absolute rounded-lg top-0 left-0 w-full h-full bg-no-repeat transition-transform duration-300"
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
          className={`absolute rounded-lg top-0 left-0 w-full h-full transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
      <img src={src} alt={alt} className="w-full rounded-md shadow-md md:hidden md:h-[500px] h-[300px] object-cover" />
    </>
  );
};
