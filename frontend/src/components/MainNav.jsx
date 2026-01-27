import { Link } from "react-router-dom"
import logo from "../assets/images/QuestLog_LogoFull.png"
import "./MainNav.css"

export const MainNav = () => {
  return (
    <div>
      <nav className="MainNav">
        <section className="LeftPanel Panel">
          <div className="LinkContainer">
            <Link to="/quests" className="Link"><h1>Misiones</h1></Link>
          </div>
          <div className="LinkContainer"></div>
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
      </nav>
    </div>
  )
}
export default MainNav