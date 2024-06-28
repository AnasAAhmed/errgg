import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
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
import { LoadingBarProps } from "../types/types";

const Login = ({ setLoadingBar }: LoadingBarProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState<number>(0);
  const [date, setDate] = useState("");
  const [toggler, setToggler] = useState(false);

  const [login] = useLoginMutation();

  const googleLoginHandler = async () => {
    try {
      setLoadingBar(20);
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      setLoadingBar(70);
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
      setLoadingBar(99);
      setTimeout(() => {
        setLoadingBar(100);
      }, 200);
      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user!));
      } else {
        setLoadingBar(0);
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (error) {
      setLoadingBar(0);
      toast.error("Sign In Failed");
    }
  };

  const emailSignUpHandler = async () => {
    if (!gender || !phone || !date) {
      toast.error("Please fill out all required fields.");
      return;
    }
    try {
      setLoadingBar(20);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      setLoadingBar(70);
      const res = await login({
        name: user.email!.split('@')[0],
        email: user.email!,
        photo: "https://lh3.googleusercontent.com/a/ACg8ocLMa8FJhYEVUB-TzqqDoHePJyy7bTzJ8XLc9D8fKAjDmmDnH3g=s288-c-no",
        gender,
        phone,
        role: "user",
        dob: date,
        _id: user.uid,
      });
      setLoadingBar(99);
      setTimeout(() => {
        setLoadingBar(100);
      }, 200);
      if ("data" in res) {
        toast.success(res.data.message);
        const data = await getUser(user.uid);
        dispatch(userExist(data?.user!));
      } else {
        setLoadingBar(0);
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
        dispatch(userNotExist());
      }
    } catch (error) {
      setLoadingBar(0);
      toast.error(`Sign Up Failed: ${error.message}`);
    }
  };

  const emailLoginHandler = async () => {
    try {
      setLoadingBar(20);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setLoadingBar(70);
      const data = await getUser(user.uid);
      dispatch(userExist(data?.user!));
      setLoadingBar(99);
      setTimeout(() => {
        setLoadingBar(100);
      }, 200);
      toast.success("Login successful");
    } catch (error) {
      setLoadingBar(0);
      toast.error(`Login Failed: ${error.message}`);
    }
  };

  return (
    <>
      <div className="h-[700px] flex flex-col justify-center items-center">
        <div className={`w-full max-w-md p-8 bg-white rounded-lg border-2 shadow-lg ${toggler ? "hidden" : "block"}`}>
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
          <div className="flex flex-col items-center">
            <button
              onClick={googleLoginHandler}
              className="w-full h-12 bg-white border mt-1 border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FcGoogle className="mr-2" /> Login with Google
            </button>
              <span className="text-gray-400 font-medium text-lg my-2"> OR</span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                id="login"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border border-gray-300 px-4 rounded-md mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                id="login"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border border-gray-300 px-4 rounded-md mb-4"
              />
              <button
                onClick={emailLoginHandler}
                className="w-full h-12 bg-indigo-500 text-white rounded-md mb-2 hover:bg-indigo-600 transition"
              >
                Login with Email
              </button>
            <p className="mt-4 text-blue-500 cursor-pointer" onClick={() => setToggler(true)}>
              Don't have an account? Sign Up
            </p>
          </div>
        </div>

        <div className={`w-full max-w-md  p-8 bg-white rounded-lg border-2 shadow-lg ${toggler ? "block" : "hidden"}`}>
          <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
          <div className="flex flex-col items-center ">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full h-12 border border-gray-300 px-4 rounded-md mb-4"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(Number(e.target.value))}
              className="w-full h-12 border border-gray-300 px-4 rounded-md mb-4"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-12 border border-gray-300 px-4 rounded-md mb-4"
            />
            <button
              onClick={googleLoginHandler}
              className="w-full h-12 bg-white border mt-1 border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FcGoogle className="mr-2" /> Sign Up with Google
            </button>
            <span className="text-gray-400 font-medium text-lg my-2"> OR</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              id="sign-up"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 border border-gray-300 px-4 rounded-md mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              id="sign-up"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 border border-gray-300 px-4 rounded-md mb-4"
            />
            <button
              onClick={emailSignUpHandler}
              className="w-full h-12 bg-indigo-500 text-white rounded-md mb-2 hover:bg-indigo-600 transition"
            >
              Sign Up with Email
            </button>
            <p className="mt-4 text-blue-500 cursor-pointer" onClick={() => setToggler(false)}>
              Already have an account? Login
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
