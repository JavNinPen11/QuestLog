import './App.css'
import { Routes, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout.jsx'
import Profile from "./pages/Profile.jsx"
import Home from "./pages/Home.jsx"
import Quests from './pages/Quests.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import PublicRoute from './authRouter/PublicRoute.jsx'
import PrivateRoute from './authRouter/privateRoute.jsx'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* Rutas Publicas */}¨
          <Route element={<PublicRoute />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/quests" element={<Quests />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
