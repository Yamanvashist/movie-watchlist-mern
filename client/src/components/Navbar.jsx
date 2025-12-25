import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clapperboard } from 'lucide-react';


const Navbar = () => {
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    const items = ["Home", "Search", "Favourites", "Watchlist"];

    const navigate = useNavigate()

    return (
        <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 md:px-16 py-4">

            {/* Logo */}
            <h1 className="font-bold text-2xl md:text-3xl flex text-center items-center justify-center text-white drop-shadow-[0_0_4px_rgba(255,100,0,0.8)]">
                <span className="text-pink-500">Cine</span>Stack  <Clapperboard className="text-pink-500 h-8 w-8 ml-2"/>
            </h1>

            <div className="lg:hidden text-white text-3xl cursor-pointer" onClick={() => setOpen(!open)}>
                ☰
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex gap-10 bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full text-white font-semibold border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {items.map((list, idx) => (
                    <li
                        key={idx}
                        onClick={() => {
                            setSelected(idx)
                            navigate(list === "Home" ? "/" : `/${list.toLowerCase()}`)

                        }}
                        className={`cursor-pointer hover:text-pink-400 ${selected === idx ? "text-pink-600" : "text-white"
                            } transition`}
                    >
                        {list}
                    </li>
                ))}
            </ul>

            <div className="hidden lg:flex items-center gap-3">
                <button onClick={() => navigate("/signup")} className="px-8 py-3 rounded-full font-semibold 
               bg-linear-to-r from-red-600 via-pink-500 to-red-600 text-white shadow-md shadow-orange-500/30 
                hover:bg-orange-600 transition-all duration-300 cursor-pointer">
                    Sign Up
                </button>

                <button onClick={() => navigate("/login")} className="px-8 py-3 rounded-full font-semibold 
                border-2 border-pink-600 text-pink-600 
                hover:bg-linear-to-r from-red-600 via-pink-500 to-red-600 hover:text-white 
                transition-all duration-300 cursor-pointer">
                    Login
                </button>

            </div>

            {/* Mobile Dropdown */}
            {open && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-black/1 backdrop-blur-xl py-5 flex flex-col items-center gap-5 text-white border-t border-white/20">
                    {items.map((list, idx) => (
                        <div
                            key={idx}
                            onClick={() => {
                                setSelected(idx); setOpen(false)
                                navigate(list === "Home" ? "/" : `/${list.toLowerCase()}`)
                            }}
                            className={`cursor-pointer hover:text-pink-500 text-lg ${selected === idx ? "text-pink-600" : "text-white"
                                }`}
                        >
                            {list}
                        </div>
                    ))}

                    <button onClick={() => navigate("/signup")} className="w-40 py-2 rounded-full bg-pink-600 text-white font-bold hover:bg-transparent hover:border-orange-500 hover:border-2 hover:text-orange-500 cursor-pointer transition-all duration-300">
                        SignUp
                    </button>

                    <button onClick={() => navigate("/login")} className="w-40 py-2 rounded-full bg-pink-600 text-white font-bold hover:bg-transparent hover:border-orange-500 hover:border-2 hover:text-orange-500 cursor-pointer transition-all duration-300">
                        Login
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
