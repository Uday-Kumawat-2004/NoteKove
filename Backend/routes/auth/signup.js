import express, { Router } from 'express'
import User from '../../models/user.js';


const router = express.Router();

router.post('/signup', async (req, res) => {
    try{

        const {name, email, password} = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(409).json({
                error: `Email already registered`
            })
        }

        const newUser = new User({
            name,
            email,
            password: password
        });

        const savedUser = await newUser.save(); 
        res.status(201).json({
            message: `User registered successfully`
        });
    }
    catch(err){
        if(err.name === 'ValidationError'){
            const errors = {}
            for(const key in err.errors){
                errors[key] = err.errors[key].message;
            }
            return res.status(400).json({
                error: "validation failed",
                details: errors
            })
        }
        console.error(err);
        res.status(500).json({
            error: "server error"
        });
    }
});

export default router
