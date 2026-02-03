import { Link } from "react-router-dom"
import logo from "../assets/images/QuestLog_LogoFull.png"
import "./MainNav.css"
import { useContext } from "react"
import { UserContext } from "../context/userContext"

export const MainNav = () => {
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  
  

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
              <div className="LinkContainer"></div>
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