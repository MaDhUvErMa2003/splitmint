import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  addExpense,
  getExpenses,
  deleteExpense
} from "../controllers/expense.controller.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/:groupId", addExpense);
router.get("/:groupId", getExpenses);
router.delete("/:id", deleteExpense);

export default router;
