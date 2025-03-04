import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from '../lib/cloudinary.js'
import { getRecieverSocketId , io} from "../lib/socket.js";
import { encryptMessage,decryptMessage } from "../lib/encrypt.js";

export const getUsersforSIdebar = async (req,res) =>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password -email")

        res.status(200).json(filteredUsers)
    }
    catch(error){
        console.log("Error in getuserforsidebar controller");
        res.status(500).josn({message:"Internal Server Error"});
    }
};

export const getMessages = async(req,res) =>{
    try{
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}

            ]
        });
        const decryptedMessages = messages.map(msg => ({
            ...msg.toObject(), 
            text: decryptMessage(msg.text)
        }));
        res.status(200).json(decryptedMessages);
    }
    catch(error){
        console.log("Error in getMessages controller");
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const sendMessage = async (req,res) =>{
    try{
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text:encryptMessage(text),
            image:imageUrl

        });

        await newMessage.save();

        const receiverSocketId = getRecieverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",{...newMessage.toObject(),text:decryptMessage(newMessage.text)});
        }

        res.status(200).json(newMessage);
        
    }
    catch(error){
        console.log("Error in sendMessage controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const deleteMessages = async(req,res)=>{
    const {id:userId} = req.params;
    const loggedInUserId = req.user._id; 
      
        try {
          await Message.deleteMany({
            $or: [
              { senderId: loggedInUserId, receiverId: userId },
              { senderId: userId, receiverId: loggedInUserId }
            ]
          });
      
          res.status(200).json({ message: 'Chat deleted successfully' });
        } catch (error) {
          console.error('Error deleting chat:', error);
          res.status(500).json({ message: 'Failed to delete chat' });
        }
      
}



