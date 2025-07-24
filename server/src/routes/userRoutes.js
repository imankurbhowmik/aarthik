import express from "express";
import { getUserProfile, changePassword } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getUserProfile);
router.put("/change-password", protect, changePassword);

export {router};
