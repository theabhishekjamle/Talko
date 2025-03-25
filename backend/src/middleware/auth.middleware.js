import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req,res,next) =>{
    try{
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorized token not provided"});
        }

        const decoded = jwt.verify(token,"abhishek")

        if(!decoded){
            return res.status(401).json({message:"Unauthorized token is Invalid"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        req.user = user;
        next();
    }
    catch(error){
        console.log("Error at authmiddleware protectRout");
        res.status(500).json({message:"Internal server error"});
    }
};