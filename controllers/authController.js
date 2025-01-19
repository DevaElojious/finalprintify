import JWT from 'jsonwebtoken';
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async(req,res) => {
    try {
        const {name, email, password, phone, address} = req.body
        // validations
        if(!name){
            return res.send({error:'Name is required'})
        }
        if(!email){
            return res.send({error:'Email is required'})
        }
        if(!password){
            return res.send({error:'Password is required'})
        }
        if(!phone){
            return res.send({error:'Phone Number is required'})
        }
        if(!address){
            return res.send({error:'Address is required'})
        }

        // checking user
        const existingUser = await userModel.findOne({email})

        // checking existing user
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: 'Already registered, Please Login'
            })
        }
        //register the user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({name, email, phone, address, password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}

//post login
export const loginController = async(req, res) => {
    try {
        const {email, password} = req.body
        //validation
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:'Invalid Email or Password',
            })
        }

        // check the user
        const user = await userModel.findOne({email});
        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered',
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password',
            })
        }

        // create a token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "10d",
        });
        return res.status(200).send({
            success:true,
            message:'Login Successful!!',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error
        })
    }
};

// test controller
export const testController = (req, res) => {
    try {
        res.send("Protected route");
    } catch (error) {
        console.log(error);
        res.send({error});
    }
}
