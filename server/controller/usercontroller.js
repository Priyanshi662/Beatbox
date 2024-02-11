import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Song from '../models/Song.js';

const loginUser=async (req,res)=>{
    const {username,password}=req.body;
    if(!username || !password)
        return res.status(400).json({message:"All fields are required"});
    const user=await User.findOne({username});
    if(!user)
        return res.status(400).json({message:"User does not exist"});
    const passwordmatch=await bcrypt.compare(password,user.password);
    if(!passwordmatch)
        return res.status(400).json({message:"password does not match"});
    const accessToken=jwt.sign({
        user:{
            id:user.id,
            username:user.username,
        },
    },
    process.env.JWT_SECRET);
    const returnUser={
        id:user.id,
        username:user.username,
        favorites:user.favorites,
        playlists:user.playlists
    };
    return res.status(200).json({user:returnUser,token:accessToken});
}
const registerUser=async (req,res) =>{
    const {username,password}=req.body;
    if(!username || !password)
        return res.status(400).json({message:"all fields are mandatory"});
    const findusername=await User.findOne({username});
    if(findusername)
        return res.status(400).json({message:"user already exists"});
    const hashed=await bcrypt.hash(password,12);
    const newUser=await User.create({username:username,password:hashed});
    if(!newUser)    
        return res.status(400).json({message:"user cannot be created"});
    const accessToken=jwt.sign({
        user:{
            id:newUser.id,
            username:newUser.username,
        }
    },process.env.JWT_SECRET);
    const returnUser={
        id:newUser.id,
        username:newUser.username,
        favorites:newUser.favorites,
        playlists:newUser.playlists
    }
    return res.status(200).json({user:returnUser,token:accessToken});
}
const getFavourites=async (req,res)=>{
    const {id}= req.user
    const user=await User.findById(id);
    if(!user)
        return res.status(400).json({message:"User not found"});
    const favorites=await Promise.all(
        user.favorites.map((id)=>{
            Song.findById(id)
        })
    );
    if(!favorites)
        return res.status(400).json({message:"favorites not found"});
    return res.status(200).json(favorites);
}
export{
    loginUser,
    registerUser,
    getFavourites
};