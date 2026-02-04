import styles from "./Quests.module.scss"
export const Quests = () => {
    const quests = [
        {
            id: 1,
            name: "Derrotar al bug del render",
            type: "MAIN",
            xpReward: 50,
            completed: true,
            description: "Identificar y corregir el error que hace que los componentes no se muestren correctamente."
        },
        {
            id: 2,
            name: "Actualizar la wiki del gremio",
            type: "SIDE",
            xpReward: 20,
            completed: false,
            description: "Agregar información reciente y corregir errores en las páginas de la wiki del gremio."
        }
        ,
        {
            id: 3,
            name: "Entrenar habilidades de calistenia",
            type: "DAILY",
            xpReward: 10,
            completed: false,
            description: "Realizar tu rutina diaria de calistenia para mantener fuerza y resistencia."
        },
        {
            id: 4,
            name: "Entrenar habilidades de calistenia",
            type: "SIDE",
            xpReward: 10,
            completed: false,
            description: "Realizar tu rutina diaria de calistenia para mantener fuerza y resistencia."
        },
        {
            id: 5,
            name: "Entrenar habilidades de calistenia",
            type: "MAIN",
            xpReward: 10,
            completed: false,
            description: "Realizar tu rutina diaria de calistenia para mantener fuerza y resistencia."
        },
    ];

    return (
        <section className={styles.wall}>
            <h1 className={styles.titleMissions}></h1>
            <section className={styles.paper}>
                {quests.map(q => (
                    <section className={`${styles[q.type]} ${styles.card}`} key={q.id}>
                        <div className={styles.name}>
                            {q.name}
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