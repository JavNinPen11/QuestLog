import styles from "./Home.module.scss"
import welcome from "../assets/images/title-background-welcome.png"
import title from "../assets/images/QuestLog_Title.png"

export const Home = () => {
  return (
    <main className={styles.principal}>
      <section className={styles.welcomeContainer}>
        <img src={welcome} alt="welcome-image" className={styles.welcome} />
        <img src={title} alt="QuestLog-Title" className={styles.title} />
        <h1 className={styles.subtitle}>
          Convierte tus tareas diarias en misiones épicas.
            Progresa como un héroe, gana experiencia y oro,
            y mantén el control de tu aventura.
        </h1>
      </section>
      <section className={styles.howItWorks}>
        <h2>¿Cómo funciona QuestLog?</h2>

        <div className={styles.steps}>
          <div className={styles.step}>
            <h3>🗒️ Crea misiones</h3>
            <p>Transforma tus tareas reales en quests medievales.</p>
          </div>

          <div className={styles.step}>
            <h3>⚔️ Complétalas</h3>
            <p>Cada misión completada te otorga experiencia y oro.</p>
          </div>

          <div className={styles.step}>
            <h3>🏆 Progresa</h3>
            <p>Sube de nivel, mejora tu personaje y mantén la disciplina.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
export default Home