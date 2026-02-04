import "./Profile.css"
import titulo from "../assets/images/title-background-text.png"


export const Profile = () => {

  return (
    <section className="principal">
      <img src={titulo} alt="titulo-questlog" className="title"></img>
      <section className="stats">
        <p>Estado del aventurero <span className="name"></span></p>
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