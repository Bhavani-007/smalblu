import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

const createSecretToken = (id) => {
    try {
        const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
            expiresIn: 3 * 24 * 60 * 60,
        });
        return token;
    } catch (error) {
        console.error("Error creating secret token:", error);
        return null; // or throw an error depending on how you want to handle it
    }
}

export default createSecretToken;
