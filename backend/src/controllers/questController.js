import prisma from "../prismaClient.js";
import { callLLM, cosineSimilarity, generateEmbedding } from "./llama/llamaController.js";



export const createQuest = async (req, res) => {
    const SIMILARITY_THRRESHOLD = 0.9
    let xpReward, rewardGold
    try {
        const { title, description, type, playerId } = req.body

        const newEmbedding = await generateEmbedding(description)

        const allQuests = await prisma.quest.findMany({
            select: { id: true, xpReward: true, rewardGold: true, embedding: true }
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
            const llmRes = callLLM(prompt)
            try {
                const json = JSON.parse(llmRes)
                xpReward = Math.min(Math.max(json.xpReward, 5), 500)
                rewardGold = Math.min(Math.max(json.rewardGold, 5), 500)
            }catch(err){
                console.error("LLM no devolvio un JSON valido, fallback")
                xpReward = 10
                rewardGold = 10
                
            }
        }
    const quest = await prisma.quest.create({
        data:{ title, description, type, xpReward, rewardGold, playerId, embedding:newEmbedding},
        include: {player: true}
    })
    return res.json(quest)
    }catch(err){
        console.error(err)
        res.status(500).json({message: err.message})        
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