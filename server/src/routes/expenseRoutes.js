import express from "express";
import {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../controllers/expenseController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addExpense)
  .get(protect, getExpenses);

router
  .route("/:id")
  .delete(protect, deleteExpense)
  .put(protect, updateExpense); 

export {router};
