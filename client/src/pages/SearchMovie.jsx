import React, { useEffect, useState } from "react";
import { SearchIcon, Funnel, Star } from "lucide-react";
import axios from "axios";
import searchBg from "../assets/searchBg.jpg";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import { useNavigate } from "react-router-dom";

import { useWatchlistStore } from "../authContext/useWatchlistStore";
import { useFavouriteStore } from "../authContext/useFavouriteStore";
import { AuthStore } from "../authContext/AuthStore";

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
  const [slice, setSlice] = useState(10);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const navigate = useNavigate();

  const user = AuthStore((s) => s.user);

  //  Watchlist store
  const {
    watchList,
    fetchWatchlist,
    addToWatchlist,
    removeFromWatchlist,
  } = useWatchlistStore();

  //  Favourite store
  const {
    favourites,
    fetchFavourite,
    addToFavourite,
    removeFromFavourite,
  } = useFavouriteStore();

  // fetch watchlist & favourites 
  useEffect(() => {
    if (user) {
      fetchWatchlist();
      fetchFavourite();
    }
  }, [user]);

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

    setMovies(res.data.results || []);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <section
        className="relative min-h-screen pb-16 flex flex-col items-center gap-6 overflow-hidden bg-cover bg-no-repeat p-6"
        style={{ backgroundImage: `url(${searchBg})` }}
      >
        <Snowfall className="pointer-events-none" />
        <div className="absolute inset-0 bg-black/80 z-10"></div>

        <div className="relative z-20 w-full flex flex-col items-center gap-6">

          {/* TITLE */}
          <div className="text-center mt-16">
            <h1 className="text-4xl font-semibold">Search Movies</h1>
            <p className="text-white/60 mt-2">
              Discover your favorite movies
            </p>
          </div>

          {/* SEARCH */}
          <form onSubmit={handleSearch} className="w-full flex justify-center">
            <div className="relative w-full max-w-xl">
              <input
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                placeholder="Movie name"
                className="w-full px-6 py-4 pr-28 rounded-full bg-white/10 outline-none"
              />

              <Funnel
                onClick={() => setFilterOpen(!filterOpen)}
                className="absolute right-16 top-1/2 -translate-y-1/2 cursor-pointer"
              />

              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-600 rounded-full p-3"
              >
                <SearchIcon />
              </button>
            </div>
          </form>

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

          {/* MOVIES GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl">
            {movies.slice(0, slice).map((movie) => {
              const inWatchlist = watchList.some(
                (m) => m.movieId === String(movie.id)
              );

              const inFavourite = favourites.some(
                (m) => m.movieId === String(movie.id)
              );

              return (
                <motion.div
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800 rounded-2xl p-3 flex flex-col gap-3 relative cursor-pointer"
                >
                  <img
                    className="rounded-lg h-56 w-full object-cover"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450"
                    }
                    alt={movie.title}
                  />

                  {/*Favourite */}
                  <Star
                    onClick={(e) => {
                      e.stopPropagation();
                      if (inFavourite) {
                        removeFromFavourite(movie.id);
                      } else {
                        addToFavourite(
                          movie.id,
                          movie.title,
                          movie.poster_path
                        );
                      }
                    }}
                    className="absolute top-4 right-4 cursor-pointer"
                    fill={inFavourite ? "yellow" : "transparent"}
                  />

                  <h3 className="font-bold truncate">{movie.title}</h3>
                  <p className="text-sm text-gray-400">
                    {movie.release_date?.slice(0, 4)} • ⭐{" "}
                    {movie.vote_average?.toFixed(1)}
                  </p>

                  {/* Watchlist */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (inWatchlist) {
                        removeFromWatchlist(movie.id);
                      } else {
                        addToWatchlist(
                          movie.id,
                          movie.title,
                          movie.poster_path
                        );
                      }
                    }}
                    className={`mt-auto rounded-full py-2 text-sm font-semibold
                    ${
                      inWatchlist
                        ? "bg-green-500/20 text-green-400"
                        : "bg-pink-500 text-white"
                    }`}
                  >
                    {inWatchlist ? "✓ In Watchlist" : "+ Watchlist"}
                  </button>
                </motion.div>
              );
            })}
          </div>

         
          {movies.length > slice && (
            <button
              onClick={() => setSlice(slice + 10)}
              className="px-6 py-3 bg-pink-500 rounded-full font-semibold"
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
