import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";
import { userExist, userNotExist } from "../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";

const Login = () => {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState(0);
  const [date, setDate] = useState("");
  const [toggler, setToggler] = useState(false);

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      // console.log({
      //   name: user.displayName!,
      //   email: user.email!,
      //   photo: user.photoURL!,
      //   gender,
      // phone,
      //   role: "user",
      //   dob: date,
      //   _id: user.uid,
      // });

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        phone,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user!));
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        toast.error("OR Invlid Email");
        dispatch(userNotExist());
      }
    } catch (error) {
      toast.error("Sign In Fail");
    }
  };

  return (
    <>
    <div className="h-[90vh] " >
      <div className={toggler ? "hidden" : " mt-24 flex flex-col items-center justify-center"}>
        <main className=" w-full h-80 max-w-md p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-8">Login</h1>
          <div className="w-full flex flex-col items-center">
            <button onClick={loginHandler} className="w-3/4 h-12 bg-white border border-gray-400 rounded-md flex items-center justify-center">
            <FcGoogle className="w-1/3 h-full bg-white" />
              <span>Sign in with Google</span>
            </button>
            <p className="cursor-pointer text-blue-500 mt-8" onClick={() => setToggler(true)}>Don't have an Account!</p>
          </div>
        </main>
      </div>

      <div className={toggler ? " h-80vh flex flex-col items-center justify-center" : "hidden"}>
        <main className="w-full h-80 max-w-md p-8 flex flex-col items-center ">
          <h1 className="text-3xl font-bold mb-4">Sign up</h1>
          <div className="w-full flex flex-col items-center">
            <label className="mb-2 text-2xl font-semibold">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full h-12 border border-gray-400 px-2 rounded-md mb-4">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <label className="mb-2  text-2xl font-semibold">Phone Number</label>
            <input type="number" value={phone} onChange={(e) => setPhone(Number(e.target.value))} className="w-full h-12 border border-gray-400 px-2 rounded-md mb-4" />
            <label className="mb-2  text-2xl font-semibold">Date of birth</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full h-12 border border-gray-400 px-2 rounded-md mb-4" />
            <button onClick={loginHandler} className="w-3/4 h-12 mt-8 bg-white border border-gray-400 rounded-md flex items-center justify-center">
              <FcGoogle className="w-1/3 h-full bg-white" />
              <span>Sign in with Google</span>
            </button>
            <p className="cursor-pointer text-blue-500 mt-8" onClick={() => setToggler(false)}>Already Signed In Once!</p>
          </div>
        </main>
      </div>

    </div>
    <Footer />
    </>
  );
};

export default Login;
