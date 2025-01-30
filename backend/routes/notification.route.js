import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import {
  deleteNotification,
  getNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.put("/:id/read", protectRoute, markNotificationAsRead);
router.delete("/:id", protectRoute, deleteNotification);
export default router;
