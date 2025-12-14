import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import TrendingMovies from './components/TrendingMovies'
import { Routes, Route } from "react-router-dom"
import SignUp from "./pages/SignUp"
import MainLayout from './layouts/MainLayout'

function App() {


  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
      </Route>

      <Route path='/signup' element={<SignUp />} />

    </Routes>)
}

export default App
