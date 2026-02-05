import styles from "./Profile.module.scss"
import titulo from "../assets/images/title-background-text.png"
import { useEffect, useState } from "react"
import { getPlayer } from "../api/player"


export const Profile = () => {
  const [me, setMe] = useState()
  const [name, setName] = useState("")
  const [quests, setQuests] = useState([])
  const [error, setError] = useState()

  const getInformation = async () => {
    const res = await getPlayer()
    if(!res.message) setMe(res)
    else setError(res.message)
  }
  useEffect(() => {
    getInformation()
  },[])
  useEffect(() => {
    if(me){
      setName(me.name)
      setQuests(me.quests)
      console.log(me.quests);
      
    }
  },[me])
  //TERMINAR
  const ultimaQuest = (quests) => {
    const title = ""
    let id = 0
    quests.map( q => {
      if(q.id > id) id = q.id
    })
    title = quests.inde
  }
  return (
    <section className={styles.principal}>
      <img src={titulo} alt="titulo-questlog" className={styles.title}></img>
      <section className={styles.stats}>
        <p>{error}</p>
        <p>Estado del aventurero {name} <span className={styles.name}></span></p>
        <div>
          <h2>Estadisticas</h2>
          <p>Numero de Quest creadas: {quests.length}</p>
        </div>
        <div>
          <h2>Ultima actividad</h2>
          <p>{}</p>
        </div>
      </section>

    </section>
  )
}
export default Profile