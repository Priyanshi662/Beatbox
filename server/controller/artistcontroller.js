import Artist from "../models/Artists.js";
import Song from "../models/Song.js";

const getArtists = async (req, res) => {
	const artists = await Artist.find();

	if (!artists) {
		res.status(400).json({ message: "Artists not found!" });
	}

	res.status(200).json(artists);
};
export{
	getArtists
}