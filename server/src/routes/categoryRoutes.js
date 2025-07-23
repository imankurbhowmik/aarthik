import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createCategory).get(protect, getCategories);
router.route("/:id").put(protect, updateCategory).delete(protect, deleteCategory);

export {router};
