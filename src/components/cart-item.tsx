import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { server } from "../redux/store";

 type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  cutPrice: number;
  quantity: number;
  stock: number;
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
  const { photo, productId, cutPrice, name, price, quantity, stock, color, size, style } = cartItem;

  return (

    <div className="flex items-center justify-between border-b border-gray-200 py-4">
      <div className="flex items-center">
        <img className="h-20 w-20 object-contain mr-4" src={`${server}/${photo}`} alt={name} />
        <div className="flex flex-col">
          <Link to={`/product/${productId}`} className="text-lg font-medium line-clamp-1 w-70 text-gray-800 hover:text-indigo-500">
            {name}
          </Link>
          {!size ?"" :<span className="text-gray-500 ">Size: {size}</span>}

          {!color ?"" :<span className="text-gray-500 ">Colour:<span className="rounded-full ml-2 px-[11px] py-[0.5px] " style={{ backgroundColor: color }}></span></span>}

          {!style  ?"" :<span className="text-gray-500 ">Style: {style}</span>}
          <p className="text-gray-500">{`${stock < 6 ? `Only ${stock} items left` : ""}`}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-4">
          <button className="text-white font-bold py-1 px-3 bg-black hover:opacity-55 rounded-md" onClick={() => decrementHandler(cartItem)}>-</button>

          <p className="text-gray-700">{quantity}</p>

          <button className="text-white font-bold py-1 px-3 bg-black hover:opacity-55 rounded-md" onClick={() => incrementHandler(cartItem)}>+</button>
          <button onClick={() => removeHandler(productId)} className="text-gray-500 hover:text-red-500"><FaTrash /></button>
        </div>
        <p className="text-gray-500 text-center text-2xl">${price}{cutPrice > 0 && <span className="text-red-500 line-through text-lg ">${cutPrice}</span>}</p>
      </div>
    </div>

  );
};

export default CartItem;
