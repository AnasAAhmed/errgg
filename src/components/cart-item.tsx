import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { server } from "../redux/store";
import { slugify } from "../utils/features";

type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  cutPrice: number;
  quantity: number;
  stock: number;
  variantId?: string;
  size?: string;
  color?: string;
  style?: string;
};

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, cutPrice, name, price, quantity, stock, color, size } = cartItem;

  return (

    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center">
        <div className="flex xsm:flex-row flex-col">
          <img className="h-20 w-20 object-contain mr-4" src={`${server}/${photo}`} alt={name} />
          <div className="flex flex-col">

            <Link to={`/product/${slugify(name)}?id=${productId}`} className="text-lg font-medium line-clamp-1 w-70 text-gray-800 hover:text-indigo-500">
              {name}
            </Link>
            {!size ? "" : <span className="text-gray-500 ">Size: {size}</span>}

            {!color ? "" : <div className="text-gray-500 flex">Colour:<p className="rounded-full border border-black ml-2 w-6 h-6" style={{ backgroundColor: color }}></p></div>}

            {/* {!variantId  ?"" :<span className="text-gray-500 ">variantId: {variantId}</span>} */}
            <p className="text-gray-500">{`${stock < 6 ? `Only ${stock} items left` : ""}`}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-4">
          <button className="text-white font-bold xsm:py-1 px-2 xsm:px-3 bg-black hover:opacity-55 rounded-md" onClick={() => decrementHandler(cartItem)}>-</button>

          <p className="text-gray-700">{quantity}</p>

          <button className="text-white font-bold xsm:py-1 px-2 xsm:px-3 bg-black hover:opacity-55 rounded-md" onClick={() => incrementHandler(cartItem)}>+</button>
          <button onClick={() => removeHandler(productId)} className="text-gray-500 hover:text-red-500"><FaTrash /></button>
        </div>
        <p className="text-gray-500 text-center sm:text-2xl text-xl">${price}{cutPrice > 0 && <span className="text-red-500 line-through sm:text-lg text-sm">${cutPrice}</span>}</p>
      </div>
    </div>

  );
};

export default CartItem;
