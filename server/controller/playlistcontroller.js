import playlist from '../models/Playlist.js';
import User from '../models/User.js';
import song from '../models/Song.js';

const createplaylist = async(req,res)=>{
    const {username,id} = req.user;
    const {title,description,isPrivate,songIds}= req.body;
    const user =  User.findById(id);
    if(!title || !songIds)
        return res.status(400).json({message:"All fields are required"});
    if(!user)
        return res.status(400).json({message:"User does not exist"});
    await Promise.all(songIds.map(async(id)=>{
        const songfound=song.findById(id);
        if(!songfound)  
            return res.status(400).json({message:"Song not found"});
    }));
    const newplaylist= await playlist.create({
        title,
		description,
		userId: id,
		userName: username,
		songs: songIds,
		isPrivate
    });
    if(!newplaylist)
        return res.status(400).json({message:"Some error occured in creating playlist"});
    user.playlists.push(newplaylist);
    await user.save();
    res.status(201).json(newplaylist, {message:"playlist created"});
}

const getPlaylists = (req,res)=>{
    const allplaylists = playlist.findById({});
    if(!allplaylists)
        return res.status(400).json({message:"no playlist found"});
    return res.status(201).json(allplaylists);
}

const getPlaylist=async(req,res) =>{
    try{
    const {id}= req.params;
    const PlayList= playlist.findById(id);
    if(!PlayList)
        return res.status(400).json({message:"no playlist found"});
    let songs=[];
    await Promise.all(
        playlist.songs.map(async(songId)=>{
            const playlistsong=songs.findById(songId);
            if(!playlistsong)
                return res.status(404).json({message: "song not found"});
            else
            {
                songs.push(playlistsong);
            }
        })
    );
        res.status(200).json({...playlist.toObject,songs});
    }
    catch(error)
    {
        res.status(400).json({message:error.message});
    }
}
const editPlaylist = async (req,res) =>{
    const {id} =req.params;
    const userId= req.user.id;
    const {title,description,songIds}= req.body;
    if(!title || !songIds)
        res.status(400).json({message:"All fields are required"});
    const currplaylist =await playlist.findById(id);
    if(!currplaylist)
        res.status(400).json({message:"playlist does not exist"});
    if(currplaylist.userId!=userId)
        res.status(400).json({message:"you cannot edit other user's playlist"});
    await Promise.all(songIds.map(async (id)=>{
        const songExists =await song.findById(id);
        if(!songExists)
            res.status(404).json({message:"Song does not exists"});
    }))
    const updatedplaylist=await playlist.findByIdAndUpdate(id,
        {title,description,songs:songIds},
        {
            new:true,
        }
    );
    if(!updatedplaylist)
        res.status(400).json({message:"Playlist not updated"});
}
export {createplaylist,getPlaylist,getPlaylists,editPlaylist};