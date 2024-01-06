import mongoose from 'mongoose';
const SongSchema = new mongoose.Schema({
    title:{
        Name:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    coverImg:{
        type:String,
        required:true,
        default:"https://firebasestorage.googleapis.com/v0/b/socialstream-ba300.appspot.com/o/music_app_files%2Fplaylist_cover.jpg?alt=media&token=546adcad-e9c3-402f-8a57-b7ba252100ec"
    },
    artists:{
        type:Array,
        default:[]
    },
    artistIds:{
        // mongoose.Schema.Types.ObjectId is used to reference unique IDs of another mongoose schema
        type:mongoose.Schema.Types.ObjectId,
        ref: Artist
    },
    likes:{
        type:Map,
        of: Boolean
    },
    songURL:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true,
        default:song
    }
});
const song=mongoose.model("Song",SongSchema);
export default song;