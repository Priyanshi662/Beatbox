import mongoose from 'mongoose';
const PlaylistSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    userId:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    songs:{
        type:Array,
        default:[]
    },
    isPrivate:{
        type:Boolean,
        required:true,
        default:false
    },
    type:{
        type:String,
        required:true,
        default:"Playlist"
    },
},
{timestamps:true}
)
const playlist=mongoose.model("playlist",{PlaylistSchema});
export default playlist;