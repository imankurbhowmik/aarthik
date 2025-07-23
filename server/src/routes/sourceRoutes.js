import express from "express";
import { createSource, getSources, deleteSource, updateSource } from "../controllers/sourceController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createSource).get(protect, getSources);
router.route("/:id").put(protect, updateSource).delete(protect, deleteSource);

export {router};