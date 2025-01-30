import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getNotifications } from "../controllers/notification.controller";

const router = express.Router();

router.get("/", protectRoute, getNotifications);

export default router;
