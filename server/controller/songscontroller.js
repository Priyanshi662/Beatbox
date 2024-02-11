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

const getNewReleases= async(req,res) =>{
    const songs=await Song.find();
    if(!songs)
    {
        res.status(400).json({message:"Some error occured! could not find songs"});
    }
    const newreleases=songs.splice(-11,-1);
    const shuffled=newreleases.sort(()=>{Math.random()>0.5?1:-1});
    res.status(200).json(shuffled);
}

const topSongs=async (req,res) =>{
    // Model.aggregate( <pipeline>, <model>);-> creation of an aggregation pipeline
    try
    {
        const ressongs=await Song.aggregate([
            {
                // 1 signifies included in the results
                $project:{
                    title:1,
                    duration:1, 
                    coverImg:1,
                    artists:1,
                    artistIds:1,
                    songURL:1,
                    type:1,
                    likes:{
                        $size:
                        {
                            // find the size of likes array
                            $ObjectToArray:$likes
                        }
                    }
                }
            },
            {
                $sort:{
                    // sort in descending order
                    likes:-1
                }
            },
            {
                $limit:8
            }
            ]);
        res.status(200).json(ressongs);
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const getRandomSongs= async (req,res) =>{
    const songs= Song.find({});
    const shuffled=shuffleArray(songs);
    const res=shuffled.splice(1,11);
    res.status(200).json(res);
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
        res.status(200).json(returnUser);
    }
    catch(error)
    {
        return res.status(400).json(({message:error.message}));
    }
}
export {getAllSongs, likeSong,topSongs,getNewReleases,getRandomSongs};