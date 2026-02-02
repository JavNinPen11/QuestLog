import express from "express"
import {
    createQuest,
    getAllQuests,
    getQuestsById,
    updateQuest,
    deteleQuest
} from "../controllers/questController.js"

const router = express.Router()

router.post("/", createQuest)
router.get("/", getAllQuests)
router.get("/:id", getQuestsById)
router.put("/:id",updateQuest)
router.delete("/:id", deteleQuest)

export default router