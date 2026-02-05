import express from "express"
import{
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
} from "../controllers/playerController.js"
import { requireLogin } from "../middleware/authMiddleware.js"

const router = express.Router()

// router.post("/", createPlayer)
// router.get("/", getAllPlayers)
router.get("/:id", requireLogin, getPlayerById)
router.put("/:id", updatePlayer)
router.delete("/:id", deletePlayer)

export default router