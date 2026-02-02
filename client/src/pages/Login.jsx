import React, { useState } from "react";
import loginbg from "../assets/signUpbg.jpg";
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { AuthStore } from "../authContext/AuthStore";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")


    const navigate = useNavigate()
    const login = AuthStore((s) => s.login)
    const error = AuthStore((s) => s.error)
    const loading = AuthStore((s) => s.loading)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setMessage("Fill the fields");
            return;
        }

        try {
            const res = await login({ email, password });

            if (!res?.success) {
                setMessage(res?.message || "SignUp failed");
                return;
            }

            navigate("/");
        } catch (err) {
            console.log("Signup error", err);
            setMessage("Server error");
        }
    };


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

                    {message && (
                        <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3">
                            <p className="text-red-400 text-sm font-medium">
                                {message}
                            </p>
                        </div>
                    )}

                    <button
                        onClick={!loading ? handleSubmit : undefined}
                        disabled={loading}
                        className={`mt-2 bg-pink-500 hover:bg-pink-600 transition text-white font-semibold py-3 rounded-xl 
  ${loading ? "cursor-not-allowed animate-pulse" : "cursor-pointer"}`}
                    >
                        {loading ? <LoaderCircle className="mx-auto animate-spin" /> : "Login"}
                    </button>




                    <p className="text-gray-400 text-sm">
                        Don't have any account?{" "}
                        <span onClick={() => navigate("/signup")} className="text-pink-400 cursor-pointer hover:underline">
                            SignUp
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
