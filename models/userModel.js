import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"], // Minimum length validation
        maxlength: [50, "Name must be less than 50 characters"], // Maximum length validation
    },
    email:{
        type: String,
        required: true, 
        unique: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
        ], // Regular expression for email validation
    },
    password:{
        type: String,
        required: true, 
        minlength: [8, "Password must be at least 8 characters long"], // Minimum length validation
        maxlength: [128, "Password cannot exceed 128 characters"], // Maximum length validation
        validate: {
            validator: function (value) {
                return /[A-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value);
            },
            message:
                "Password must contain at least one uppercase letter, one number, and one special character",
        }, // Custom validation for strong passwords
    },
    phone:{
        type: String,
        required: true, 
        match: [
            /^[0-9]{10}$/,
            "Phone number must be 10 digits long",
        ], // Regular expression for phone number validation
    },
    address:{
        type: String,
        required: true, 
        minlength: [10, "Address must be at least 10 characters long"], // Minimum length validation
        maxlength: [200, "Address cannot exceed 200 characters"], // Maximum length validation
    },
    role:{
        type: Number,
        default:0
    }
}, {timestamps: true})

export default mongoose.model('users', userSchema)