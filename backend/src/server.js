import express from "express"
import cors from "cors"
import playerRoutes from "./routes/playerRoutes.js"
import questRoutes from "./routes/questRoutes.js"
import authRoutes from "./routes/authRoutes.js"

const FRONT_URL = process.env.FRONT_URL

const app = express()

app.use(cors({
    origin: FRONT_URL,
    credentials: true
}))

app.use(session({
    name: "questlog.sid",
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 1000*60*60*24
    }
}))

app.use(express.json())

app.use("/players", playerRoutes)
app.use("/quests", questRoutes)
app.use("/auth", authRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => {
    console.log("Backend corriendo en el puerto: "+ PORT)
})