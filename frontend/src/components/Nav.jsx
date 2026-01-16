import { Link } from "react-router-dom"
import logo from "../assets/QuestLog_Logo.png"
import "./Nav.css"

export const Nav = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          <img src={logo} alt="QuestLog_Logo" className="QLLogo"/>
        </Link>

      </nav>
    </div>
  )
}
export default Nav