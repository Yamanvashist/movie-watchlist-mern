import React from "react";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import bg from "../assets/bg.jpg";
import avatarlogo from "../assets/avatar3logo.png";
import avatarCard from "../assets/avatarCard.jpg";
import avatarTrailer from "../assets/avatarTrailer.mp4";

import TrendingMovies from "../components/TrendingMovies";
import TopRated from "../components/TopRated";
import GenreMovies from "../components/GenreMovies";


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9 } },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.30,
    },
  },
};

const scaleHover = {
  whileHover: { scale: 1.08 },
  whileTap: { scale: 0.95 },
};


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden bg-black">

      {/* HERO SECTION */}
      <section
        className="relative flex flex-col pt-40 md:flex-row justify-center items-center 
                   min-h-screen gap-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-black/90 z-10 pointer-events-none" />

        {/* LEFT CONTENT */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-20 flex flex-col items-center gap-4 text-center"
        >
          <motion.img
            variants={fadeUp}
            src={avatarlogo}
            className="w-150"
            alt="Avatar"
          />

          <motion.div
            variants={fadeUp}
            className="flex gap-4 text-white items-center flex-wrap justify-center"
          >
            <span>Action | Adventure | Sci-Fi</span>
            <span className="flex gap-1 items-center">
              <Calendar className="w-4 h-4" /> 2025
            </span>
            <span className="flex gap-1 items-center">
              <Clock className="w-4 h-4" /> 2h 40m
            </span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="hidden md:block text-white max-w-xl"
          >
            Jake Sully, Neytiri, and their family face a brutal new Ash tribe,
            testing loyalty, grief, and survival on Pandora.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex gap-6 mt-4"
          >
            <motion.button
              {...scaleHover}
              className="px-8 py-4 rounded-full font-semibold text-white 
              bg-linear-to-r from-red-600 via-pink-500 to-red-600
              shadow-[0_0_15px_rgba(255,0,0,0.7)] cursor-pointer"
            >
              Get Started
            </motion.button>

            <motion.button
              {...scaleHover}
              onClick={() => navigate("/watchlist")}
              className="px-8 py-4 rounded-full font-semibold text-white 
              bg-linear-to-r from-red-600 via-pink-500 to-red-600
              shadow-[0_0_15px_rgba(255,0,0,0.7)] cursor-pointer"
            >
              View Watchlist
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6  }}
          animate={{ opacity: 1, scale: 1  }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-20 border-2 border-white rounded-4xl overflow-hidden 
                     w-100 h-150 cursor-pointer "
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
            alt="Avatar Card"
          />

          <video
            src={avatarTrailer}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 
                       hover:opacity-100 transition-opacity duration-300"
          />
        </motion.div>
      </section>

      {/* TRENDING SECTION */}
      <section

        className="py-24 px-6 md:px-20 text-white bg-blue-600/5 flex flex-col gap-16"
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
          <p className="text-white/70">Stay updated with what everyone’s watching</p>
          <TrendingMovies />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}>
          <h2 className="text-3xl md:text-4xl font-bold">Top Rated</h2>
          <p className="text-white/70">Watch some of the highest rated movies</p>
          <TopRated />
        </motion.div>
      </section>

      {/* GENRES */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <GenreMovies />
      </motion.div>

    </div>
  );
};

export default Home;
