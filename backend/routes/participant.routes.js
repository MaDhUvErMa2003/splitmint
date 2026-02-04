import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addParticipant,
  updateParticipant,
  deleteParticipant,
  getParticipantsByGroup 
} from "../controllers/participant.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/:groupId", addParticipant);

router.put("/:id", updateParticipant);


router.delete("/:id", deleteParticipant);
router.get("/:groupId", getParticipantsByGroup);
export default router;
