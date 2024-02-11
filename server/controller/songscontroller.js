import Song from '../models/Song.js';
import User from '../models/User.js';

const getAllSongs= async(req,res)=>{
    const songs=await Song.find({});
    if(!songs)
    {
        return res.status(400).json({message:"No songs found!"});
    }
    const shuffledSongs= songs.sort(()=>{Math.random()>0.5? 1: -1});
    res.status(200).json(shuffledSongs);
}
const likeSong= async (req,res)=>{
    try{
        const {id}=req.params;
        const userId =req.user.id;
        const song= await Song.findById(id);
        const user=await User.findById(userId);
        if(!song || !user)
            return res.status(400).json({message:"Cannot find user or song"});
        const isLiked=song.likes.get(userId);
        if(isLiked)
        {
            song.likes.delete(userId);
            user.favorites=user.favorites.filter((songId)=>{songId!==id});
        }
        else
        {
            song.likes.set(userId,true);
            user.favorites.push(id);
        }
        const savedsong= await song.save();
        const saveduser= await user.save();
        if(!savedsong || !saveduser)
            return res.status(400).json({message:"error occured in saving the song or user"});
        const returnUser={
            id:saveduser.id,
            username:saveduser.username,
            
        }
    }
    catch(error)
    {
        return res.status(400).json(({message:error.message}));
    }
}
export {getAllSongs, likeSong};