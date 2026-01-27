import { create } from "zustand";
import axios from "axios";

export const useWatchlistStore = create((set) => ({
  loading: false,
  watchList: [],
  error: null,

  fetchWatchlist: async () => {
    try {
      set({ loading: true });
      const { data } = await axios.get(
        "http://localhost:4000/api/watchlist",
        { withCredentials: true }
      );
      set({ watchList: data, loading: false });
    } catch (err) {
      set({ loading: false });
    }
  },

  addToWatchlist: async (movieId, title, poster) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/watchlist",
        { movieId, title, poster },
        { withCredentials: true }
      );
      set({ watchList: data });
    } catch (err) {
      console.error(err.response?.data?.msg || err.message);
    }
  },

  removeFromWatchlist: async (movieId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/watchlist/${movieId}`,
        { withCredentials: true }
      );
      set({ watchList: data });
    } catch (err) {
      console.error(err);
    }
  }
}));
