import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { useDeleteSingleUserMutation, useUpdateUserMutation } from '../redux/api/userAPI';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaSignOutAlt, FaSpinner, FaTrash } from 'react-icons/fa';
import { signOut, deleteUser as firebaseDeleteUser } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
// import { responseToast } from '../utils/features';
import { MdOutlineSaveAlt } from 'react-icons/md';
import Modal from '../components/Modal';

const UserProfile = () => {

    const navigate = useNavigate();

    const { user } = useSelector((state: RootState) => state.userReducer);

    const [updateUser] = useUpdateUserMutation();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState(0);



    useEffect(() => {
        if (user) {
            setName(user!.name);
            setDob(user!.dob.toString().split('T')[0]);
            setGender(user!.gender);
            setPhone(user!.phone);
        }
    }, [user]);

    const closeModal = () => setIsOpen(false);
    const closeModal2 = () => setIsOpen2(false);

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Signed out successfully");
        } catch (error) {
            toast.error("Sign out failed");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await updateUser({ id: user!._id, name, dob, gender, phone }).unwrap();
            toast.success('user! updated successfully');
            location.reload();
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };
    const [deleteUser] = useDeleteSingleUserMutation();

    const deleteHandler = async () => {
        try {
            setIsLoading2(true);
            const userFireB = auth.currentUser;
            if (!userFireB) {
                return toast.error("User not authenticated");
            }
            deleteUser({ userId: user!._id })
            await firebaseDeleteUser(userFireB);
            setIsLoading2(false);
            toast.success(`Account Deleted`);
            navigate('/')
        } catch (error) {
            const typedError = error as Error;
            toast.error(`Failed to Delete Account${typedError.message}`);
            setIsLoading2(false);
        }

    };

    return (
        <div className="flex items-center justify-center sm:mt-12">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <Link to="/" className="text-blue-500 flex items-center">
                        <FaArrowLeft className="mr-2" /> Back
                    </Link>
                    <h3 className="text-xl font-semibold">Account</h3>
                    <h3 className="text-xl invisible font-semibold">Profile</h3>
                </div>
                <form onSubmit={handleSubmit} className="spacse-y-4">
                    <div className="flex flex-col items-center mb-6 ">
                        <img src={user?.photo} alt="user" className="w-16 h-16 rounded-full mb-4" />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <label className="font-semibold w-24">Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="font-semibold w-24">Gender:</label>
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label className="font-semibold w-24">Email:</label>
                            <span className="flex-1 truncate">{user!.email}</span>
                        </div>
                        {user?.role === "admin" && <div className="flex items-center">
                            <label className="font-semibold w-24">Role:</label>
                            <span className="flex-1">{user!.role}</span>
                        </div>}
                        <div className="flex items-center">
                            <label className="font-semibold w-24">Phone:</label>
                            <input
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(Number(e.target.value))}
                                className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="font-semibold w-24">DOB:</label>
                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                            />
                        </div>

                    </div>
                    <div className="flex flex-wrap sm:flex-row justify-between items-center mt-6">
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="flex items-center mt-4 xsm:mt-0 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 focus:outline-none"
                        >
                            Save <MdOutlineSaveAlt className='ml-2' />
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpen2(true)}
                            className="flex items-center mt-4 xsm:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                        >
                            Delete <FaTrash className="ml-2" />
                        </button>
                        <button
                            type="button"
                            onClick={logoutHandler}
                            className="flex items-center bg-indigo-500 mt-4 xsm:mt-0 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none"
                        >
                            Logout <FaSignOutAlt className="ml-2" />
                        </button>
                    </div>
                    <Modal isOpen={isOpen} onClose={closeModal} overLay={true}>
                        <div className="bg-white animate-modal rounded-lg shadow-lg p-6 w-full">
                            <p className="text-center font-semibold text-xl mb-4">Are you sure you want to update your profile?</p>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                                >
                                    {isLoading ? <FaSpinner className="animate-spin mx-[1.1rem]" /> : "Update"}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="ml-2 flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </Modal>
                </form>
                <Modal isOpen={isOpen2} onClose={closeModal2} overLay={true}>

                    <div className="bg-white animate-modal rounded-lg shadow-lg p-6 w-full">
                        <p className="text-center font-semibold mb-4">Are you sure you want to delete your account?</p>
                        <p className="text-center font-semibold uppercase mb-4 flex max-w-96 items-center gap-2 text-red-500"> Note: Make sure there is no  Pending/Processing Order before deleting account your all data will be lose. Your reviews wont be delete & you cant be able to change it after account deletion</p>

                        <div className="flex justify-center">
                            <button
                                onClick={deleteHandler}
                                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                            >
                                {isLoading2 ? <FaSpinner className="animate-spin mx-1" /> : "Yes"}
                            </button>
                            <button
                                onClick={closeModal2}
                                className="ml-2 flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default UserProfile;
``
