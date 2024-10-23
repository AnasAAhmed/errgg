import { FaStar } from "react-icons/fa";
import { server } from "../redux/store";
import { Link } from "react-router-dom";
import { slugify } from "../utils/features";
import { Product } from "../types/types";
import toast from "react-hot-toast";
import CartItem from "./cart-item";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  return (
    <div className="animate-modal xs:p-4 flex flex-col justify-center items-center bg-white rounded-lg">
      <Link to={`/product/${slugify(product.name)}`} className="w-full  sm:w-[220px] flex flex-col gap-3">
        <img
          src={`${server}/${product.photos[0]}`}
          alt={product.name}
          className="w-full h-[180px] sm:h-[240px] rounded-lg object-cover transition-transform transform hover:scale-105 duration-300"
        />
        <div className="flex flex-col mx-2">
          <p className="text-base font-medium text-gray-800 line-clamp-2">{product.name}</p>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span className="font-semibold text-lg text-gray-900">${product.price}</span>
            {product.cutPrice > 0 && (
              <span className="text-xs text-gray-400 line-through">${product.cutPrice}</span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="flex items-center text-yellow-500 text-sm">
              <FaStar className="mr-1" /> {product.ratings}/5
            </p>
            {product.sold! > 0 && <p className="text-sm font-semibold text-gray-500">Sold: {product.sold}</p>}
          </div>
        </div>
      </Link>

      {product.variants && product.variants.length > 0 ? (
        <Link to={`/product/${slugify(product.name)}`} className="mt-3 w-full">
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700">
            Select Options
          </button>
        </Link>
      ) : (
        <button
          className="mt-3 w-full py-2 bg-gray-600 text-white rounded-lg font-medium transition-colors hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={product.stock < 1}
          onClick={() =>
            addToCartHandler({
              productId: product._id,
              price: product.price,
              cutPrice: product.cutPrice,
              name: product.name,
              photo: product.photos![0],
              stock: product.stock,
              quantity: 1,
            })
          }
        >
          {product.stock < 1 ? "Out of Stock" : "Add To Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
