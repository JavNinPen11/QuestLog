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
        if (error.code === "P2002") {
            return res.status(400).json({
                error: "Usuario o email ya existe"
            })
        }
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

        req.session.user = {
            id: user.id,
            role: user.role
        } 
        // TEMPORAL
        async function retroEmbedQuests() {
            const quests = await prisma.quest.findMany({ where: { embedding: null } })

            for (const q of quests) {
                const emb = await generateEmbedding(q.description)
                await prisma.quest.update({
                    where: { id: q.id },
                    data: { embedding: emb }
                })
                console.log(`Embeddings generados para quest ${q.id} - ${q.title}`)
            }
        }

        retroEmbedQuests()
            .then(() => console.log("Embeddings retroactivos completados"))
            .catch(console.error)
        ////////////////
        res.json({ message: "Logged In" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export async function logout(req, res) {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: "No se pudo cerrar sesión" })
            }
            res.clearCookie("questlog.sid")
            res.json({ message: "Logged Out" })
        })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
}
export async function me(req, res) {
    const user = await prisma.player.findUnique({
        where: { id: req.session.user.id },
        select: { id: true, name: true, username: true, role: true }
    })
    res.json(user)
}