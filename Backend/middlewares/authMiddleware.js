import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const protect = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorised Token",
        })
    }

    try{

        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(401).json({
            error: "Invalid or expired token",
        });
    }
};
