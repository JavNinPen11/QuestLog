import { useEffect, useState } from "react"
import styles from "./Quests.module.scss"
import { getPlayer } from "../api/player"
import botonCrearQuest from "../assets/images/createQuestButton.png"
import { useAuth } from "../context/userContext"
import { createQuest } from "../api/quest"

export const Quests = () => {
    const { user } = useAuth()
    const [me, setMe] = useState()
    const [quests, setQuests] = useState()
    const [error, setError] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "DAILY"
    })
    const getInformation = async () => {
        const res = await getPlayer()
        if (!res.message) setMe(res)
        else setError(res.message)
    }
    useEffect(() => {
        getInformation()
    }, [])
    useEffect(() => {
        if (me) {
            setQuests(me.quests)
        }
    }, [me])
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        const id = user.id
        let data = formData
        data.playerId = id
        data = JSON.stringify(data)
        const res = await createQuest(data)
        if (!res.message) {
            setIsOpen(false)
            setFormData({
                title: "",
                description: "",
                type: "DAILY"
            })
            getInformation()
        }
        else{
            alert("Ha habido un error: ", res)
        }


    }
    return (
        <section className={styles.wall}>
            <h1 className={styles.titleMissions}></h1>
            <div className={styles.newQuestContainer}>
                <button type="button" className={styles.newQuestButton} onClick={() => setIsOpen(true)}>
                    <img src={botonCrearQuest} className={styles.newQuestImage}></img>
                </button>
                {isOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <span className={styles.close} onClick={() => setIsOpen(false)}>
                                &times;
                            </span>
                            <h2>Crear nueva Quest</h2>
                            <form onSubmit={handleSubmit} className={styles.questForm}>
                                <input type="text" name="title" placeholder="Título" value={formData.title} onChange={handleChange} required />
                                <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
                                <select name="type" value={formData.type} onChange={handleChange}>
                                    <option value={"DAILY"}>Diaria</option>
                                    <option value={"MAIN"}>Principal</option>
                                    <option value={"SIDE"}>Secundaria</option>
                                </select>
                                <button type="submit" className={styles.submitBtn}>
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
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