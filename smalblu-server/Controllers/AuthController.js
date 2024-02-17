import { response } from "express";
import dotenv from "dotenv";
import { User } from "../models/userModel.js";
import createSecretToken from "../Util/SecretToken.js";
import bcrypt from 'bcryptjs';

dotenv.config();

export const Signup = async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      if(!email || !password || !username){
        return res.json({message:'All fields are required'})
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      
      const user = await User.create({ email, username, password});
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(201)
        .json({ message: "User signedup successfully", success: true, user });
      next();

      
      
    } catch (error) {
      console.error('Unable to signup '+error);
    }
  };

 /*--------------------------------*/
  /*--------------------------------*/

export const GetAllUsers = async (req, res, next) => {
  //displaying all the existing users
  try{
    const Users = await User.find({});
    res.status(201).json("Users: "+Users);
    console.log(Users);
  }catch (error){
    console.log("Unable to get all users");
  }
}
  /*--------------------------------*/
  /*--------------------------------*/

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User loggedin successfully", success: true, user });
     next()
  } catch (error) {
    console.error(error);
  }
}