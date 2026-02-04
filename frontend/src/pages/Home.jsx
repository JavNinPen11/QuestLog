import "./Home.css"
import welcome from "../assets/images/title-background-welcome.png"
import title from "../assets/images/QuestLog_Title.png"

export const Home = () => {
  return (
    <section className="principal">
      <img src={welcome} alt="welcome-image" className="welcome"/>
      <img src={title} alt="QuestLog-Title" className="title"/>
    </section>
  )
}
export default Home