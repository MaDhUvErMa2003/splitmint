import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getDashboardSummary,
  getFilteredExpenses,
  getGroupDashboard,
  searchExpenses
} from "../controllers/dashboard.controller.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/summary", getDashboardSummary);
router.get("/expenses", getFilteredExpenses);
router.get("/group/:groupId", getGroupDashboard);
router.get("/search", searchExpenses);
export default router;
