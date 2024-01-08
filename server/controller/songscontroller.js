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
export {getAllSongs};