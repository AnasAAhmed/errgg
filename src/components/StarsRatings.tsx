import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRatings = ({ rating }: { rating: number }) => {

    const ratingStar = Array.from({ length: 5 }, (_, index) => {
        let number = index + 0.5;
        return (
            <span key={index}>
                {rating >= index + 1 ? (
                    <FaStar className="text-yellow-500 " />
                ) : rating >= number ? (

                    <FaStarHalfAlt className="text-yellow-500 " />
                ) : (
                    <AiOutlineStar className="text-yellow-500 text-[1.3rem]" />
                )}
            </span>
        )
    })

    return (
        <div className="flex items-center ">
            {ratingStar}
            <span className="mx-3">({rating})</span>
        </div>
    );
};

export default StarRatings;
