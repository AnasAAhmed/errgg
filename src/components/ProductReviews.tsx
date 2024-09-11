import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaChevronDown, FaChevronUp, FaSpinner, FaTrash } from 'react-icons/fa';
import StarRatings from './StarsRatings';
import { calculateTimeDifference } from '../utils/function';
import { useDeleteProductReviewMutation } from '../redux/api/productAPI';
import { onlyResponseToast } from '../utils/features';
import ReviewForm from './ReviewForm';
import { RootState } from '../redux/store';
import { Review } from '../types/types';

type ProductReviews = {
    productId: string,
    numOfReviews?: number
    reviews: Review[];
}

const ProductReviews = ({ productId, reviews, numOfReviews }: ProductReviews) => {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const [viewAll, setViewAll] = useState(4); // Initial visible reviews
    const [isReviewed, setIsReviewed] = useState(false);
    const [deleteReview, { isLoading: isDeletingReview }] = useDeleteProductReviewMutation();

    useEffect(() => {
        if (reviews) {
            const userReview = reviews.find((review: Review) => review.userId === user?._id);
            setIsReviewed(!!userReview);
        }
    }, [reviews, user]);

    const handleDeleteReview = async () => {
        try {
            const res = await deleteReview({ userId: user!._id, productId });
            onlyResponseToast(res);
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-4">Product Reviews ({numOfReviews})</h2>
                <p className="text-sm font-medium text-gray-500">this button can be removed .if want to only customer who odrer this product will be able review it </p>
            </div>
            <ReviewForm productId={productId} user={user} />
            <div className="md:mx-12 mt-12  ">
                {!reviews ? (
                    <div className="flex items-center justify-center h-[15.4rem]">
                        <FaSpinner className="animate-spin h-24 w-24 text-gray-500" />
                    </div>
                ) : reviews!.length > 0 ? (
                    <>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {reviews!.slice(0, viewAll).map((review, index) => (
                                <li key={index} className="border pb-4 mb-4 py-3 px-2">
                                    <div className="flex flex-row justify-between items-center">
                                        <div className="flex flex-row items-center gap-3">
                                            <span>
                                                <img src={review.photo} alt="customer" className="rounded-full h-8 w-8" />
                                            </span>
                                            <p><strong>{review.name}</strong></p>
                                            <span className="text-md">
                                                <StarRatings rating={review.rating} />
                                            </span>
                                        </div>
                                        {review.userId === user?._id && (
                                            <div className="flex flex-row items-center">
                                                <button onClick={handleDeleteReview} className="px-1 text-[0.7rem] sm:text-sm py-1 rounded-md">
                                                    {isDeletingReview ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                                                </button>
                                                <ReviewForm isEditing={isReviewed} oldComment={review.comment} oldRating={review.rating} productId={productId} user={user} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex mr-2 mt-3 flex-row justify-between">
                                        <p>{review.comment}</p>
                                        <p className="font-bold flex justify-end text-sm w-36">{calculateTimeDifference(review.date)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {reviews!.length > 4 && (
                            <div className="flex justify-center">
                                {reviews!.length > viewAll ? (
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-200"
                                        onClick={() => setViewAll((prev) => prev + 4)} // Show 4 more reviews
                                    >
                                        <FaChevronDown />
                                        <span>Show More</span>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-200"
                                        onClick={() => setViewAll(4)} // Show only 4 reviews
                                    >
                                        <FaChevronUp />
                                        <span>Show Less</span>
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <h1 className="text-3xl font-semibold mb-12 flex items-center justify-center">No reviews Yet</h1>
                )}
            </div>
        </div>
    );
};

export default ProductReviews


