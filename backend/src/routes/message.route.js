import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessages, getUsersforSIdebar, sendMessage,deleteMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/users",protectRoute,getUsersforSIdebar)

router.get("/:id",protectRoute,getMessages);

router.post("/send/:id",protectRoute,sendMessage);

router.delete("/deletemessages/:id",protectRoute,deleteMessages);




export default router;