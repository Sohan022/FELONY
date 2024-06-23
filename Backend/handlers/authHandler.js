import {User} from '../models/user.js';
import Bcrypt from 'bcrypt';

export const signup = async (req, res, next) => {
    try{
        const finduser = await User.findOne({ email: req.body.email});
        if(finduser){
            res.status(409).json({message:"User already exists!"});
        }
        else{
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: Bcrypt.hashSync(req.body.password, 10),
            })
            
            const user = await newUser.save();
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Technical Issue, Please try after sometime!"});
    }
};

export const signin = async (req, res, next) => {
    try{
        let email = req.body.email;
        let password = req.body.password;
        const user = await User.findOne({email: email});
        if(!user){
            res.status(404).json({message:"Email does not exist, Please do signup!"});
        }
        else if(!Bcrypt.compareSync(password, user.password)){
            res.status(400).json({message:"Incorrect password!"});
        }
        else{
            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Technical Issue, Please try after sometime!"});
    }
    
};