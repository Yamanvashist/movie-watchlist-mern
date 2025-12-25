import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const scrollRef = useRef(null);
  const [fav, setFav] = useState({}); // track favorites per movie

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          { params: { api_key: apiKey } }
        );
        setMovies(res.data.results || []);
      } catch (err) {
        console.log("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // px per click
      if (direction === "left") scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      else scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth pb-4"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 relative min-w-50 w-52 h-80 flex flex-col p-3 gap-2 rounded-2xl hover:scale-105 transition-all cursor-pointer"
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

            <Star
              onClick={() => setFav({ ...fav, [movie.id]: !fav[movie.id] })}
              className="absolute top-3 right-3 text-white"
              fill={fav[movie.id] ? "yellow" : "transparent"}
            />

           
            <p className="text-gray-400 text-sm">
              {movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average?.toFixed(1)}
            </p>

            <button className="bg-pink-500 hover:bg-pink-600 transition text-white rounded-full font-semibold px-4 py-2 text-sm mt-auto">
              + Watchlist
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button><button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default TrendingMovies;
