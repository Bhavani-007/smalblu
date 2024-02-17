import mongoose from "mongoose";

const notificationSchema = mongoose.Schema (
    {
        text: {
            type: String,
            required: true,
        },
        createdDate: {
            type: Date,
            default: new Date(),
        },
    },
    {
        timeStamps: true,
    }
)

export const Notification = mongoose.model('Notification', notificationSchema);