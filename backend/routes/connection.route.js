import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { sendConnectionRequest } from "../controllers/connection.controller";

const router = express.Router();

router.post("/request/:userId", protectRoute, sendConnectionRequest);

export default router;
