import express from "express";
import {
  addIncome,
  getIncomes,
  deleteIncome,
  updateIncome,
} from "../controllers/incomeController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addIncome)
  .get(protect, getIncomes);

router
  .route("/:id")
  .delete(protect, deleteIncome)
  .put(protect, updateIncome);

export {router};
