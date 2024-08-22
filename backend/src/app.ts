import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import dataRoute from "./routes/data-route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routers
app.use("/data", dataRoute);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: "Request not found.",
  });
});

export default app;
