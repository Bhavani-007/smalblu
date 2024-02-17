//schema gives structure to the collection where as model acts like an interface to interact with the database.

import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema
(
    {
        email: {
            type: String,
            required: [true, "Your email address is required"],
            unique: true,
        },
        username: {
            type: String,
            required: [true, "Your username is required"],
        },
        password: {
            type: String,
            required: [true, "Your password is required"],
        },
        notification_count: {
            type: Number,
            default: 0,
        }
    },

    {
        timeStamps: true,
    }
);


 //This password hashing code runs before saving the document in db.  
 userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

export const User = mongoose.model("User", userSchema);

