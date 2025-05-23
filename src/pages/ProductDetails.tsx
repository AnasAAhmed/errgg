import { useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "../components/loader";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch } from "react-redux";
import {
  useProductDetailsQuery,
} from "../redux/api/productAPI";
import { server } from "../redux/store";
import { CartItem, LoadingBarProps, VariantType } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import ProductReview from "../components/ProductReviews";
import StarRatings from "../components/StarsRatings";
import Footer from "../components/Footer";

const ProductDetails = ({ setLoadingBar }: LoadingBarProps) => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useProductDetailsQuery({ slug: slug! });
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
  const [selectedVariant, setSelectedVariant] = useState<VariantType | null>(null);
  const [mainImage, setMainImage] = useState("");

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const uniqueSizes = Array.from(new Set(data?.product.variants.map(variant => variant.size)));


  const handleSizeChange = (size: string) => {
    const availableVariants = data?.product.variants.filter(v => v.size === size && v.stock > 0);
    if (availableVariants && availableVariants.length) setSelectedVariant(availableVariants[0]);
    else setSelectedVariant(null);
  };

  const handleColorChange = (color: string) => {
    if (selectedVariant) {
      const variant = data?.product.variants.find(v => v.size === selectedVariant.size && v.color === color);
      if (variant) setSelectedVariant(variant);
    }
  };
  const c = data?.product.variants.filter(i => i.color !== '');
  const s = data?.product.variants.filter(i => i.size !== '');
  const uniqueColors = Array.from(new Set(data?.product.variants.map(variant => variant.color)));
  const colorsOfVariantThatisNot0 = selectedVariant && data?.product.variants.filter(v => v.size === selectedVariant.size && v.stock > 0);

  useEffect(() => {
    if (isError) return;

    setLoadingBar(20);
    setLoadingBar(70);
    setLoadingBar(90);
  }, [slug]);

  useEffect(() => {
    if (isError) return;

    if (photos && photos.length > 0) {
      setMainImage(photos[0]);
    }
    const availableVariant = data?.product.variants.find(variant => variant.stock > 0);
    if (availableVariant) setSelectedVariant(availableVariant);
    window.scroll(0, 0);
    setLoadingBar(100);
  }, [data]);


  // if (isError) return <Navigate to={"/404"} />;

  return (
    <>
      <div>
        <main className="flex flex-col md:flex-row px-6 md:px-12 lg:px-44 items-start justify-center mt-8">
          {isLoading ? (
            <ProductDetailsSkeleton />
          ) : (
            <>
              <section className="flex-1 flex-col md:flex-row flex flex-shrink-0 w-full md:w-72 mr-10 mb-10">
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
                <p className="min-h-12 capitalize text-2xl font-semibold mb-4">{name}</p>
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
                {selectedVariant && (
                  <div>
                    Variant Stock:{" "}
                    {selectedVariant.stock > 0 ? (
                      selectedVariant.stock < 6 ? (
                        <span className="text-red-500">Only {selectedVariant.stock} items left</span>
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
                      <span className="text-red-500">Only {stock} items left</span>
                    ) : (
                      <span className="text-green-500">Available</span>
                    )
                  ) : (
                    <span className="text-red-500">Not Available</span>
                  )}
                </div>
                <br />
                {/* Size Selection */}
                {s && s.length > 0 && uniqueSizes.length > 0 && (
                  <div className="flex mb-4">
                    {uniqueSizes.map((size, index) => (
                      <button
                        key={index}
                        className={`${selectedVariant?.size === size ? "bg-black text-white" : "bg-white text-gray-800"} border border-black text-gray-800 px-2 py-1 mr-2 rounded-md`}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}

                {/* Color Selection */}
                {c && c.length > 0 && selectedVariant && (
                  <div className="flex mb-4">
                    {uniqueColors.map((color, index) => (
                      <button
                        key={index}
                        className={`${colorsOfVariantThatisNot0?.find(v => v.color === color) ? '' : 'line-through'} ${selectedVariant.color === color ? "bg-black text-white" : "bg-white text-gray-800"} line-througsh border border-black text-gray-800 px-2 py-1 mr-2 rounded-md`}
                        onClick={() => handleColorChange(color)}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                )}
                <h3 className="text-lg font-semibold my-2">Description:</h3>
                <p>{description}</p>
                <br />
                <button
                  disabled={
                    (variants?.length > 0 && (!selectedVariant || selectedVariant.stock < 1)) ||
                    stock < 1}
                  className='cart-button w-full mt-4 px-4 py-2 bg-yellow-500 rounded-md text-white text-lg font-semibold transition duration-300 ease-in-out hover:bg-yellow-600'
                  onClick={() =>
                    addToCartHandler({
                      productId,
                      color: selectedVariant?.color,
                      size: selectedVariant?.size,
                      price,
                      cutPrice,
                      name,
                      photo: photos![0],
                      stock: data!.product.variants!.length > 0 ? selectedVariant!.stock : data!.product.stock,
                      quantity: 1,
                      variantId: selectedVariant?._id
                    })
                  }
                >
                  {variants?.length > 0
                    ? (!selectedVariant || selectedVariant.stock < 1 ? "Not Available" : "Add to Cart")
                    : (stock > 0 ? "Add to Cart" : "Not Available")}
                </button>
              </article>
            </>
          )}
        </main>
        <div className="flex justify-center items-center">
          {category && <RelatedProducts filteredProductId={productId} category={category} heading="Related Products" />}
        </div>
        <div>
          <ProductReview reviews={reviews} numOfReviews={numOfReviews} productId={productId} />
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
        className="relative picture w-full h-[400px] max-md:hidden"
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
