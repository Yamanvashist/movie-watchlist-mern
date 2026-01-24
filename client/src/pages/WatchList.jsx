import { useState } from 'react';
import joker from '../assets/joker.png';


export const WatchList = () => {

    const [movies, setMovies] = useState(initialMovies);

 

    return (
        <div className='bg-gray-900 min-h-screen w-full'>
            <section 
                className='flex items-center justify-center min-h-screen bg-cover bg-center w-full text-white pt-20 px-4 md:px-8 lg:px-16' 
                style={{ backgroundImage: `url(${joker})` }}
            >
             
                <div className='grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full max-w-7xl'>
                    
                    {movies.map((movie) => (
                        <div
                            key={movie.movieId}
                            className="bg-gray-800 w-full h-auto flex flex-col p-3 gap-2 rounded-2xl hover:scale-105 transition-all duration-300"
                        >
                            <img
                                className="rounded-lg h-52 w-full object-cover"
                                src={movie.poster}
                                alt={movie.title}
                            />

                            <div className="flex flex-col grow">
                                <p className='text-white font-sans font-semibold truncate'>{movie.title}</p>
                            </div>

                            <button
                                className="mt-auto flex items-center justify-center px-4 py-2 rounded-full 
                                font-semibold text-xs transition-all duration-300 cursor-pointer 
                                bg-red-500 hover:bg-red-600 text-white shadow-lg active:scale-95"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    
                    {movies.length === 0 && (
                         <div className="col-span-full text-center text-gray-400 text-xl font-bold">
                             Watchlist is empty, bro. Go touch grass.
                         </div>
                    )}

                </div>
            </section>
        </div>
    )
}