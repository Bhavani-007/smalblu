import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Route from './Routes/Route.js';
import cookieParser from 'cookie-parser';

dotenv.config({ path: "./configuration.env" });

const app = express();

const {PORT, MONGO_URL } = process.env;

mongoose
.connect(MONGO_URL)
.then(()=>{
  console.log("App connected to database");
    app.listen(PORT, '127.0.0.1', ()=>{
        console.log(`Listening to PORT:${PORT}`);
        
    })
    
})
.catch((error)=>{
    console.log("error connecting to database: "+error);
})



app.use(
    cors({
      origin: ['http://localhost:3000'],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.use(cookieParser());
  
app.use(express.json());

app.use('/',Route);

/*app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});*/