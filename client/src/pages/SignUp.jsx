import React, { useState } from "react";
import signUpbg from "../assets/signUpbg.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthStore } from "../authContext/AuthStore";

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const register = AuthStore((s) => s.register)
    const error = AuthStore((s) => s.error)


    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
        setMessage("fill the fields ");
        return;
    }

    try {
        const res = await register({name, email, password });

        if (!res?.success) {
            setMessage(res?.message || "Signup failed ");
            return;
        }

        navigate("/");
    } catch (err) {
        console.log("SignUp error", err);
        setMessage("Server error");
    }
};

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="flex w-225 max-w-[95%] rounded-3xl overflow-hidden shadow-2xl shadow-black">


                <div className="hidden md:block w-1/2 relative">
                    <div className="inset-0 bg-black/10 absolute"></div>
                    <img
                        src={signUpbg}
                        alt="signup visual"
                        className="w-full h-full object-cover"
                    />
                </div>


                <div className="w-full md:w-1/2 bg-gray-800 p-10 flex flex-col justify-center gap-6">
                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>


                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Username"
                        className="px-4 py-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-pink-500"
                    />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="px-4 py-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-pink-500"
                    />



                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="px-4 py-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    {message && (
                        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3">
                            <p className="text-red-400 text-sm font-medium">
                                {message}
                            </p>
                        </div>
                    )}


                    <button onClick={handleSubmit} className="mt-2 bg-pink-500 hover:bg-pink-600 transition text-white font-semibold py-3 rounded-xl cursor-pointer">
                        Sign Up
                    </button>

                    <p className="text-gray-400 text-sm">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} className="text-pink-400 cursor-pointer hover:underline">
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
