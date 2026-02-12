import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/images/QuestLog_LogoFull-2.png"
import styles from "./MainNav.module.scss"
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
      <nav className={user ? styles.MainNavLogged : styles.MainNavUnlogged}>
        {user ? (
          // Usuario Logeado
          <>
            <section className={`${styles.LeftPanel} ${styles.Panel}`}>
              <div className={styles.LinkContainer}>
                <Link to="/profile" className={styles.Link}><h1>Perfil</h1></Link>
              </div>
              <div className={styles.LinkContainer}>
                <Link to="/quests" className={styles.Link}><h1>Quests</h1></Link>
              </div>
            </section>
            <section className={styles.LogoPanel}>
              <Link to="/">
                <img src={logo} alt="QuestLog-logo" className={styles.questlogLogo}></img>
              </Link>
            </section>
            <section className={`${styles.RigthPanel} ${styles.Panel}`}>
              <div className={styles.LinkContainer}></div>
              <div className={styles.LinkContainer}>
                <button className={styles.Link} onClick={handleLogout}><h1>LogOut</h1></button>
              </div>
            </section>
          </>) :
          // Usuario no logueado
          (<>
            
              <div className={styles.LinkContainer}>
                <Link to="/login" className={styles.Link}><h1>Login</h1></Link>
              </div>
            
            <section className={styles.LogoPanel}>
              <Link to="/">
                <img src={logo} alt="QuestLog-logo" className={styles.questlogLogo}></img>
              </Link>
            </section>
              <div className={styles.LinkContainer}>
                <Link to="/register" className={styles.Link}><h1>Register</h1></Link>
              </div>
                
          </>)}
      </nav>
    </div>
  )
}
export default MainNav