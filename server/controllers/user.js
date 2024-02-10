import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import { decode } from 'jsonwebtoken'

import User from '../models/user.js';

export const googleLogin = async (req, res) => {
    dotenv.config();
    const { code } = req.body;

    const authClient = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URL
    );

    try {
        const { tokens } = await authClient.getToken(code);
        const { id_token } = tokens;
        const { name, email, sub, picture } = decode(id_token);

        return res.status(200).json({ result: { name, email, _id: sub, picture }, token: id_token });
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
}

export const signin = async (req, res, next) => {
    if (req.body.code) return googleLogin(req, res);

    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong!' });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists." });

        if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
}