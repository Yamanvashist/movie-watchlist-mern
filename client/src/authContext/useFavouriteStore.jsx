import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "https://movie-watchlist-zu6o.onrender.com/"


export const useFavouriteStore = create((set, get) => ({

    favourites: [],
    loading: false,

    fetchFavourite: async () => {
        try {
            set({ loading: true })
            const { data } = await axios.get("/api/favourites", {
                withCredentials: true
            })
            set({ loading: false, favourites: data })
        } catch (err) {
            set({ loading: false })
        }
    },

    addToFavourite: async (movieId, title, poster) => {
        try {
            set({ loading: true })
            const { data } = await axios.post("/api/favourites", {
                movieId, title, poster
            }, {
                withCredentials: true
            })
            set({ loading: false, favourites: data })
        } catch (err) {
            set({ loading: false })
            console.error(err.response?.data?.msg || err.message);
        }
    },

    removeFromFavourite: async (movieId) => {
        try {
            set({ loading: true })
            const { data } = await axios.delete(`/api/favourites/${movieId}`, {
                withCredentials: true
            })
            set({ loading: false, favourites: data })

        } catch (err) {
            set({ loading: false })
            console.error(err.response?.data?.msg || err.message);
        }
    },


    isInFavourite: (movieId) => {
        return get().favourites.some(
            m => m.movieId === String(movieId)
        );
    },

}))