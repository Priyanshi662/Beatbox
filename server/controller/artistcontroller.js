import Artist from "../models/Artists.js";
import Song from "../models/Song.js";

const getArtists = async (req, res) => {
	const artists = await Artist.find();

	if (!artists) {
		res.status(400).json({ message: "Artists not found!" });
	}

	res.status(200).json(artists);
};
const getTopArtists=async (req,res)=>{
	const artists=await Artist.find();
	if(!artists)
		res.status(400).json({message:"No artist present"});
	const topartists=artists.slice(1,11);
	res.status(200).json(topartists);
}
const getArtistandSongs= async (req,res)=>{
	const {id}=req.params;
	const artist = await Artist.findById(id);
	if(!artist)
	{
		res.status(400).json({message:"Artist does not exist!"});
	}
	// find if this artist is present in song schema or not
	const songexist= await Song.find({artistIds:id});
	if(!songexist)
	{
		res.status(400).json({message:"Some error occured"});
	}
	res.status(200).json({...artist._doc,songs:songexist});
}
export{
	getArtists,
	getArtistandSongs,
	getTopArtists
}