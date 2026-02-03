import './App.css'
import Home from "./pages/Home.jsx"
import {Routes, Route} from "react-router-dom"
import MainLayout from './layouts/MainLayout.jsx'
import { Quests } from './pages/Quests.jsx'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/quests" element={<Quests/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
