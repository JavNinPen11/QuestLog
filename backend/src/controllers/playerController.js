import prisma from "../prismaClient.js";

export const createPlayer = async (req, res) => {
    try {
        const { name } = req.body
        const player = await prisma.player.create({ data: { name } })
        res.status(201).json(player)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const getAllPlayers = async (req, res) => {
    try {
        const players = await prisma.player.findMany({
            include: { quests: true }
        })
        res.json(players)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const getPlayerById = async (req, res) => {
    const { id } = req.params
    try {
        const player = await prisma.player.findUnique({
            where: { id: parseInt(i) },
            include: { quests: true }
        })
        if (!player) return res.status(404).json({ error: "Player not found" })
        res.json(player)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const updatePlayer = async (req, res) => {
    const { id } = req.params
    const { name } = req.params
    try {
        const player = await prisma.player.update({
            where: { id: parseInt(id) },
            data: { name }
        })
        res.json(player)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export const deletePlayer = async (req, res) => {
    const { id } = req.params
    try {
        await prisma.player.delete({ where: { id: parseInt(id) } })
        res.json({ message: "Player deleted succesfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}