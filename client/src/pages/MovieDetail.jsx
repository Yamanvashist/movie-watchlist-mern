import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useWatchlistStore } from "../authContext/useWatchlistStore";
import { useFavouriteStore } from "../authContext/useFavouriteStore";
import { Star } from "lucide-react";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const {
    watchList,
    addToWatchlist,
    removeFromWatchlist,
    fetchWatchlist,
  } = useWatchlistStore();

  const {
    favourites,
    addToFavourite,
    removeFromFavourite,
    fetchFavourite,
  } = useFavouriteStore();

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(res.data);
    };

    fetchMovie();
    fetchWatchlist();
    fetchFavourite();
  }, [id]);

  if (!movie) return null;

  const inWatchlist = watchList.some(
    m => m.movieId === String(movie.id)
  );

  const inFavourite = favourites.some(
    m => m.movieId === String(movie.id)
  );

  const handleWatchlist = async () => {
    if (inWatchlist) {
      await removeFromWatchlist(movie.id);
    } else {
      await addToWatchlist(
        movie.id,
        movie.title,
        movie.poster_path
      );
    }
  };

  const handleFavourite = async () => {
    if (inFavourite) {
      await removeFromFavourite(movie.id);
    } else {
      await addToFavourite(
        movie.id,
        movie.title,
        movie.poster_path
      );
    }
  };

  const fetchTrailer = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        params: { api_key: API_KEY }
      }
    );

    const trailer = res.data.results.find(
      v => v.type === "Trailer" && v.site === "YouTube"
    );

    if (trailer) {
      window.open(
        `https://www.youtube.com/watch?v=${trailer.key}`,
        "_blank"
      );
    } else {
      alert("No trailer found ");
    }
  };


  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(to bottom,
          rgba(0,0,0,0.85),
          rgba(0,0,0,0.95)),
          url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12 text-white">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-[320px] rounded-2xl shadow-2xl"
        />

        <div className="flex-1 relative">
          {/* FAV STAR */}
          <Star
            onClick={handleFavourite}
            className="absolute top-0 right-0 cursor-pointer"
            size={28}
            fill={inFavourite ? "yellow" : "transparent"}
          />

          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="italic text-gray-300 mb-4">{movie.tagline}</p>

          <div className="flex gap-6 text-sm font-semibold mb-6">
            <span>⭐ {movie.vote_average}</span>
            <span>⏱ {movie.runtime} min</span>
            <span>📅 {movie.release_date}</span>
          </div>

          <h3 className="text-xl font-semibold mb-2">Overview</h3>
          <p className="leading-relaxed text-gray-200 max-w-2xl">
            {movie.overview}
          </p>

          <div className="mt-8 flex gap-4">
            <button onClick={fetchTrailer} className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold">
              Watch Trailer
            </button>

            <button
              onClick={handleWatchlist}
              className={`px-6 py-3 rounded-xl font-semibold transition cursor-pointer
                ${inWatchlist
                  ? "bg-green-500/20 text-green-400 border border-green-500/40"
                  : "bg-white/10 hover:bg-white/20"
                }`}
            >
              {inWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
