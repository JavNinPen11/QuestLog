import styles from "./Profile.module.scss"
import titulo from "../assets/images/title-background-text.png"


export const Profile = () => {

  return (
    <section className={styles.principal}>
      <img src={titulo} alt="titulo-questlog" className={styles.title}></img>
      <section className={styles.stats}>
        <p>Estado del aventurero <span className={styles.name}></span></p>
        <div>
          <h2>Estadisticas</h2>

        </div>
        <div>
          <h2>Ultima actividad</h2>
        </div>
      </section>

    </section>
  )
}
export default Profile