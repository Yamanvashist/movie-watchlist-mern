import React, { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import bg from "../assets/bg.jpg";
import avatarlogo from "../assets/avatar3logo.png";
import avatarCard from "../assets/avatarCard.jpg";
import avatarTrailer from "../assets/avatarTrailer.mp4";
import TrendingMovies from '../components/TrendingMovies'


const Home = () => {
  return (
    <div className="w-full overflow-hidden bg-black">

      {/* HERO SECTION */}
      <section
        className="relative flex flex-col pt-40 md:flex-row justify-center items-center 
                   min-h-screen gap-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-black/90"></div>

        {/* LEFT CONTENT */}
        <div className="relative z-20 flex flex-col items-center gap-3 text-center">
          <img src={avatarlogo} className="w-150" />

          <div className="flex gap-4 text-white items-center">
            <span>Action | Adventure | Sci-Fi</span>
            <span className="flex gap-1 items-center">
              <Calendar className="w-4 h-4" /> 2025
            </span>
            <span className="flex gap-1 items-center">
              <Clock className="w-4 h-4" /> 2h 40m
            </span>
          </div>

          <p className="hidden md:block text-white max-w-xl">
            Jake Sully, Neytiri, and their family face a brutal new Ash tribe,
            testing loyalty, grief, and survival on Pandora.
          </p>

          <div className="flex gap-6 mt-4">
            <button className="px-8 py-4 rounded-full font-semibold text-white 
              bg-linear-to-r from-red-600 via-pink-500 to-red-600
              shadow-[0_0_15px_rgba(255,0,0,0.7)] hover:scale-105 transition cursor-pointer">
              Get Started
            </button>

            <button className="px-8 py-4 rounded-full font-semibold text-white 
              bg-linear-to-r from-red-600 via-pink-500 to-red-600
              shadow-[0_0_15px_rgba(255,0,0,0.7)] hover:scale-105 transition cursor-pointer">
              View Watchlist
            </button>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div
          className="relative border-2 border-white rounded-4xl overflow-hidden 
                     w-100 h-150 hover:scale-110 transition"
          onMouseEnter={(e) => e.currentTarget.querySelector("video").play()}
          onMouseLeave={(e) => {
            const video = e.currentTarget.querySelector("video");
            video.pause();
            video.currentTime = 0;
          }}
        >
          <img
            src={avatarCard}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <video
            src={avatarTrailer}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 
                       hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </section>

      {/* SECOND SECTION */}
      <section className="py-24 px-6 md:px-20 text-white bg-blue-600/5">


        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Trending Now
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <TrendingMovies></TrendingMovies>
        </div>

      </section>
    </div>
  );
};

export default Home;
