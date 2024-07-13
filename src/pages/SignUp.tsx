import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
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
const phoneSchema = z.number().min(11, "Phone number must contain 11 or less digits");
const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format");

const SignUp = ({ setLoadingBar }: LoadingBarProps) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState<number>(0);
    const [date, setDate] = useState("");

    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [dateError, setDateError] = useState<string | null>(null);
    const [genderError, setGenderError] = useState<string | null>(null);

    const [login] = useLoginMutation();

    const googleLoginHandler = async () => {
        let hasError = false;
        try {
            phoneSchema.parse(phone);
            setPhoneError(null);
        } catch (e: any) {
            setPhoneError(e.errors[0].message);
            hasError = true;
        }

        try {
            dateSchema.parse(date);
            setDateError(null);
        } catch (e: any) {
            setDateError(e.errors[0].message);
            hasError = true;
        }

        if (!gender) {
            setGenderError("Please select a gender.");
            hasError = true;
        } else {
            setGenderError(null);
        }


        if (hasError) return;
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

        try {
            phoneSchema.parse(phone);
            setPhoneError(null);
        } catch (e: any) {
            setPhoneError(e.errors[0].message);
            hasError = true;
        }

        try {
            dateSchema.parse(date);
            setDateError(null);
        } catch (e: any) {
            setDateError(e.errors[0].message);
            hasError = true;
        }

        if (!gender) {
            setGenderError("Please select a gender.");
            hasError = true;
        } else {
            setGenderError(null);
        }

        if (hasError) return;

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
            const typedError = error as Error;
            toast.error(`Sign Up Failed: ${typedError.message}`);
        }
    };

    return (
        < >
        <div className="h-[700px] flex flex-col justify-center items-center px-3">
            <div className='w-full max-w-md sm:p-8 p-3 bg-white rounded-lg border-2 shadow-lg '>
                <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
                <div className="flex flex-col items-center ">
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full h-12 border border-gray-300 px-4 rounded-md mb-1"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {genderError && <p className="text-red-500 text-md">{genderError}</p>}
                    <input
                        type="number"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(Number(e.target.value))}
                        className="w-full h-12 border border-gray-300 px-4 rounded-md mb-1"
                    />
                    {phoneError && <p className="text-red-500 text-md">{phoneError}</p>}
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-12 border border-gray-300 px-4 rounded-md mb-1"
                    />
                    {dateError && <p className="text-red-500 text-md">{dateError}</p>}
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
                        id="sign-up-email"
                        onChange={(e) => setEmail(e.target.value)}
                        name="sign-up-email"
                        className="w-full h-12 border border-gray-300 px-4 rounded-md mb-1"
                    />
                    {emailError && <p className="text-red-500 text-md">{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        id="sign-up-password"
                        onChange={(e) => setPassword(e.target.value)}
                        name="sign-up-password"
                        className="w-full h-12 border border-gray-300 px-4 rounded-md mb-1"
                    />
                    {passwordError && <p className="text-red-500 text-md">{passwordError}</p>}
                    <button
                        onClick={emailSignUpHandler}
                        className="w-full h-12 bg-indigo-500 text-white rounded-md mb-2 hover:bg-indigo-600 transition"
                    >
                        Sign Up with Email
                    </button>
                    <Link to={'/login'} className="mt-4 text-blue-500 cursor-pointer">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
            <Footer />
            </>
    )
}

export default SignUp
