import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = "https://movie-watchlist-zu6o.onrender.com/"

export const useWatchlistStore = create((set) => ({
  loading: false,
  watchList: [],
  error: null,

  fetchWatchlist: async () => {
    try {
      set({ loading: true });
      const { data } = await axios.get(
        "/api/watchlist",
        { withCredentials: true }
      );
      set({ watchList: data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  addToWatchlist: async (movieId, title, poster) => {
    try {
       set({loading : true})
      const { data } = await axios.post(
        "/api/watchlist",
        { movieId, title, poster },
        { withCredentials: true }
      );
      set({ watchList: data , loading : false });
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
      set({loading : false})
    }
  },

  removeFromWatchlist: async (movieId) => {
    try {
      set({loading : true})
      const { data } = await axios.delete(
        `/api/watchlist/${movieId}`,
        { withCredentials: true }
      );
      set({ watchList: data , loading : false });
    } catch (err) {
      console.error(err);
      set({loading : false})
    }
  }
}));
