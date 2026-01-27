import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clapperboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { AuthStore } from "../authContext/AuthStore";

const Navbar = () => {
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    const items = ["Home", "Search", "Favourites", "Watchlist"];
    const user = AuthStore((s) => s.user);
    const logout = AuthStore((s) => s.logout);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
    };

    const handleNavigation = (list, idx) => {
        setSelected(idx);
        setOpen(false);
        navigate(list === "Home" ? "/" : `/${list.toLowerCase()}`);
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 py-3 md:py-4"
        >
            {/* Logo */}
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl flex items-center text-white drop-shadow-[0_0_4px_rgba(255,100,0,0.8)]">
                <span className="text-pink-500">Cine</span>Stack
                <Clapperboard className="text-pink-500 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ml-1 sm:ml-2" />
            </h1>

            {/* Mobile Menu Toggle */}
            <button
                className="lg:hidden text-white text-2xl sm:text-3xl cursor-pointer z-50"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
            >
                {open ? <X /> : <Menu />}
            </button>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex gap-6 xl:gap-10 bg-white/5 backdrop-blur-xl px-6 xl:px-10 py-3 rounded-full text-white font-semibold border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {items.map((list, idx) => (
                    <li
                        key={idx}
                        onClick={() => handleNavigation(list, idx)}
                        className={`cursor-pointer hover:text-pink-400 ${
                            selected === idx ? "text-pink-600" : "text-white"
                        } transition whitespace-nowrap`}
                    >
                        {list}
                    </li>
                ))}
            </ul>

            {/* Desktop Auth Buttons */}
            {user ? (
                <div className="hidden lg:flex items-center gap-3 xl:gap-4">
                    <div className="flex items-center gap-2 px-4 xl:px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg shadow-black/20">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-medium text-sm xl:text-base">
                            {user.name}
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-6 xl:px-8 py-2.5 xl:py-3 rounded-full font-semibold bg-white text-black shadow-md shadow-white/40 hover:bg-white/80 transition-all duration-300 cursor-pointer text-sm xl:text-base"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className="hidden lg:flex items-center gap-3">
                    <button
                        onClick={() => navigate("/signup")}
                        className="px-6 xl:px-8 py-2.5 xl:py-3 rounded-full font-semibold bg-gradient-to-r from-red-600 via-pink-500 to-red-600 text-white shadow-md shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 cursor-pointer text-sm xl:text-base"
                    >
                        Sign Up
                    </button>

                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 xl:px-8 py-2.5 xl:py-3 rounded-full font-semibold border-2 border-pink-600 text-pink-600 hover:bg-gradient-to-r hover:from-red-600 hover:via-pink-500 hover:to-red-600 hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer text-sm xl:text-base"
                    >
                        Login
                    </button>
                </div>
            )}

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl py-6 flex flex-col items-center gap-4 text-white border-t border-white/20 shadow-2xl"
                    >
                        {/* Mobile Menu Items */}
                        {items.map((list, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => handleNavigation(list, idx)}
                                className={`cursor-pointer hover:text-pink-500 text-base sm:text-lg font-medium ${
                                    selected === idx ? "text-pink-600" : "text-white"
                                } transition-colors`}
                            >
                                {list}
                            </motion.div>
                        ))}

                        {/* Mobile Auth Buttons */}
                        {user ? (
                            <div className="flex flex-col items-center gap-4 mt-4 w-full px-6">
                                <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-white font-medium">
                                        {user.name}
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full max-w-xs py-3 rounded-full font-semibold bg-white text-black hover:bg-white/80 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full px-6">
                                <button
                                    onClick={() => {
                                        navigate("/signup");
                                        setOpen(false);
                                    }}
                                    className="w-full sm:w-40 py-3 rounded-full bg-gradient-to-r from-red-600 via-pink-500 to-red-600 text-white font-bold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                                >
                                    Sign Up
                                </button>

                                <button
                                    onClick={() => {
                                        navigate("/login");
                                        setOpen(false);
                                    }}
                                    className="w-full sm:w-40 py-3 rounded-full border-2 border-pink-600 text-pink-600 font-bold hover:bg-gradient-to-r hover:from-red-600 hover:via-pink-500 hover:to-red-600 hover:text-white hover:border-transparent transition-all duration-300"
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;