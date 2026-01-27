import "./Home.css"

export const Home = () => {
  const stats = {
    name: "Javier",
    total: 12,
    completed: 7,
    active: 5,
    level: 3
  }
  return (
    <section className="principal">
      <h1 className="title"></h1>
      <section className="stats">
        <p>Estado del aventurero <p className="name">{stats.name}</p></p>
      <div>
        <h2>Estadisticas</h2>
        <ul>
          <li>Misiones totales: {stats.total}</li>
          <li>Completadas: {stats.completed}</li>
          <li>Activas: {stats.active}</li>
          <li>Nivel: {stats.level}</li>
        </ul>
      </div>
      <div>
        <h2>Ultima actividad</h2>
        <p>Has completado "Derrotar al bug del render"</p>
      </div>
      </section>
      
    </section>
  )
}
export default Home