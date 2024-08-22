import express from "express";
import { dataUpload } from "../controllers/data.controller";

const router = express.Router();

router.post("/upload", dataUpload);

export default router;
