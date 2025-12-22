import React, { useState } from "react";
import { SearchIcon, Funnel, Star } from "lucide-react";
import axios from "axios";

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
        <div className="min-h-screen w-full bg-black text-white ">
            {/* HERO */}
            <section className="  min-h-screen pb-16 bg-blue-600/10 flex flex-col justify-center items-center gap-6">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold">Search Movies</h1>
                    <p className="text-white/60 mt-2">
                        Discover your favorite movies from thousands of titles.
                    </p>
                </div>

                {/* SEARCH */}
                <form
                    onSubmit={handleSearch}
                    className="w-full flex justify-center px-4"
                >
                    <div className="relative w-full max-w-xl">
                        <input
                            value={movieName}
                            onChange={(e) => setMovieName(e.target.value)}
                            placeholder="Movie name"
                            className="w-full px-6 py-4 pr-14 rounded-full bg-white/10 
              outline-none text-white placeholder-gray-400
              focus:ring-2 focus:ring-pink-500"
                        />

                        <Funnel
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="absolute right-5 top-1/2 -translate-y-1/2 
              text-white opacity-70 cursor-pointer hover:opacity-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="ml-4 bg-pink-600 rounded-full p-4 
            hover:scale-105 transition-transform"
                    >
                        <SearchIcon />
                    </button>
                </form>

                {/* FILTER */}
                {filterOpen && (
                    <div className="mt-6 bg-white/5 backdrop-blur-md p-6 rounded-3xl">
                        <h2 className="mb-4 font-semibold">Filter by Genre</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            {filters.map((genre) => (
                                <button
                                    key={genre}
                                    onClick={() => setSelected(genre)}
                                    className={`px-6 py-3 rounded-full font-semibold transition
                  ${selected === genre
                                            ? "bg-pink-500"
                                            : "bg-gray-800 hover:bg-gray-700"
                                        }`}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {movies.length > 0 ? <h1 className="text-pink-500">Found {movies.length} Searches</h1>
                    : <h1>No Movies ? Search Something better</h1>}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-24">
                    {movies.slice(0, slice).map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-gray-800 rounded-2xl p-3 flex flex-col gap-3
              hover:scale-105 transition-transform cursor-pointer
              hover:shadow-xl hover:shadow-pink-500/20 relative"
                        >
                            <img
                                className="rounded-lg h-56 w-full object-cover"
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : "https://via.placeholder.com/300x450?text=No+Poster"
                                }
                                alt={movie.title}
                            />

                            <Star
                                onClick={() => toggleFav(movie.id)}
                                className="absolute top-4 right-4 cursor-pointer"
                                fill={favMovies.includes(movie.id) ? "yellow" : "transparent"}
                            />

                            <h3 className="font-bold truncate">{movie.title}</h3>

                            <p className="text-sm text-gray-400">
                                {movie.release_date?.slice(0, 4)} • ⭐{" "}
                                {movie.vote_average?.toFixed(1)}
                            </p>

                            <button
                                className="mt-auto bg-pink-500 hover:bg-pink-600 transition
                text-white rounded-full font-semibold px-4 py-2 text-sm"
                            >
                                + Watchlist
                            </button>

                        </div>


                    ))}
                </div>

                {movies.length > 0 && <button onClick={() => setSlice(slice + 10)} className="px-6 py-4 bg-pink-500 rounded-full cursor-pointer hover:bg-pink-600 "><h1>Load More</h1></button>}


            </section>


        </div>
    );
};

export default SearchMovie;
