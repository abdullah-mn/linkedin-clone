import express from "express";
import { signup, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/logout", logout)

export default router;
