import express from "express";
import { createUser, login } from "../controllers/user.js";

const router = express.Router();

router.post("/createUser", createUser);
router.post("/login", login);

export default router;
