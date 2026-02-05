import styles from "./Profile.module.scss"
import titulo from "../assets/images/title-background-text.png"
import { useEffect, useState } from "react"
import { getPlayer } from "../api/player"


export const Profile = () => {
  const [me, setMe] = useState()
  const [name, setName] = useState("")
  const [quests, setQuests] = useState([])
  const [ultima, setUltima] = useState()
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
      setUltima(ultimaQuest(me.quests))
    }
  },[me])
  const ultimaQuest = (quests) => {
    const ultima = quests.reduce((obj, q) => {
      if(!obj.title){
        obj.title = q.title
        obj.id = q.id
      }
      if(q.id > obj.id){
        obj.title = q.title
        obj.id
      }
      return obj
    },{})
    return ultima
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
          {ultima && <p>{ultima.title}</p>}
        </div>
      </section>

    </section>
  )
}
export default Profile