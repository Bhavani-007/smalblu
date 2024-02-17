import mongoose from "mongoose";
import { Notification } from "../models/notificationModel.js";

export const SendNotifications = async (req, res, next) => {
    try {
      const { text } = req.body;
      
      const notification = await Notification.create({ text });

      console.log(notification);
      
      res
        .status(201)
        .json({ message: "Notification successfully sent", success: true, notification });
      next();
        
      //displaying all the notifications sent 
      try{
        const  all_notifications = await Notification.find({});
        console.log(all_notifications);
      }catch (error){
        console.log("Unable to get the notifications");
      }
      
    } catch (error) {
      console.error('Unable to send notification '+error);
      res.json({message: 'Unable to send notification'})
    }
  };

  export const getNotifications = async (req, res, next) => {
    try {
      const notifications = await Notification.find({ });
      res
        .status(201)
        .json({ message: "Got all the notifcations from server", success: true, notifications });
      next();
      
    } catch (error) {
      
      console.error('Unable to get notifications from server '+error);
      res.json({message:'Unable to get notifications from server' })
    }
  };

  export const getNotificationsCount = async (req, res, next) => {
    try{
      const notifications_count = await Notification.countDocuments({});
      res
      .status(201)
      .json({message: 'got the notifications count', success:true, count:notifications_count})
    } catch (error) {
      console.error('Unable to get notifications count from server '+error);
      res.json({message:'Unable to get notifications count from server' })
    }
  }