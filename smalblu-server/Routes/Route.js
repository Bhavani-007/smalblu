import { Signup, Login, GetAllUsers } from "../Controllers/AuthController.js";
import express from 'express';
import { userVerification } from "../Middlewares/AuthMiddleware.js";
import { SendNotifications, getNotifications, getNotificationsCount } from "../Controllers/notifController.js";
import { updateUserNotificationsCount } from "../Controllers/updateUserNotificationsCount.js";

const router = express.Router();

router.post('/signup',Signup);

router.post('/login', Login);

router.post('/',userVerification);

router.get('/allusers',GetAllUsers);

router.post('/admin', SendNotifications);

router.get('/notifications',getNotifications)

router.get('/notifications-count',getNotificationsCount)

router.put('/update',updateUserNotificationsCount);
export default router;