import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavouriteStore } from "../authContext/useFavouriteStore";
import { AuthStore } from "../authContext/AuthStore";
import { Star, Trash2, Sparkles, Film, Heart } from "lucide-react";

const Favourite = () => {
  const navigate = useNavigate();
  const user = AuthStore(s => s.user);
  const [removingId, setRemovingId] = useState(null);

  const {
    favourites,
    fetchFavourite,
    removeFromFavourite,
    loading,
  } = useFavouriteStore();

  useEffect(() => {
    if (user) {
      fetchFavourite();
    }
  }, [user]);

  const handleRemove = async (movieId) => {
    setRemovingId(movieId);
    await removeFromFavourite(movieId);
    setRemovingId(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
        <div className="relative text-center px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-yellow-500/20 to-orange-500/20 mb-6 backdrop-blur-sm border border-yellow-500/20">
            <Heart className="w-12 h-12 text-yellow-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Sign In Required
          </h2>
          <p className="text-gray-400 text-lg">
            Please log in to view your favourite movies
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-black to-gray-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-800 border-t-yellow-400 rounded-full animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 w-8 h-8 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(234,179,8,0.03),transparent_50%)]" />
      
      <div className="relative px-4 sm:px-6 lg:px-12 py-24 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Star className="text-yellow-400 w-10 h-10" fill="currentColor" />
              <div className="absolute inset-0 blur-xl bg-yellow-400/30" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r text-white bg-clip-text ">
              Your Favourites
            </h1>
          </div>
          <p className="text-gray-400 text-lg ml-1">
            {favourites.length} {favourites.length === 1 ? 'movie' : 'movies'} Favourites
          </p>
        </div>

        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 px-4">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700">
                <Film className="w-16 h-16 text-gray-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-linear-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30 backdrop-blur-sm">
                <Heart className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              No Favourites Yet
            </h3>
            <p className="text-gray-400 text-center max-w-md">
              Start building your collection by adding movies you love. Your favourite films will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {favourites.map((movie, index) => (
                            <div
                                key={movie._id}
                                className="bg-gray-800 w-full h-auto flex flex-col p-3 gap-2 rounded-2xl hover:scale-105 transition-all duration-300"
                                style={{
                                    animation: `fadeIn 0.5s ease-out ${index * 0.05}s both`
                                }}
                            >
                                <img
                                    onClick={() => navigate(`/movie/${movie.movieId}`)}
                                    className="rounded-lg h-52 w-full object-cover cursor-pointer"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                                    alt={movie.title}
                                />

                                <div className="flex flex-col grow">
                                    <p className="text-white font-sans font-semibold truncate">
                                        {movie.title}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleRemove(movie.movieId)}
                                    disabled={removingId === movie.movieId}
                                    className="mt-auto flex items-center justify-center px-4 py-2 rounded-full 
                    font-semibold text-xs transition-all duration-300 cursor-pointer 
                    bg-red-500 hover:bg-red-600 text-white shadow-lg active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {removingId === movie.movieId ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            <span>Removing...</span>
                                        </div>
                                    ) : (
                                        "Remove"
                                    )}
                                </button>
                            </div>
                        ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Favourite;