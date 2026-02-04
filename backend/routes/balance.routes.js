import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getGroupBalance } from "../controllers/balance.controller.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/:groupId", getGroupBalance);

export default router;
