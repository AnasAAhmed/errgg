import {
  GoogleAuthProvider,
  signInWithPopup,
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
import { z } from "zod";
import { Link } from "react-router-dom";

// Define Zod schemas
const emailSchema = z.string().email();
const passwordSchema = z.string().min(8, "Password must contain 8 or more characters");

const Login = ({ setLoadingBar }: LoadingBarProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [login] = useLoginMutation();

  const googleLoginHandler = async () => {
    try {
      setLoadingBar(20);
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);//getting user from firebase after login
      setLoadingBar(70);
      const res = await login({
        name: '',//in Login there no of this field thats why i added falsy value
        email: user.email!,
        photo: '',//in Login there no of this field thats why i added falsy value
        gender: '',//in Login there no of this field thats why i added falsy value
        phone: 0,//in Login there no of this field thats why i added falsy value
        role: "",//in Login there no of this field thats why i added falsy value
        dob: '',//in Login there no of this field thats why i added falsy value
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

  const emailLoginHandler = async () => {
    let hasError = false;

    // Validate inputs
    try {
      emailSchema.parse(email);
      setEmailError(null);
    } catch (e: any) {
      setEmailError(e.errors[0].message);
      hasError = true;
    }

    try {
      passwordSchema.parse(password);
      setPasswordError(null);
    } catch (e: any) {
      setPasswordError(e.errors[0].message);
      hasError = true;
    }

    if (hasError) return;

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
      const typedError = error as Error;
      toast.error(`Login Failed: ${typedError.message}`);
    }
  };

  return (
    <>
      <div className="h-[700px] flex flex-col justify-center items-center px-3">
        <div className='w-full max-w-md sm:p-8 p-3 bg-white rounded-lg border-2 shadow-lg'>
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
              id="login-email"
              onChange={(e) => setEmail(e.target.value)}
              name="login-email"
              className="w-full h-12 border border-gray-300 px-4 rounded-md mb-1"
            />
            {emailError && <p className="text-red-500 text-md">{emailError}</p>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              id="login-password"
              onChange={(e) => setPassword(e.target.value)}
              name="login-password"
              className="w-full h-12 border border-gray-300 px-4 rounded-md mb-1"
            />
            {passwordError && <p className="text-red-500 text-md">{passwordError}</p>}
            <button
              onClick={emailLoginHandler}
              className="w-full h-12 bg-indigo-500 text-white rounded-md mb-2 hover:bg-indigo-600 transition"
            >
              Login with Email
            </button>
            <Link to={'/sign-up'} className="mt-4 text-blue-500 cursor-pointer">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
