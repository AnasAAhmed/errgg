import { FormEvent, useState } from "react";
import { useCreateProductReviewMutation } from "../redux/api/productAPI";
import { onlyResponseToast } from "../utils/features";
import { FaEdit, FaSpinner } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { User } from "../types/types";
import toast from "react-hot-toast";
import Modal from "./Modal";

type ReviewFormProps = {
    isEditing?: boolean;
    oldRating?: number,
    oldComment?: string,
    productId: string,
    user: User | null
}

const ReviewForm = ({ isEditing, productId, user, oldRating, oldComment }: ReviewFormProps) => {

    const [rating, setRating] = useState(oldRating || 0);
    const [comment, setComment] = useState(oldComment || "");
    const [modalOpen, setModalOpen] = useState(false);


    const [createReview, { isLoading: isCreatingReview }] = useCreateProductReviewMutation();

    const handleCreateReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await createReview({ rating,email: user!.email, photo: user!.photo, comment,  name: user!.name, userId: user!._id, productId });

            if (!isCreatingReview) setModalOpen(false);
            onlyResponseToast(res);

        } catch (error) {
            console.error('Error creating review:', error);
            toast.error(`Error creating review:${error}`);

        }
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="">
            <div className='flex flex-col items-center'>
                {isEditing ? <button className="text-[0.7rem] sm:text-sm px-1 py-1 rounded-md " onClick={openModal}><FaEdit /></button> : <button onClick={openModal} className="bg-blue-500 text-white px-2 py-1 rounded-full mb-1">Submit Review</button>}
            </div>
            <Modal isOpen={modalOpen} onClose={closeModal} overLay={true}>
                <div className="bg-white w-[90vw] sm:w-[60vh] animate-modal p-8 rounded-md ">

                    <div className="flex flex-row justify-between mb-6 items-center">
                        <h2 className="text-xl font-semibold">Submit Review</h2>
                        <button onClick={closeModal} className="text-2xl rounded-md">
                            <IoCloseSharp />
                        </button>
                    </div>
                    <form className="space-y-4" onSubmit={handleCreateReview}>
                        <div>
                            <label htmlFor="rating" className="block text-md mb-3 font-medium">Rating</label>
                            <input
                                id="rating"
                                type="number"
                                max={5}
                                className="border px-1 rounded-md w-full"
                                placeholder="Rating"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="comment" className="block text-md mb-3 font-medium">Comment</label>
                            <textarea
                                id="comment"
                                rows={3}
                                className="border px-1 rounded-md w-full"
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={isCreatingReview}>
                            {isCreatingReview ? <FaSpinner className='animate-spin text-2xl mx-3' /> : "Submit"}
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default ReviewForm


