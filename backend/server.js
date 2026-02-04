
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import groupRoutes from "./routes/group.routes.js";
import participantRoutes from "./routes/participant.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import balanceRoutes from "./routes/balance.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import mintsenseRoutes from "./routes/mintsense.routes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/balance", balanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/mintsense", mintsenseRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("SplitMint Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
