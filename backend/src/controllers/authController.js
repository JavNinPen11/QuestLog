import prisma from "../prismaClient.js";
import bcrypt from "bcrypt"

export async function register(req, res) {
    try {
        const { name, username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.player.create({
            data: { name, username, email, password: hashedPassword }
        })
        res.status(201).json({ id: user.id, name: user.name, username: user.username, email: user.email })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export async function login(req, res) {
    try {
        const { username, password } = req.body
        const user = await prisma.player.findUnique({ where: { username } })
        if (!user) return res.status(401).json({ error: "Usuario invalido" })

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" })

        req.session.userId = user.id
        res.json({ message: "Logged In" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export async function logout(req, res) {
    try {
        req.session.destroy(() => {
            res.clearCookie("questlog.sid")
            res.json({ message: "Logged Out" })
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export async function me(req, res) {
    try {
        if (!req.session.userId) return res.status(401).json({ error: "No autenticado" })
        const user = await prisma.player.findUnique({
            where: { id: req.session.userId },
            select: { id: true, name: true, username: true }
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}