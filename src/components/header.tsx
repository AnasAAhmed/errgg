import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import UserModal from "./UserModal";
import { useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import Modal from "./Modal";
import DropDown from "./DropDown";

interface PropsType {
  user?: User | null;
  cartItemsLength: number;
}

const Header = ({ user, cartItemsLength }: PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  const closeModal = () => setIsOpen(false);

  const handleClick = (scrollTop = false) => {
    if (scrollTop) window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };


  return (
    <nav
      className={`flex max-sm:sticky bg-white transition-all duration-500 top-0 w-full z-10 items-center justify-between px-4 py-2 shadow-md`}
    >
      <Link
        to="/"
        className="text-gray-800 ml-0 md:ml-2 hover:text-gray-500 text-2xl font-bold"
        onClick={() => handleClick(true)}
      >
        LOGO.
      </Link>

      <div className="flex items-center">
        <div className="hidden sm:flex justify-between gap-1 md:gap-3 ml-3">
          <Link
            onClick={() => handleClick(true)}
            className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1 font-semibold text-lg"
            to="/"
          >
            Home
          </Link>
          <Link
            className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1 font-semibold text-lg"
            to="/blog"
            onClick={() => handleClick(true)}
          >
            Blog
          </Link>
          <Link
            className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1 font-semibold text-lg"
            to="/contact"
            onClick={() => handleClick(true)}
          >
            Contact
          </Link>
          {user?._id && (
            <>
              <Link
                className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1 font-semibold text-lg"
                to="/orders"
              >
                Orders
              </Link>
              {/* {user.role === "admin" && ( */}
                <DropDown options={[
                  {
                    key: "Dashboard",
                    value: "/admin/dashboard"
                  },
                  {
                    key: "Products",
                    value: "/admin/product"
                  },
                  {
                    key: "Transactions",
                    value: "/admin/transaction"
                  },
                  {
                    key: "Customer",
                    value: "/admin/customer"
                  },
                  {
                    key: "Create",
                    value: "/admin/product/new"
                  },
                  {
                    key: "Charts",
                    value: "/admin/chart/bar"
                  },
                ]} />
              {/* )} */}
            </>
          )}
        </div>

        <Link
          to="/search"
          className="px-3 items-center rounded-lg hover:text-gray-800 text-gray-800"
          onClick={() => handleClick(true)}
        >
          <FaSearch size="1.2rem" />
        </Link>

        <Link
          to="/cart"
          onClick={() => handleClick(true)}
          className="mr-2 hover:text-gray-800 text-gray-800 relative"
        >
          <FaShoppingBag size="1.3rem" className="hover:text-gray-800 text-gray-800" />
          {cartItemsLength > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-gray-100 rounded-full px-1 text-xs">
              {cartItemsLength}
            </span>
          )}
        </Link>

        <div className="flex sm:hidden relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="mr-1 hover:text-gray-800 text-gray-800"
          >
            <RiMenuLine size="1.5rem" />
          </button>
          <Modal isOpen={isOpen} onClose={closeModal} overLay={true}>
            <div className="absolute p-2 animate-modal top-12 right-4 bg-white shadow-lg rounded-lg flex flex-col ">
              <Link
                className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold "
                onClick={() => handleClick(true)}
                to="/"
              >
                Home
              </Link>
              <Link
                className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold " to="/blog"
                onClick={() => handleClick(true)}
              >
                Blog
              </Link>
              <Link
                className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold " to="/contact"
                onClick={() => handleClick(true)}
              >
                Contact
              </Link>
              {user?._id && (
                <>
                  {user.role === "admin" && (
                    <Link
                      className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold " onClick={() => handleClick(true)}
                      to="/admin/dashboard"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold " onClick={() => handleClick(true)}
                    to="/orders"
                  >
                    My Orders
                  </Link>
                </>
              )}
            </div>
          </Modal>
        </div>

        {user?._id ? (
          <UserModal user={user} logoutHandler={logoutHandler} />
        ) : (
          <Link
            to="/login"
            className="ml-2 font-semibold bg-indigo-500 text-gray-200 px-4 py-1 rounded-lg hover:bg-indigo-600"
          >
            <p className="cursor-pointer">Login</p>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;




