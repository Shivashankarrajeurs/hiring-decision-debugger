import express from "express";
import evaluateRoutes from "./routes/evaluate.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.use("/evaluate", evaluateRoutes);

export default app;
