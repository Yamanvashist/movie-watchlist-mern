import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        const fetchMovie = async () => {
            const res = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
            );
            setMovie(res.data);
        };
        fetchMovie();
    }, [id]);

    if (!movie)
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

                <div className="w-14 h-14 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mb-6"></div>

                
                <p className="text-lg tracking-wide text-gray-300">
                    Fetching movie magic 🍿
                </p>

            </div>

        );

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{
                backgroundImage: `linear-gradient(to bottom,
          rgba(0,0,0,0.85),
          rgba(0,0,0,0.95)),
          url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12 text-white">

                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-[320px] rounded-2xl shadow-2xl"
                />

                <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
                    <p className="italic text-gray-300 mb-4">{movie.tagline}</p>

                    <div className="flex gap-6 text-sm font-semibold mb-6">
                        <span>⭐ {movie.vote_average}</span>
                        <span>⏱ {movie.runtime} min</span>
                        <span>📅 {movie.release_date}</span>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                        {movie.genres.map((g) => (
                            <span
                                key={g.id}
                                className="px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-sm"
                            >
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-xl font-semibold mb-2">Overview</h3>
                    <p className="leading-relaxed text-gray-200 max-w-2xl">
                        {movie.overview}
                    </p>

                    <div className="mt-8 flex gap-4">
                        <button className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition font-semibold cursor-pointer">
                            Watch Trailer
                        </button>
                        <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold cursor-pointer">
                            + Watchlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
