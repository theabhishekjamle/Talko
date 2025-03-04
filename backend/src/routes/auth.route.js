import express from "express"
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import {generateToken} from '../lib/utils.js'
import { protectRoute } from "../middleware/auth.middleware.js"
import { logIn, logOut, signUp, updateProfile } from "../controllers/auth.controller.js"
import cloudinary from "../lib/cloudinary.js"

const router = express.Router();

router.post("/signup",signUp);

router.post("/login",logIn);

router.get("/logout",logOut);

router.put("/updateprofile",protectRoute,updateProfile);

router.get("/check",protectRoute,async(req,res) => {
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log("Error in CheckAuth rout");
        res.status(500).json({message:"INternal Server Error"});
    }
});

export default router;