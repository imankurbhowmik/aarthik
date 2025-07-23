import express from "express";
import { getSummary } from "../controllers/analyticsController.js";
import { getMonthlyTrend } from "../controllers/analyticsController.js";
import { getMonthlyCategoryBreakdown } from "../controllers/analyticsController.js";
import { getMonthlySourceBreakdown } from "../controllers/analyticsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getSummary);
router.get("/monthly-trend", protect, getMonthlyTrend);
router.get("/monthly-category-breakdown", protect, getMonthlyCategoryBreakdown);
router.get("/monthly-source-breakdown", protect, getMonthlySourceBreakdown);


export {router};
