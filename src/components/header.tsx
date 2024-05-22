import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
} from "react-icons/fa";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import UserModal from "./UserModal";
import { useState } from "react";
import { RiMenuLine } from "react-icons/ri";
interface PropsType {
  user?: User | null;
  cartItemsLength: number
}

const Header = ({ user, cartItemsLength }: PropsType) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [scrolled, setScrolled] = useState(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     if (scrollTop > 100) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [])

  return (

    <nav className="flex bg-white transition-all duration-500 top-0 w-full z-30 items-center justify-between px-4 py-2">
      {/* <nav className={`flex fixed ${scrolled ? "bg-gray-900" : "bg-transparent" } transition-all duration-500 top-0 w-full z-30 items-center justify-between px-4 py-2`}> */}
      <Link to={"/"} className="text-gray-800 ml-0 md:ml-2 hover:text-gray-500 text-2xl font-bold" onClick={() => { setIsOpen(false); window.scroll(0, 0) }}>LOGO.</Link>

      {/* Desltop Nav */}
      <div className="flex items-center ">
        <div className="hidden sm:flex justify-between gap-1 md:gap-3 ml-3">
          <Link onClick={() => window.scroll(0, 0)} className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1  font-semibold text-lg" to="/">
            Home
          </Link>
          <Link className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1  font-semibold text-lg" to="/">
            About
          </Link>
          <Link className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1  font-semibold text-lg" to="/">
            Contact
          </Link>
          {user?._id && (
            <>
              <Link className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1  font-semibold text-lg" to="/orders">
                Orders
              </Link>
              {user.role === "admin" && (
                <Link className="hover:bg-gray-200 text-gray-800 rounded-md px-2 py-1 font-semibold text-lg" to="/admin/dashboard">Dashboard
                </Link>
              )}
            </>
          )}
        </div>
        <Link to={`/search`} className="px-3 items-center rounded-lg  hover:text-gray-800 text-gray-800" onClick={() => setIsOpen(false)} >
          <FaSearch size={"1.2rem"} />
        </Link>

        <Link to={"/cart"} onClick={() => setIsOpen(false)} className="mr-2 hover:text-gray-800 text-gray-800 relative">
          <FaShoppingBag size={"1.3rem"} className=" hover:text-gray-800 text-gray-800" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-gray-100 rounded-full px-1 text-xs">{cartItemsLength > 0 ? cartItemsLength : ""}</span>
        </Link>

        <div className="flex sm:hidden relative">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="mr-1 hover:text-gray-800 text-gray-800 "
          >
            <RiMenuLine size={"1.5rem"} />
          </button>
          <dialog className="top-8 py-2 z-30 px-4 rounded-lg bg-gray-100" open={isOpen} style={{ left: 'calc(100% - 100px)' }}>
            <div className="flex flex-col">
              <Link className=" mb-1 hover:text-gray-800 text-gray-800 font-semibold" onClick={() => setIsOpen(false)} to="/">
                Home
              </Link>
              <Link className="mb-1 hover:text-gray-800 text-gray-800 font-semibold" to="/">
                About
              </Link>
              <Link className="mb-1 hover:text-gray-800 text-gray-800 font-semibold" to="/">
                Contact
              </Link>
              {user?._id &&
                <>
                  {user.role === "admin" && (
                    <Link className=" mb-1 hover:text-gray-800 text-gray-800 font-semibold" onClick={() => setIsOpen(false)} to="/admin/dashboard">
                      Dashboard
                    </Link>
                  )}
                  <Link className=" hover:text-gray-800 text-gray-800 font-semibold" onClick={() => setIsOpen(false)} to="/orders">
                    My Orders
                  </Link>
                </>
              }
            </div>
          </dialog>
        </div>
        {user?._id ? (<UserModal user={user} logoutHandler={logoutHandler} />) : (
          <Link to={"/login"} className=" ml-2 font-semibold inline-blockbg-indigo-500 bg-indigo-500 text-gray-200 px-4 py-1 rounded-lg hover:bg-indigo-600">
            <p className="cursor-pointer">Login</p>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
