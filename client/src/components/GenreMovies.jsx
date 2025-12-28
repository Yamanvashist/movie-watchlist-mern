import { useState, useEffect } from "react"
import axios from "axios"
import GenreMoviesBg from "../assets/GenreMovies.jpg";
import { useNavigate } from "react-router-dom";


const Genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
]

const GenreMovies = () => {
  const [movies, setMovies] = useState([])
  const [selected, setSelected] = useState(Genres[0])

  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  const navigate = useNavigate()

  useEffect(() => {
    const fetchByGenre = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: apiKey,
              with_genres: selected.id,
              sort_by: "popularity.desc",
            },
          }
        )
        setMovies(res.data.results || [])
      } catch (err) {
        console.log("Error fetching genre movies", err)
      }
    }

    fetchByGenre()
  }, [selected])

  return (
    <section className="bg-zinc-950 min-h-screen py-12 relative  bg-cover bg-no-repeat" style={{ backgroundImage: `url(${GenreMoviesBg})` }}>

      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-zinc-950" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title */}
        <h1 className="text-white text-3xl font-bold mb-6">
          Browse by Genre
        </h1>

        {/* Genre Chips */}
        <div className="flex flex-wrap gap-3 mb-10 ">
          {Genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelected(genre)}
              className={`px-5 py-2 text-sm cursor-pointer rounded-full font-medium transition-all
            ${selected.id === genre.id
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/40"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                }`}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Movies Grid */}
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.slice(0, 10).map((movie) => (
            <div onClick={() => navigate(`/movie/${movie.id}`)}
              key={movie.id}
              className="group cursor-pointer"
            >
              {/* Poster */}
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Poster"
                  }
                  alt={movie.title}
                  className="h-85 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />
              </div>

              {/* Info */}
              <div className="mt-3 space-y-1">
                <h2 className="text-white text-sm font-semibold truncate">
                  {movie.title}
                </h2>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-yellow-400">★</span>
                  {movie.vote_average?.toFixed(1)}
                  <span>•</span>
                  {movie.release_date?.slice(0, 4)}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

  )
}

export default GenreMovies
