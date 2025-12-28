import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TopRated = () => {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [fav, setFav] = useState({})
    const scrollRef = useRef(null)

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const navigate = useNavigate()

    useEffect(() => {
        const apiFetch = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated`, {
                    params: {
                        api_key: apiKey
                    }
                })
                setMovies(res.data.results || [])
            } catch (err) {
                console.log("Error fetching Top rated Movies")
            } finally {
                setLoading(false)
            }
        }
        apiFetch()
    }, [])

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 300
            if (direction === "left") scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
            else scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
        }

    }

    return (
        <div className='relative'>
            <button onClick={() => scroll("left")} className='absolute top-1/2 left-0 -translate-y-1/2 p-2 z-10 rounded-full bg-black/50 hover:bg-black/70'>
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div ref={scrollRef} className='flex gap-4 overflow-x-hidden scroll-smooth pb-4'>
                {movies.map((movie, idx) => (
                    <div onClick={()=>navigate(`/movie/${movie.id}`)} key={movie.id} className='flex flex-col min-w-50 w-52 h-90 overflow-hidden hover:scale-105 cursor-pointer transition-all duration-300'>
                        <img className='object-cover rounded object-center' src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/300x450?text=No+Poster"
                        } />
                        <h1 className='text-white font-semibold font-sans truncate'>{movie.title}</h1>
                        <div className='flex justify-between'>
                            <p>⭐ {movie.vote_average?.toFixed(1)}</p>
                            <p>{movie.release_date?.slice(0, 4)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>
        </div>
    )
}

export default TopRated