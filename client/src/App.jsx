import './App.css'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import MainLayout from './layouts/MainLayout'
import { Search } from 'lucide-react'
import SearchMovie from './pages/SearchMovie'
import Login from './pages/Login'
import MovieDetail from './pages/MovieDetail'
import { WatchList } from './pages/WatchList'
import { AuthStore } from './authContext/AuthStore'
import { useEffect } from 'react'
import Favourite from './pages/Favourite'
import ProtectedRoute from "./authContext/ProtectedRoute"

function App() {

  const checkAuth = AuthStore(s => s.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<SearchMovie />} />
        <Route path='/movie/:id' element={<MovieDetail />} />
        <Route path='/watchlist' element={<ProtectedRoute><WatchList /></ProtectedRoute>} />
        <Route path="/favourites" element={<ProtectedRoute><Favourite /></ProtectedRoute>} />
      </Route>

      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login></Login>} />

    </Routes>)
}

export default App
