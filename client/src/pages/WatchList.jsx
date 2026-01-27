import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlistStore } from "../authContext/useWatchlistStore";
import { AuthStore } from "../authContext/AuthStore";
import { Bookmark, Sparkles, Film, Clock } from "lucide-react";

export const WatchList = () => {
    const navigate = useNavigate();
    const user = AuthStore(s => s.user);
    const [removingId, setRemovingId] = useState(null);

    const {
        watchList,
        fetchWatchlist,
        removeFromWatchlist,
        loading,
    } = useWatchlistStore();

    useEffect(() => {
        if (user) {
            fetchWatchlist();
        }
    }, [user]);

    const handleRemove = async (movieId) => {
        setRemovingId(movieId);
        await removeFromWatchlist(movieId);
        setRemovingId(null);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(0,0,0,0))]" />
                <div className="relative text-center px-4">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 mb-6 backdrop-blur-sm border border-blue-500/20">
                        <Clock className="w-12 h-12 text-blue-400" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
                        Sign In Required
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Please log in to view your watchlist
                    </p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-black to-gray-900">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-gray-800 border-t-blue-400 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 w-8 h-8 animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-900 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.03),transparent_50%)]" />

            <div className="relative px-4 sm:px-6 lg:px-12 py-24 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="relative">
                            <Bookmark className="text-blue-400 w-10 h-10" fill="currentColor" />
                            <div className="absolute inset-0 blur-xl bg-blue-400/30" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                            Your Watchlist
                        </h1>
                    </div>
                    <p className="text-gray-400 text-lg ml-1">
                        {watchList.length} {watchList.length === 1 ? 'movie' : 'movies'} to watch
                    </p>
                </div>

                {watchList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 px-4">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-gray-700">
                                <Film className="w-16 h-16 text-gray-600" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30 backdrop-blur-sm">
                                <Clock className="w-6 h-6 text-blue-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-3">
                            No Movies in Watchlist
                        </h3>
                        <p className="text-gray-400 text-center max-w-md">
                            Discover movies you want to watch and add them to your watchlist. Your saved films will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                        {watchList.map((movie, index) => (
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

