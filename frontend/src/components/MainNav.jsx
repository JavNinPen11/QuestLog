import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/images/QuestLog_LogoFull-2.png"
import "./MainNav.css"
import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"
import { logout } from "../api/auth"

export const MainNav = () => {
  const { user, setUser } = useContext(UserContext);
  const { error, setError} = useState("")
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    e.preventDefault()
    const res = await logout()
    if(res.error) setError(res.error)
    else{
      setUser(null)
      navigate("/")
    }
  }
  return (
    <div>
      <nav className="MainNav">
        {user ? (
          <>
            <section className="LeftPanel Panel">
              <div className="LinkContainer">
                <Link to="/profile" className="Link"><h1>Perfil</h1></Link>
              </div>
              <div className="LinkContainer">
                <Link to="/quests" className="Link"><h1>Misiones</h1></Link>
              </div>
            </section>
            <section className="LogoPanel">
              <Link to="/">
                <img src={logo} alt="QuestLog-logo" className="QuestLog-Logo"></img>
              </Link>
            </section>
            <section className="RigthPanel Panel">
              <div className="LinkContainer"></div>
              <div className="LinkContainer">
                <button className="Link" onClick={handleLogout}><h1>LogOut</h1></button>
              </div>
            </section>
          </>) :
          (<>
            <section className="LeftPanel Panel">
              <div className="LinkContainer">
                <Link to="/login" className="Link"><h1>Login</h1></Link>
              </div>
            </section>
            <section className="LogoPanel">
              <Link to="/">
                <img src={logo} alt="QuestLog-logo" className="QuestLog-Logo"></img>
              </Link>
            </section>
            <section className="RigthPanel Panel">
              <div className="LinkContainer">
                <Link to="/register" className="Link"><h1>Register</h1></Link>
              </div>
            </section>      
          </>)}
      </nav>
    </div>
  )
}
export default MainNav