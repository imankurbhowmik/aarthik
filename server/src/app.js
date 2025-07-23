import express from "express";
import cors from "cors";
import router from "./routes/authRoutes.js";
import {router as expenseRouter} from "./routes/expenseRoutes.js";
import {router as incomeRouter} from "./routes/incomeRoutes.js";
import {router as analyticsRouter} from "./routes/analyticsRoutes.js";
import { router as categoryRouter } from "./routes/categoryRoutes.js";
import { router as sourceRouter } from "./routes/sourceRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/expenses", expenseRouter);
app.use("/api/incomes", incomeRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/sources", sourceRouter);


export default app;