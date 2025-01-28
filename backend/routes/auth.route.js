import express from "express";
import { signup, logout, login } from "../controllers/auth.controller.js";
import { getCurrentUser } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/current-user", protectRoute, getCurrentUser);

export default router;
