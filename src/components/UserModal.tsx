import React, { useState } from 'react';
import { User } from "../types/types";
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store";
import { Link } from 'react-router-dom';
import Modal from './Modal';

interface UserModalProps {
    user: User;
    logoutHandler?: () => void;
    heading?: React.ReactNode;
    children?: React.ReactNode;
}

const UserModal = ({ user, logoutHandler, heading, children }: UserModalProps) => {
    const { user: currentUser } = useSelector((state: RootState) => state.userReducer);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => setIsOpen(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="focus:outline-none ml-1">
                {heading ? (
                    <span className="text-blue-500">{heading}</span>
                ) : (
                    <img src={user?.photo} alt="User Avatar" className="w-8 h-8 rounded-full" />
                )}
            </button>

            <Modal isOpen={isOpen} onClose={closeModal} overLay={true}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] sm:w-[30rem] animate-modal">
                    <div className="flex  justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
                        <button onClick={closeModal} className="text-gray-500 text-2xl hover:text-gray-700">
                            &times;
                        </button>
                    </div>

                    <div className="text-center flex flex-col justify-center items-center">
                        <img src={user?.photo} alt="User" className="w-16 h-16 rounded-full mb-4 object-cover" />
                        <p className="text-lg font-medium text-gray-900">{user.name}</p>
                        <p className="text-gray-600">{user.email}</p>
                    </div>

                    <div className="mt-4 space-y-2 text-left text-gray-700">
                        <p>
                            <span className="font-medium">Gender: </span>{user.gender}
                        </p>
                        {user.phone && (
                            <p>
                                <span className="font-medium">Phone: </span>{user.phone}
                            </p>
                        )}
                        <p>
                            <span className="font-medium">DOB: </span>{new Date(user.dob).toLocaleDateString()}
                        </p>
                        {currentUser?.role === "admin" && (
                            <p>
                                <span className="font-medium">Role: </span>{user.role}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <Link
                            to="/user-profile"
                            onClick={closeModal}
                            className="text-indigo-500 hover:text-indigo-600 font-medium"
                        >
                            Manage Account
                        </Link>
                        {logoutHandler && (
                            <button
                                onClick={logoutHandler}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                    {children}
                </div>
            </Modal>
        </>
    );
};

export default UserModal;
