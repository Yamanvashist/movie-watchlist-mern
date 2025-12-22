import React, { useState } from "react";
import loginbg from "../assets/signUpbg.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="flex w-225 max-w-[95%] rounded-3xl overflow-hidden shadow-2xl shadow-black">


                <div className="hidden md:block w-1/2 relative">
                    <div className="inset-0 bg-black/10 absolute"></div>
                    <img
                        src={loginbg}
                        alt="signup visual"
                        className="w-full h-full object-cover"
                    />
                </div>


                <div className="w-full md:w-1/2 bg-gray-800 p-10 flex flex-col justify-center gap-6">
                    <h1 className="text-3xl font-bold text-white">
                        Login
                    </h1>


                  
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

                    <button className="mt-2 bg-pink-500 hover:bg-pink-600 transition text-white font-semibold py-3 rounded-xl cursor-pointer">
                        Sign Up
                    </button>

                    <p className="text-gray-400 text-sm">
                        Don't have any account?{" "}
                        <span onClick={()=>navigate("/signup")} className="text-pink-400 cursor-pointer hover:underline">
                            SignUp
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
