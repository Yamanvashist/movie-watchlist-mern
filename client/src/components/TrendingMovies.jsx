import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"
import { useWatchlistStore } from "../authContext/useWatchlistStore";
import { AuthStore } from "../authContext/AuthStore";
import { useFavouriteStore } from "../authContext/useFavouriteStore";


const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const scrollRef = useRef(null);
  const [fav, setFav] = useState({}); // track favorites per movie

  const navigate = useNavigate()

  const user = AuthStore(s => s.user);

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
  }, [user]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      if (direction === "left") scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      else scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const {
    watchList,
    fetchWatchlist,
    addToWatchlist,
    removeFromWatchlist
  } = useWatchlistStore();

  const {
    favourites,
    fetchFavourite,
    addToFavourite,
    removeFromFavourite,
    isInFavourite
  } = useFavouriteStore()


  useEffect(() => {
    if (user) {
      fetchWatchlist();
      fetchFavourite()
    }
  }, [user]);





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
        {movies.map((movie) => {

          const inWatchlist = watchList.some(
            m => m.movieId === String(movie.id)
          );

          const inFavourite = isInFavourite(movie.id);


          return (
            <div
              key={movie.id}
              className="bg-gray-800 relative min-w-50 w-52 h-80 flex flex-col p-3 gap-2 rounded-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <img onClick={() => navigate(`/movie/${movie.id}`)}
                className="rounded-lg h-52 w-full object-cover"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={movie.title}
              />

              <Star
                onClick={() => {
                  if (!user) return alert("User not logged in");

                  if (inFavourite) {
                    removeFromFavourite(movie.id);
                  } else {
                    addToFavourite(movie.id, movie.title, movie.poster_path);
                  }
                }}
                className={`absolute top-3 right-3 cursor-pointer transition
    ${inFavourite ? "text-yellow-400" : "text-white/60 hover:text-yellow-300"}
  `}
                fill={inFavourite ? "yellow" : "transparent"}
              />



              <p className="text-gray-400 text-sm">
                {movie.release_date?.slice(0, 4)} • ⭐ {movie.vote_average?.toFixed(1)}
              </p>

              <button
                onClick={() => {
                  if (inWatchlist) {
                    removeFromWatchlist(movie.id);
                  } else {
                    addToWatchlist(movie.id, movie.title, movie.poster_path);
                  }
                }}
                className={`mt-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full 
    font-semibold text-sm transition-all duration-300 cursor-pointer
    ${inWatchlist
                    ? "bg-green-500/20 text-green-400 border border-green-500/40"
                    : "bg-pink-500/10 text-pink-400 border border-pink-500/40"
                  }`}
              >
                {inWatchlist ? "✓ In Watchlist" : "+ Add to Watchlist"}
              </button>


            </div>
          )
        })}
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
