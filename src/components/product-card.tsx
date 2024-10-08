import { FaStar } from "react-icons/fa";
import { server } from "../redux/store";
import { Link } from "react-router-dom";
import { slugify } from "../utils/features";

type ProductsProps = {
  productId?: string;
  photo: string;
  name: string;
  price: number;
  cutPrice: number;
  numOfReviews: number;
  ratings: number;
  sold?: number
};

const ProductCard = ({
  price,
  cutPrice,
  name,
  photo,
  numOfReviews,
  ratings,
  sold
}: ProductsProps) => {
  
  return (
    <div className="animate-modal">
      <Link to={`/product/${slugify(name)}`} className="mt-8 w-full  sm:w-[220px] flex flex-col gap-2">
        <img src={`${server}/${photo}`} alt={name} className="w-full h-[170px] xsm:h-[220px]  sm:h-[260px] rounded-lg object-cover" />
        <p className="line-clamp-2 min-h-[3rem] text-sm xsm:text-lg w-[90%] font-semibold mx-2">{name}</p>
        <span className="xsm:text-2xl mt-2 font-semibold mx-2">${price}{" "}<span className="text-sm line-through">{cutPrice > 0 ? `$${cutPrice}` : ""}</span></span>
        <div className="flex mb-2 flex-row items-center justify-between xsm:mx-2">
          <p className="flex items-center text-orange-500 text-clip"><FaStar />({ratings}/5) ({numOfReviews})</p>
          {sold! > 0 && <p className=" text-sm font-semibold ">sold({sold})</p>}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

