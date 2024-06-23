import React, { useState } from 'react';
import { User } from "../types/types";
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { CopyText } from '../utils/function';
import { Link } from 'react-router-dom';
import Modal from './Modal';

interface UserModalType {
    user: User;
    logoutHandler?: () => void,
    heading?: any,
    children?: React.ReactNode
}

const UserModal = ({ user, logoutHandler, heading, children }: UserModalType) => {


    // taking logged in user as currentUser
    const { user: currentUser } = useSelector((state: RootState) => state.userReducer);


    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);


    return (
        <>
            <button onClick={()=>setIsOpen(true)} className="focus:outline-none ml-1 ">
                {heading ? (
                    <span className="text-blue-500">{heading}</span>
                ) : (
                    <img src={user?.photo} alt="User" className="w-7 h-7 rounded-full" />
                )}
            </button>

            <Modal isOpen={isOpen} onClose={closeModal} overLay={true}>

                <div className="bg-white py-4 px-2 xsm:px-7 rounded-lg shadow-lg animate-modal w-full ">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold">Profile</h3>
                        <button
                            onClick={closeModal}
                            className="text-gray-500 text-3xl hover:text-gray-700 focus:outline-none"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <img src={user?.photo} alt="User" className="w-16 h-16 rounded-full mb-4" />
                        <div className="w-full">
                            <div className="mb-2">
                                <label className="font-semibold">Name:</label>
                                <span className="ml-4">{user.name}</span>
                            </div>
                            <div className="mb-2">
                                <label className="font-semibold">Gender:</label>
                                <span className="ml-4">{user.gender}</span>

                            </div>
                            <div className="mb-2">
                                <label className="font-semibold">Email:</label>
                                <span className="ml-4">{user.email}</span>
                            </div>
                            {currentUser?.role === "admin" && <div className="mb-2">
                                <label className="font-semibold">Role:</label>
                                <span className="ml-4">{user.role}</span>
                            </div>}
                            <div className="mb-2">
                                <label className="font-semibold">Phone:</label>
                                <span className="ml-4">{user.phone}</span>
                            </div>
                            <div className="mb-2">
                                <label className="font-semibold">DOB:</label>
                                <span className="ml-4">{user.dob.toString().split('T')[0]}</span>
                            </div>
                            {currentUser?.role === "admin" && (
                                <>
                                    <div className="mb-2">
                                        <label className="font-semibold">User-ID:</label>
                                        <div className="truncate ">
                                            <CopyText text={user!._id} />
                                        </div>
                                    </div>

                                </>
                            )}
                        </div>

                    </div>
                    <div className="flex items-center justify-between w-full">
                        {logoutHandler &&
                            <>
                                <Link to={"/user-profile"} onClick={closeModal} className="mt-4 cursor-pointer bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600 focus:outline-none">
                                    Manage
                                </Link>
                                <button onClick={logoutHandler} className="mt-4 cursor-pointer bg-red-500 w-[4.9rem] text-white py-1 rounded hover:bg-red-600 focus:outline-none">
                                    Logout
                                </button>
                            </>
                        }
                    </div>
                    {children}
                </div >

            </Modal>
        </>
    );
};

export default UserModal;
