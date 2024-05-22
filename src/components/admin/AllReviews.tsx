import { FaSpinner } from 'react-icons/fa';
import StarRatings from '../StarsRatings';
import { CopyText, calculateTimeDifference } from '../../utils/function';
import { useFetchProductReviewsQuery } from '../../redux/api/productAPI';
import { Review } from '../../types/types';

const AllReviews = ({ productId }: { productId: string }) => {

    const { data, isLoading, error } = useFetchProductReviewsQuery(productId);
    const reviews: Review[] = Array.isArray(data?.reviews) ? data!.reviews : [];

    if (error) return <p className='text-3xl font-semibold text-red-400 mt-12'>Wrong Product - Id / Error fetching reviews See logs for More Details.</p>;
 
  

    return (
        <div className="container  mx-auto p-4">

            <div className='md:mx-24'>
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-[15.4rem]">
                         <FaSpinner className="animate-spin h-24 w-24 text-gray-500" />
                    </div>
                ) : (reviews.length > 0 ? (
                    <ul className="mt-4 ">
                        {reviews.map((review,i) => (
                            <li key={i} className="border pb-4 mb-4 py-3 px-6">
                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-row items-center gap-3'>
                                        <p><strong>{review.name}</strong></p>
                                        <span className=" text-lg">
                                            <StarRatings rating={review.rating} />
                                        </span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='text-[0.5rem] xsm:text-[0.7rem] sm:text-sm font-semibold'>{calculateTimeDifference(review.date)}</p>
                                    </div>
                                </div>
                                <p className='text-[0.7rem] sm:text-sm'><CopyText text={review.email}/></p>
                                <p><strong>Comment:</strong> {review.comment}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews Yet</p>
                ))}
            </div>
        </div>
    );
};

export default AllReviews;