import { User } from "../models/userModel.js";
import mongoose from "mongoose";
export const updateUserNotificationsCount = async (req, res, next) => {
    try{
        if(!req.body.count || !req.body.email){
            res.status(400).send({
                message: 'count not received!'
            })
        }
        const {email, count} = req.body;

        const user = await User.findOne({email: email})

        if(user){
            user.notifications_count = count;
        }
        
            //const updateDoc = await user.save();
            await User.updateMany({email:email}, { $set: { notification_count: count}})
            const updated_user = await User.findOne({email: email})
            console.log('count updated successfully!')
            res
            .status(201)
            .json({ message: "count updated successfully!", success: true, updated_user });
            next();
            
        } catch (error) {
            console.error('Error updating count: ', error);
        }
}