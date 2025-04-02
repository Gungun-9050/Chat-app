  import { generateToken } from "../lib/utils.js"
  import User from "../models/user.model.js"
  import bcryptjs from "bcryptjs"
  import cloudinary  from "../lib/cloudinary.js"

   export  const signup = async(req,res) =>{
    console.log("on signup page");
    
        try { 
            const{email,password,name}=req.body
            if (password.length<6){
                return res.status(400).json({message:"password should be atleast 6 character"})


            }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"FOUND"})
 
        }
        const salt= await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser = new User({
            name:name,
            email:email,
            password:hashedPassword
        })
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(200).json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        }else{
        res.status(400).json({message: "Invalid user data"})
        }
            
        } catch (error) {
            console.log("error in creating a new user");
            console.log(error);
        }
    }
    export  const login = async(req,res) =>{

        try {
            const{email,password}=req.body
             const user = await User.findOne ({email})
             if (!user){
                return res.status(400).json({message:"user not found"})}
            const checkPassword = await bcryptjs.compare(password,user.password)
            if(!checkPassword){
                return res.status(400).json({message:"wrong password"})

            }
            console.log("user loggin")





            generateToken(user._id,res)
            console.log("jwt created")

             return res.status(200).json({
                id: user._id,
                name:user.name,
                email:user.email,
                profilePic:user.profilePic,


             })}


       
            
         catch (error) {
            return res.status(400).json({message:"error in login"})

            console.log("Something went wrong");
            console.log(error);
        }
    }
    export  const logout=(req,res) =>{
         console.log('on logout page');
         try{
            res.cookie("jwt","",{maxAge:0});
            res.status(200).json({message:"logged out successfully"})
         }
         catch(error){
            res.status(400).json({message:"loggout faileed"})
            console.log(error);
         }
   }





export const uploadProfile = async (req, res) => {
    console.log("in update profile");
    console.log(req.user);
    
    
    try {
        
        const {profilePic} = req.body;
        const user = req.user;


        if(!profilePic){
            res.status(400).json({message:"Profile Picture is not Provided"})
        }
        const uploadResult = await cloudinary.uploader.upload(profilePic)
        const updatedProfile = await User.findByIdAndUpdate(user._id, {profilePic: uploadResult.secure_url}, {new:true});
        console.log(uploadResult.secure_url);
        console.log(user._id);
        
        
        

        res.status(200).json({message: 'Profile Picture uploaded'})

    } catch (error) {
        console.log('Failed to upload Image');
        console.log(error);
        
        res.status(400).json({message: 'Error in Uploading Profile Picture'})
    }
}

       export  const checkAuth=(req,res) =>{
        try{
           
          return res.status(200).json(req.user)
        }
     catch (error) {
        console.log("Error in check auth");
        console.log(error);


        console.log("Error in check auth");
         res.status(400).json({message:"  Error in check auth"})

    }
}







