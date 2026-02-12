import prisma from "../prismaClient.js";


export const createQuest = async (req, res) => {
    try {
        const { title, description, type, playerId } = req.body

        const prompt = `Eres un sistema interno de progresión RPG.

                        Analiza la siguiente quest y devuelve EXCLUSIVAMENTE un JSON válido,
                        sin texto adicional, sin explicaciones, sin markdown.

                        Formato EXACTO:
                        {
                        "xpReward": number,
                        "rewardGold": number
                        }

                        Reglas:
                        - xpReward mínimo: 5
                        - xpReward máximo: 500
                        - rewardGold mínimo: 5
                        - rewardGold máximo: 500

                        Reglas por tipo:
                        - MAIN: recompensas altas
                        - SIDE: recompensas medias
                        - DAILY: recompensas bajas

                        La descripción es el factor principal.
                        El tipo de quest solo ajusta el resultado.

                        Quest:
                        Título: "${title}"
                        Tipo: ${type}
                        Descripción: "${description}"
                        `

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                thinkingConfig: {
                    thinkingLevel: ThinkingLevel.LOW,
                }
            }
        })
        let nswr
        try {
            nswr = JSON.parse(response.text)
        }
        catch (error) {
            console.log("Texto recibido: " + response.text)
            return res.status(500).json({ error: "La IA no devolvio JSON valido" })
        }
        const { xpReward, rewardGold } = nswr

        const quest = await prisma.quest.create({
            data: { title, description, type, xpReward, rewardGold, playerId },
            include: { player: true }
        })
        return res.json(quest)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const getAllQuests = async (req, res) => {
    try {
        const quests = await prisma.quest.findMany({
            include: { player: true }
        })
        res.json(quests)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const getQuestsById = async (req, res) => {
    const { id } = req.params
    try {
        const quests = await prisma.quest.findMany({
            where: { id: parseInt(id) },
            include: { player: true }
        })
        res.json(quests)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const updateQuest = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const quest = await prisma.quest.update({
            where: { id: parseInt(id) },
            data
        })
        res.json(quest)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const deteleQuest = async (req, res) => {
    const { id } = req.params
    try {
        await prisma.quest.delete({ where: { id: parseInt(id) } })
        res.json({ message: "Quest deleted succesfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}