import React, { useState } from "react";

const Navbar = () => {

    const [selected, setSelected] = useState("")
    const items = ["Home", "Search", "Favourites", "Watchlist"];

    return (
       

            <nav className="min-w-full fixed top-0 left-0 z-50 flex items-center justify-between px-16 py-4">

                {/* Logo */}
                <h1 className="font-bold text-3xl text-white drop-shadow-[0_0_4px_rgba(255,100,0,0.8)]">
                    <span className="text-orange-500">Q</span>uickShow
                </h1>

                {/* Middle Menu */}
                <ul className="flex gap-10 bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full text-white font-semibold border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    {items.map((list, idx) => (
                        <li key={idx} onClick={()=>setSelected(idx)} className={`cursor-pointer hover:text-orange-400 ${selected === idx ? "text-orange-500" : "text-white"} transition`}>{list}</li>
                    ))}
                </ul>

                {/* Buttons */}
                <div className="flex items-center gap-3">
                    <button className="px-6 py-2 rounded-full bg-orange-500/90 text-white font-bold hover:bg-transparent hover:border-orange-500 hover:border-2 hover:text-orange-500 cursor-pointer transition-all duration-300">
                        SignUp
                    </button>

                    <button className="px-6 py-2 rounded-full bg-orange-500/90 text-white font-bold hover:bg-transparent hover:border-orange-500 hover:border-2 hover:text-orange-500 transition-all duration-300 cursor-pointer">
                        Login
                    </button>
                </div>

            </nav>
    );
};

export default Navbar;
