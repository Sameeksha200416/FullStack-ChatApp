import express from "express";
const router = express.Router();
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSlidebar } from "../controllers/message.controller.js";

router.get("/users",protectRoute,getUsersForSlidebar)
router.get("/:id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,sendMessage);


export default router;