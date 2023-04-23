import express from "express";
import { getTasks } from "../controllers/generalTask.js";

const router = express.Router();

router.get("/", getTasks);

export default router;
