import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, Star } from "lucide-react";

const TrendingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [slice, setSlice] = useState(10)
    const [fav, setFav] = useState(false)

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;


    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    "https://api.themoviedb.org/3/trending/movie/day",
                    {
                        params: {
                            api_key: apiKey,
                            page: page,
                        },
                    }
                );

                if (res.data.results) {
                    setMovies((prev) => {
                        const existingId = new Set(prev.map((m) => m.id));
                        const uniqueNewMovies = res.data.results.filter(
                            (m) => !existingId.has(m.id)
                        );
                        return ([...prev, ...uniqueNewMovies]);
                    });
                }
            } catch (err) {
                console.log("Error fetching movies:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [page]);

    const handleClick = () => {
        setPage((prev) => prev + 1)
        setSlice((prev) => prev + 10)
    }

    return (
        <>
            {movies.slice(0, slice).map((movie) => (
                <div
                    key={movie.id}
                    className="bg-gray-800 relative w-66 h-88 flex flex-col p-3 gap-2 rounded-2xl 
                   hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                    <img
                        className="rounded-lg h-52 w-full object-cover"
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/300x450?text=No+Poster"
                        }
                        alt={movie.title}
                    />

                    <Star onClick={() => setFav(!fav)} className="absolute top-5 right-5 text-white " fill={`${fav ? "yellow" : "transparent"}`} />

                    <h1 className="text-white font-bold truncate">{movie.title}</h1>

                    <p className="text-gray-400 text-sm">
                        {movie.release_date?.slice(0, 4)} • ⭐{" "}
                        {movie.vote_average?.toFixed(1)}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                        <button className="bg-pink-500 hover:bg-pink-600 transition 
                               text-white rounded-full font-semibold px-4 py-2 text-sm">
                            + Watchlist
                        </button>
                    </div>
                </div>
            ))}

            <button
                disabled={loading}
                onClick={handleClick}
                className="mt-10 flex items-center gap-2 text-pink-400 
                   hover:text-pink-500 transition disabled:opacity-50"
            >
                {loading ? "Loading..." : "Explore More"}
                <ArrowRight />
            </button>
        </>
    );
};

export default TrendingMovies;
