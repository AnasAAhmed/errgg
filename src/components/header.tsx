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
import Notifications from "./Noftifications";

interface PropsType {
  user?: User | null;
  cartItemsLength: number;
  adminNotification?: any;
}

const Header = ({ user, cartItemsLength, adminNotification }: PropsType) => {
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
    // if (scrollTop) window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const isAdmin = user?.role === "admin" ? true : false;

  return (
    <header
      className={`flex max-sm:sticky bg-white transition-all duration-500 top-0 w-full z-50 items-center justify-between px-4 py-2 shadow-md`}
    >
      {/* Logo */}
      <h1 className="text-2xl font-bold">
        <Link
          to="/"
          className="text-gray-800 ml-0 md:ml-2 hover:text-gray-500"
          onClick={() => handleClick(true)}
          aria-label="Homepage"
        >
          LOGO.
        </Link>
      </h1>

      {/* Main Navigation */}
      <nav aria-label="Main Navigation">
        <ul className="hidden sm:flex justify-between items-center gap-1 md:gap-3 ml-3">
          <li>
            <Link
              to="/"
              onClick={() => handleClick(true)}
              className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1 font-semibold text-lg"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              onClick={() => handleClick(true)}
              className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1 font-semibold text-lg"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              onClick={() => handleClick(true)}
              className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1 font-semibold text-lg"
            >
              Contact
            </Link>
          </li>
          {user?._id && (
            <>
              <li>
                <Link
                  to="/orders"
                  className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1 font-semibold text-lg"
                >
                  Orders
                </Link>
              </li>
              <li>
                <DropDown
                  options={[
                    { key: "Dashboard", value: "/admin/dashboard" },
                    { key: "Products", value: "/admin/product" },
                    { key: "Transactions", value: "/admin/transaction" },
                    { key: "Customer", value: "/admin/customer" },
                    { key: "Create Product", value: "/admin/product/new" },
                    { key: "Charts", value: "/admin/chart/bar" },
                    { key: "Coupons", value: "/admin/app/coupon" },
                  ]}
                />
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Search and Cart */}
      <div className="flex items-center">
        <Link
          to="/search"
          className="px-3 items-center rounded-lg hover:text-gray-800 text-gray-800"
          onClick={() => handleClick(true)}
          aria-label="Search"
        >
          <FaSearch size="1.2rem" />
        </Link>

        {user && (
          <Notifications
            isAdmin={isAdmin}
            adminNotification={adminNotification}
            userId={user._id}
          />
        )}

        <Link
          to="/cart"
          onClick={() => handleClick(true)}
          className="mr-2 hover:text-gray-800 text-gray-800 relative"
          aria-label="Shopping Cart"
        >
          <FaShoppingBag size="1.3rem" />
          {cartItemsLength > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-gray-100 rounded-full px-1 text-xs">
              {cartItemsLength}
            </span>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="mr-1 hover:text-gray-800 text-gray-800"
            aria-label="Menu"
          >
            <RiMenuLine size="1.5rem" />
          </button>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <div className="absolute p-2 animate-modal top-12 right-4 bg-white shadow-lg rounded-lg flex flex-col">
              <Link
                to="/"
                className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold"
                onClick={() => handleClick(true)}
                aria-label="Home"
              >
                Home
              </Link>
              <Link
                to="/blog"
                className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold"
                onClick={() => handleClick(true)}
                aria-label="Blog"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold"
                onClick={() => handleClick(true)}
                aria-label="Contact"
              >
                Contact
              </Link>
              {user?._id && (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold"
                      onClick={() => handleClick(true)}
                      aria-label="Admin Dashboard"
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to="/orders"
                    className="text-xl hover:bg-gray-200 px-4 py-2 rounded-md text-gray-800 font-semibold"
                    onClick={() => handleClick(true)}
                    aria-label="My Orders"
                  >
                    My Orders
                  </Link>
                </>
              )}
            </div>
          </Modal>
        </div>

        {/* User Login/Logout */}
        {user?._id ? (
          <UserModal user={user} logoutHandler={logoutHandler} />
        ) : (
          <Link
            to="/login"
            className="ml-2 font-semibold bg-indigo-500 text-gray-200 px-4 py-1 rounded-lg hover:bg-indigo-600"
            aria-label="Login"
          >
            <p className="cursor-pointer">Login</p>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
