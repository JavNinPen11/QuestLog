import './App.css'
import Home from "./pages/Home.jsx"
import {Routes, Route} from "react-router-dom"
import TestPage from './pages/TestPage.jsx'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/test' element={<TestPage/>}/>
      </Routes>
    </div>
  )
}

export default App
