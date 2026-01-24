import React, { useState } from "react";
import { SearchIcon, Funnel, Star } from "lucide-react";
import axios from "axios";
import searchBg from "../assets/searchBg.jpg"
import { motion } from "framer-motion";
import Snowfall from "react-snowfall"
import { useNavigate } from "react-router-dom";

const filters = [
    "All",
    "Action",
    "Adventure",
    "Sci-Fi",
    "Drama",
    "Thriller",
    "Crime",
    "Biography",
    "History",
];

const SearchMovie = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [selected, setSelected] = useState("All");
    const [page, setPage] = useState(1);
    const [movieName, setMovieName] = useState("");
    const [movies, setMovies] = useState([]);
    const [favMovies, setFavMovies] = useState([]);
    const [slice, setSlice] = useState(10)

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!movieName.trim()) return;

        const res = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            {
                params: {
                    api_key: API_KEY,
                    query: movieName,
                    page,
                },
            }
        );

        setMovies(res.data.results);
    };

    const toggleFav = (id) => {
        setFavMovies((prev) =>
            prev.includes(id)
                ? prev.filter((mid) => mid !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen w-full bg-black text-white">



            <section className="relative min-h-screen pb-8 md:pb-16  flex flex-col justify-center items-center gap-4 md:gap-6 overflow-hidden bg-cover bg-no-repeat p-4 md:p-6" style={{ backgroundImage: `url(${searchBg})` }}>
                <Snowfall
                    color="#82C3D9"
                    className=" pointer-events-none text-white "
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/60 to-black/90 z-10 pointer-events-none"></div>

                <div className="relative z-20 w-full flex flex-col justify-center items-center gap-4 md:gap-6">


                    <div className="text-center mt-12 md:mt-16 px-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                            Search Movies
                        </h1>
                        <p className="text-white/60 mt-2 text-sm md:text-base">
                            Discover your favorite movies from thousands of titles.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="w-full flex justify-center px-4 relative z-20"
                    >
                        <div className="relative w-full max-w-xl">
                            <input
                                value={movieName}
                                onChange={(e) => setMovieName(e.target.value)}
                                placeholder="Movie name"
                                className="w-full px-4 md:px-6 py-3 md:py-4 pr-24 md:pr-28 rounded-full bg-white/10 
                            outline-none text-white placeholder-gray-400 text-sm md:text-base
                            focus:ring-2 focus:ring-pink-500"
                            />

                            <Funnel
                                onClick={() => setFilterOpen(!filterOpen)}
                                className="absolute right-12 md:right-16 top-1/2 -translate-y-1/2 
                            text-white opacity-70 cursor-pointer hover:opacity-100 w-5 h-5 md:w-6 md:h-6"
                            />
                            <button
                                type="submit"
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-pink-600 rounded-full 
                            p-2 md:p-3 hover:scale-105 transition-transform cursor-pointer"
                            >
                                <SearchIcon className="w-4 h-4 md:w-6 md:h-6" />
                            </button>
                        </div>
                    </form>

                    {/* FILTER */}
                    {filterOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, }}
                            className="mt-4 md:mt-6 bg-white/5 backdrop-blur-md p-4 md:p-6 rounded-2xl md:rounded-3xl w-full max-w-4xl mx-4">
                            <h2 className="mb-3 md:mb-4 font-semibold text-base md:text-lg">
                                Filter by Genre
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                                {filters.map((genre) => (
                                    <button
                                        key={genre}
                                        onClick={() => setSelected(genre)}
                                        className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition text-sm md:text-base
                                    ${selected === genre
                                                ? "bg-pink-500"
                                                : "bg-gray-800 hover:bg-gray-700"
                                            }`}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    <div className="text-center px-4">
                        {movies.length > 0 ? (
                            <h1 className="text-pink-500 text-lg md:text-xl">
                                Found {movies.length} Movies
                            </h1>
                        ) : (
                            <h1 className="text-sm md:text-base">
                                No Movies? Search Something Better
                            </h1>
                        )}
                    </div>

                    <div className="w-full px-4 md:px-6 lg:px-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 max-w-7xl mx-auto">
                            {movies.slice(0, slice).map((movie) => (
                                <motion.div
                                onClick={()=>navigate(`/movie/${movie.id}`)}
                                    key={movie.id}
                                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        scale: 1.06,
                                        boxShadow: "0px 20px 40px rgba(236, 72, 153, 0.25)",
                                    }}
                                    className="bg-gray-800 rounded-xl md:rounded-2xl p-2 md:p-3 flex flex-col gap-2 md:gap-3
             cursor-pointer relative overflow-hidden"
                                >
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.2 }}
                                        className="rounded-lg h-40 sm:h-48 md:h-56 lg:h-64 w-full object-cover"
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                : "https://payload.cargocollective.com/1/23/758880/13104445/NO-MOVIE-POSTERS-02-03-003_2000_c.jpg"
                                        }
                                        alt={movie.title}
                                    />

                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        whileTap={{ scale: 0.85 }}
                                        className="absolute top-3 md:top-4 right-3 md:right-4"
                                    >
                                        <Star
                                            onClick={() => toggleFav(movie.id)}
                                            className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
                                            fill={favMovies.includes(movie.id) ? "yellow" : "transparent"}
                                        />
                                    </motion.div>

                                    <h3 className="font-bold truncate text-sm md:text-base">
                                        {movie.title}
                                    </h3>

                                    <p className="text-xs md:text-sm text-gray-400">
                                        {movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average?.toFixed(1)}
                                    </p>

                                  
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.92 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="mt-auto bg-pink-500 hover:bg-pink-600
               text-white rounded-full font-semibold
               px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm"
                                    >
                                        + Watchlist
                                    </motion.button>
                                </motion.div>

                            ))}
                        </div>
                    </div>

                    {/* LOAD MORE BUTTON */}
                    {movies.length > 0 && movies.length > slice && (
                        <button
                            onClick={() => setSlice(slice + 10)}
                            className="px-4 md:px-6 py-3 md:py-4 bg-pink-500 rounded-full cursor-pointer 
                        hover:bg-pink-600 transition text-sm md:text-base font-semibold mt-4"
                        >
                            Load More
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SearchMovie;