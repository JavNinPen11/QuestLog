import styles from "./Home.module.scss"
import welcome from "../assets/images/title-background-welcome.png"
import title from "../assets/images/QuestLog_Title.png"

export const Home = () => {
  return (
    <section className={styles.principal}>
      <img src={welcome} alt="welcome-image" className={styles.welcome}/>
      <img src={title} alt="QuestLog-Title" className={styles.title}/>
    </section>
  )
}
export default Home