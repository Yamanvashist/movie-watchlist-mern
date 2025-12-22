import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TrendingMovies from './components/TrendingMovies'
import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import MainLayout from './layouts/MainLayout'
import { Search } from 'lucide-react'
import SearchMovie from './pages/SearchMovie'
import Login from './pages/Login'

function App() {


  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<SearchMovie/>}/>
      </Route>

      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login></Login>}/>

    </Routes>)
}

export default App
