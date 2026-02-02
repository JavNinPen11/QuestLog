import express from "express"
import cors from "cors"
import playerRoutes from "./routes/playerRoutes.js"
import questRoutes from "./routes/questRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/players", playerRoutes)
app.use("/quests", questRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => {
    console.log("Backend corriendo en el puerto: "+PORT)
})