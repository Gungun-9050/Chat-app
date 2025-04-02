import User from"../models/user.model.js"
import Message from "../models/message.model.js";
import user from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from "../lib/socket.js";
export const getUsersForSidebar = async (req ,res )=>{
    try {
        const logIn = req.user._id;
      
      
        const filteredUser = await User.find({_id : {$ne:logIn}}).select("-password");
        res.status(200).json(filteredUser)

    } catch (error) {
        console.log(" ERROR IN getusersfoesidebar", error.message);
        res.status(500).json({message:"internal server problem"});

    }
}


export  const getMessages = async (req,res) =>{
try {
     const {id:userToChatId} = req.params
     const myId = req.user._id;
     const messages =  await Message.find({
        $or:[
            {senderId:myId,receiverId:userToChatId},
            {senderId:userToChatId,receiverId:myId},  
        ]
        
     })
     return res.status(200).json(messages)

} catch (error) {
    console.log("error in getting a messages");
    console.log(error);
}
    
}


export const sendMessage = async (req,res)=>{
    try {

      const {text,image} = req.body
      const myId = req.user._id
      const {id:receiverId} = req.params
      let imageUrl
      if(image){
        const uploadResult= await cloudinary.uploader.upload(image)
        imageUrl=uploadResult.secure_url
      }
      const newMessage = new Message({
        receiverId :receiverId,
        senderId : myId,
        text : text,
        image : imageUrl

      }) 
      await  newMessage.save()     

      const receiverSocketId = getReceiverSocketId(receiverId)  

      if(receiverSocketId){
          io.to(receiverSocketId).emit('newMessage', newMessage)  

      }

     return res.status(200).json(newMessage)
     console.log('saved');
     
    } catch (error) {
        console.log("error in getting a messages");
        console.log(error);
    }   
    }
