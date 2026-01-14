import express from "express";
import cors from "cors";
import {PrismaClient} from "@prisma/client"

const app = express()


app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

app.get("/", (req, res) =>{
    res.json({status: "QuestLog Corriendo"})
})
app.get("/players", async(req,res) =>{
    try{
        const players = await prisma.player.findMany({
            include: {
                quests: true
            }
        }) 
        res.status(201).json(players)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
app.post("/player", async(req, res) =>{
    try{
        const {name} = req.body
        const player = await prisma.player.create({
            data: {name}
        })
        res.status(201).json(player)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
app.get("/quests", async(req, res) =>{
    try{
        const quests = await prisma.quest.findMany()
        res.json(quests)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
app.post("/quests", async(req, res) =>{
    try{
        const {name, description, type, xpReward, playerId} = req.body
        const quest = await prisma.quest.create({
            data: {name, description, type, xpReward, playerId},
            include: {player: true}
        })
        res.status(201).json(quest)
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log(`Backend corriendo en el puerto ${PORT}`)
})