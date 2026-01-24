import { create } from "zustand"
import axios from "axios"



export const AuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    register: async ({ name, email, password }) => {
        try {
            set({ loading: true })
            const { data } = await axios.post("http://localhost:4000/api/auth/register", {
                name,
                email,
                password
            }, { withCredentials: true })
            set({ user: data.user, loading: false, error: data })
            return data
        } catch (err) {
            set({ user: null, loading: false, error: null })
        }
    },

    login: async ({ email, password }) => {
        try {
            set({ loading: true })
            const { data } = await axios.post("http://localhost:4000/api/auth/login", {
                email,
                password
            }, { withCredentials: true })
            set({ user: data.user, loading: false, error: data })
            return data
        } catch (err) {
            set({ user: null, loading: false, error: null })
        }
    },

    logout: async () => {
        try {
            set({ loading: true })
            const { data } = await axios.post("http://localhost:4000/api/auth/logout", {}, { withCredentials: true })
            set({ user: null, loading: false })
            console.log(data)
        } catch (err) {
            set({ user: null, loading: false })
        }
    }


}))