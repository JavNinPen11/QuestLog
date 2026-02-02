import prisma from "../prismaClient.js";

export const createQuest = async (req, res) =>{
    try {
        const {title, description, type, xpReward, rewardGold, playerId} = req.body
        const quest = await prisma.quest.create({
            data: {title, description, type, xpReward, rewardGold, playerId},
            include: {player: true}
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export const getAllQuests = async (req, res) =>{
    try {
        const quests = await prisma.quest.findMany({
            include: {player: true}
        })
        res.json(quests)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export const getQuestsById = async (req, res) =>{
    const {id} = req.params
    try {
        const quests = await prisma.quest.findMany({
            where: {id: parseInt(id)},
            include: {player: true}
        })
        res.json(quests)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export const updateQuest = async (req, res) => {
    const {id} = req.params
    const data = req.body
    try {
        const quest = await prisma.quest.update({
            where: {id: parseInt(id)},
            data
        })
        res.json(quest)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export const deteleQuest = async (req, res) => {
    const {id} = req.params
    try {
        await prisma.quest.delete({where: {id: parseInt(id)}})
        res.json({message: "Quest deleted succesfully"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}