import './App.css'
import {Routes, Route} from "react-router-dom"
import MainLayout from './layouts/MainLayout.jsx'
import Profile from "./pages/Profile.jsx"
import Home from "./pages/Home.jsx"
import Quests from './pages/Quests.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/quests" element={<Quests/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
