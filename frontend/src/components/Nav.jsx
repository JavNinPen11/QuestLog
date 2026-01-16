import { Link } from "react-router-dom"
import logo from "../assets/QuestLog_LogoFull.png"
import "./Nav.css"

export const Nav = () => {
  return (
    <div>
      <nav className="QLNav">
        <Link to="/">
          <img src={logo} alt="QuestLog_LogoFull" className="QLLogoFull"/>
        </Link>
        <Link to="/test">
        To test
        </Link>
      </nav>
    </div>
  )
}
export default Nav