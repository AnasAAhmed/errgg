import { useState, useEffect, FormEvent, } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { IoCloseSharp } from "react-icons/io5";
import { FaEdit, FaSpinner, FaTrash } from 'react-icons/fa';
import StarRatings from './StarsRatings';
import { calculateTimeDifference } from '../utils/function';
import { useCreateProductReviewMutation, useDeleteProductReviewMutation, useFetchProductReviewsQuery } from '../redux/api/productAPI';
import { onlyResponseToast } from '../utils/features';
import { Review } from '../types/types';




const ProductReviews = ({ productId, numOfReviews }: { productId: string, numOfReviews?: number }) => {

    const { user } = useSelector((state: RootState) => state.userReducer);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [isReviewed, setIsReviewed] = useState(false);

    const { data, isLoading, error } = useFetchProductReviewsQuery(productId);
    const reviews: Review[] = Array.isArray(data?.reviews) ? data!.reviews : [];

    const [createReview, { isLoading: isCreatingReview }] = useCreateProductReviewMutation();
    const [deleteReview, { isLoading: isDeletingReview }] = useDeleteProductReviewMutation();

    useEffect(() => {
        if (reviews) {
            const userReview = reviews.find((review: Review) => review.userId === user?._id);
            setIsReviewed(userReview ? true : false);
        }
    }, [reviews, user]);

    const handleCreateReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await createReview({ rating, comment, email: user!.email, name: user!.name, userId: user!._id, productId });

            if (!isCreatingReview) setModalOpen(false);
            onlyResponseToast(res);

        } catch (error) {
            console.error('Error creating review:', error);
        }
    };

    const handleDeleteReview = async () => {
        try {
            const res = await deleteReview({ userId: user!._id, productId });
            onlyResponseToast(res);
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    if (error) return <p>Error Fetching review</p>;

    return (
        <div className="container  mx-auto p-4">
            <div className='flex flex-col items-center'>
                <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
               </div>
               {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={handleBackdropClick}>
                    <div className="bg-white w-full animate-modal p-8 rounded-md max-w-md">
                        <div className="flex flex-row justify-between mb-6 items-center">
                            <h2 className="text-xl font-semibold ">{isReviewed ? "Edit Review" : "Submit Review"}</h2>
                            <button onClick={closeModal} className="text-2xl rounded-md "><IoCloseSharp /></button>
                        </div>
                        <form className="space-y-4" onSubmit={handleCreateReview}>
                            <div>
                                <label htmlFor="rating" className="block text-md mb-3 font-medium">Rating</label>
                                <input id="rating" type="number" max={5} className="border px-1 rounded-md w-full" placeholder="Rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
                            </div>
                            <div>
                                <label htmlFor="comment" className="block text-md mb-3 font-medium">Comment</label>
                                <textarea id="comment" rows={3} className="border px-1 rounded-md w-full" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" >{isCreatingReview ? <FaSpinner className='animate-spin text-2xl mx-3' /> : "Submit"}</button>
                        </form>
                    </div>
                </div>
            )}
            <div className='md:mx-24'>

                <h3 className="text-2xl font-semibold mt-8 ">Reviews {numOfReviews}</h3>
                <p className="text-sm text-gray-500 mb-4">Scroll to see more reviews</p>
                {isLoading ? (
                    <div className="flex items-center justify-center h-[15.4rem]">
                        <FaSpinner className="animate-spin h-24 w-24 text-gray-500" />
                    </div>
                ) : (reviews.length > 0 ? (
                    <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-scroll max-h-[400px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
                        {reviews.map((review, i) => (
                            <li key={i} className="border pb-4 mb-4 py-3 px-2">
                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-row items-center gap-3'>
                                        <p><strong>{review.name}</strong></p>
                                        <span className=" text-lg">
                                            <StarRatings rating={review.rating} />
                                        </span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='text-[0.5rem] xsm:text-[0.7rem] sm:text-sm font-semibold'>{calculateTimeDifference(review.date)}</p>
                                        {review.userId === user?._id && (
                                            <div className='text-center'>
                                                <button onClick={handleDeleteReview} className="px-1 text-[0.7rem] sm:text-sm py-1 rounded-md mt-2">{isDeletingReview ? <FaSpinner className='animate-spin' /> : <FaTrash />}</button>
                                                <button onClick={() => { openModal(); setRating(review.rating); setComment(review.comment) }} className="mr-2 text-[0.7rem] sm:text-sm px-1 py-1 rounded-md mt-2"><FaEdit /></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* <p className='text-[0.7rem] sm:text-sm'> {review.email}</p> */}
                                <p>{review.comment}</p>
                            </li>

                        ))}
                    </ul>
                ) : (
                    <h1 className='text-4xl mb-12 flex items-center justify-center'>No reviews Yet</h1>
                ))}
            </div>
        </div>
    );
};

export default ProductReviews;
