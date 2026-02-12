import express from "express"
import {
    createQuest,
    getAllQuests,
    getQuestsById,
    updateQuest,
    deteleQuest
} from "../controllers/questController.js"
import { requireLogin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", createQuest)
router.get("/", requireLogin, getAllQuests)
router.get("/:id", getQuestsById)
router.put("/:id",updateQuest)
router.delete("/:id", deteleQuest)

export default router