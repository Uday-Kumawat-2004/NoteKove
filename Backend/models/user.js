import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";

const userSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: validator.isStrongPassword,
            message: "Password must be strong (Min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol)"
        }
    }
}, {timestamps: true});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){ return next();}
    this.password = await bcrypt.hash(this.password, 10);
    next();

    userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});
});

export default mongoose.model('User', userSchema);