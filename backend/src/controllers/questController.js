import prisma from "../prismaClient.js";
import { ensureLLM, cosineSimilarity, generateEmbedding } from "./llama/llamaController.js";



export const createQuest = async (req, res) => {
    const SIMILARITY_THRRESHOLD = 0.85
    let xpReward, rewardGold
    try {
        const { title, description, type, playerId } = req.body

        let newEmbedding = await generateEmbedding(description)

        const allQuests = await prisma.questEmbeddings.findMany({
            select: { id: true, embedding: true, xpReward: true, rewardGold: true }
        })

        let matched = null

        for (const q of allQuests) {
            const sim = cosineSimilarity(newEmbedding, q.embedding)
            if (sim >= SIMILARITY_THRRESHOLD) {
                matched = q
                break
            }
        }

        if (matched) {
            xpReward = matched.xpReward
            rewardGold = matched.rewardGold
            newEmbedding = matched.embedding
        }
        else {
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
            const llmRunning = await ensureLLM()
            if (llmRunning) {
                const llmRes = await fetch(`${process.env.LLM_URL}/api/generate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ model: process.env.LLM_MODEL, text: description })
                })
                const llmText = await llmRes.text()
                try {
                    const json = JSON.parse(llmText)
                    xpReward = Math.min(Math.max(json.xpReward, 5), 500)
                    rewardGold = Math.min(Math.max(json.rewardGold, 5), 500)

                } catch (err) {
                    console.log("LLM no devolvió JSON válido, fallback:", llmText)
                    xpReward = 5
                    rewardGold = 5
                }
            }
            else {
                console.log("LLM no disponible, fallback activado")
                xpReward = 5
                rewardGold = 5
            }

        }
        const quest = await prisma.quest.create({
            data: { title, description, type, xpReward, rewardGold, playerId, embedding: newEmbedding },
            include: { player: true }
        })
        const questEmbeddings = await prisma.questEmbeddings.create({
            data: { embedding: newEmbedding, creationTitle: title, creationDescription: description, xpReward, rewardGold }
        })
        return res.json(quest)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
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