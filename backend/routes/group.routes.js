import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createGroup,
  getGroups,
  updateGroup,
  deleteGroup
} from "../controllers/group.controller.js";

const router = express.Router();

router.use(authMiddleware); // protect all group routes

router.post("/", createGroup);
router.get("/", getGroups);
router.put("/:id", updateGroup);
router.delete("/:id", deleteGroup);

export default router;
