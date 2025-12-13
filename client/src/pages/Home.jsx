import React, { useState } from 'react'
import { Calendar, Clock } from 'lucide-react';
import bg from "../assets/bg.jpg"
import { ArrowRight } from 'lucide-react';
import avatarlogo from "../assets/avatar3logo.png"
import avatarCard from "../assets/avatarCard.jpg"
import avatarTrailer from "../assets/avatarTrailer.mp4"

const Home = () => {

    const [currentImg, setCurrentImg] = useState(avatarCard)

    return (
        <div
            className="flex flex-col overflow-hidden pt-40 md:flex-row justify-center items-center h-screen bg-cover bg-center bg-no-repeat gap-16  relative"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-black/80"></div>

            <div className='flex relative z-20 flex-col justify-center items-center gap-2'>
                <img src={avatarlogo} className='w-150' />
                <div className='flex flex-row items-center justify-center gap-4'>
                    <h1 className='text-white font-sans '>Action | Adventure | Sci-Fi</h1>
                    <p className='text-white font-sans items-center flex gap-2 '>
                        <Calendar className='w-5 h-5 text-white' />
                        2025</p>
                    <p className='text-white font-sans flex gap-2 '><Clock /> 2h 40m</p>

                </div>
                <p className='hidden md:text-white text-center   '>Jake Sully, Neytiri, and their family return to Pandora and clash with <br />
                    a fierce new Ash People tribe born of fire and volcanic rage, testing <br />
                    alliances, grief, and survival in an epic.</p>
                <div id='btns' className='flex gap-6 mt-2'>
                    <button className="px-8 py-4 rounded-full font-semibold text-white 
                                    bg-linear-to-r from-red-600 via-pink-500 to-red-600 
                                    shadow-[0_0_15px_3px_rgba(243,12,12,0.8)]
                                    hover:shadow-[0_0_25px_6px_rgba(255, 11, 11, 1)] hover:scale-105
                                    transition-all duration-300 cursor-pointer">
                        Get Started
                    </button>


                    <button className="px-8 py-4 rounded-full font-semibold text-white 
                                    bg-linear-to-r from-red-600 via-pink-500 to-red-600
                                    shadow-[0_0_15px_3px_rgba(243,12,12,0.8)]
                                    hover:shadow-[0_0_25px_6px_rgba(255, 11, 11, 1)] hover:scale-105
                                    transition-all duration-300 cursor-pointer">
                        View Watchlist
                    </button>


                </div>
            </div>
            <div
                className="relative border-2 border-white rounded-4xl overflow-hidden 
             w-100 h-150 transition-transform duration-300 hover:scale-110"
                onMouseEnter={(e) => e.currentTarget.querySelector("video").play()}
                onMouseLeave={(e) => {
                    const video = e.currentTarget.querySelector("video");
                    video.pause();
                    video.currentTime = 0;
                }}
            >
                <img
                    src={avatarCard}
                    className="w-full h-full object-cover absolute inset-0"
                />

                <video
                    src={avatarTrailer}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
            </div>


            <div>

            </div>

        </div>
    )
}

export default Home
