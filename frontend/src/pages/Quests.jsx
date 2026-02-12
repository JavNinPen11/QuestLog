import { useEffect, useState } from "react"
import styles from "./Quests.module.scss"
import { getPlayer } from "../api/player"
export const Quests = () => {
    const [me, setMe] = useState()
    const [quests, setQuests] = useState()
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
      setQuests(me.quests)
    }
  },[me])
    return (
        <section className={styles.wall}>
            <h1 className={styles.titleMissions}></h1>
            <section className={styles.paper}>
                {quests && quests.map(q => (
                    <section className={`${styles[q.type]} ${styles.card}`} key={q.id}>
                        <div className={styles.title}>
                            {q.title}
                        </div>
                        <div className={styles.description}>
                            {q.description}
                        </div>
                        <div className={styles.xp}>
                            {q.xpReward}
                        </div>
                        <div className={styles.completed}>
                            {q.completed ? "Completed" : "Uncompleted"}
                        </div>
                    </section>
                ))}
            </section>
        </section>
    )
}
export default Quests