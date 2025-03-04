import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signUp = async (req,res)=>{
    const {fullName,email,password} = req.body;
    try{
        if(password.length < 6){
            return res.status(400).json({message:'Password length should be minium 6 characters'})
        }
        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message:'E-mail already exist.'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(200).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic

            })
        }
    }
    catch(error){
        res.status(400).json({message:"Invalid Details"})
    }
};

export const logIn = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:'Invali E-mail'})
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        
        if(!isPasswordCorrect){
            return res.status(400).json({message:'Invali Password'})
        }
        generateToken(user._id,res);

        res.status(200).json(
            {
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic
            }
        );
    }
    catch(error){
        console.log("Error in login api/auth");
        res.status(500).json({message:"INternal Server Error"});

    }
};

export const logOut = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0}) ;
        res.status(200).json({message:"Logged Out Successfully"});
    }
    catch(error){
        console.log("Error in logout api/auth");
        res.status(500).json({message:"Internal server error"});

    }
};

export const updateProfile = async (req,res) => {
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            res.status(400).json({message:"Profile pic is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,
            {profilePic:uploadResponse.secure_url},
            {new:true}
        );

        res.status(200).json({message:"Profile updated Successfully",updatedUser})
    }
    catch(error){
        console.log("Error in update profilePic rout",error);
        res.status(500).json({message:"Internal Server Error"});
    }

};