import "./Quests.css"
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
        <section className="wall">
            <h1 className="titleMissions"></h1>
            <section className="paper">
                {quests.map(q => (
                    <section className={q.type+" card"} key={q.id}>
                        <div className="name">
                            {q.name}
                        </div>
                        <div className="description">
                            {q.description}
                        </div>
                        <div className="xp">
                            {q.xpReward}
                        </div>
                        <div className="completed">
                            {q.completed ? "Completed" : "Uncompleted"}
                        </div>
                    </section>
                ))}
            </section>
        </section>
    )
}
export default Quests